import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

function normalizePath(filePath, root = process.cwd()) {
  const relative = path.isAbsolute(filePath) ? path.relative(root, filePath) : filePath;
  return String(relative).replaceAll('\\', '/').replace(/^\.\//u, '');
}

function issueKey(issue) {
  return `${issue.file}|${issue.rule}|${issue.severity}`;
}

export function summarizeLintResults(results, { root = process.cwd() } = {}) {
  const issues = new Map();
  for (const result of results) {
    const file = normalizePath(result.filePath, root);
    for (const message of result.messages ?? []) {
      const issue = {
        file,
        rule: message.ruleId ?? 'FATAL',
        severity: message.severity ?? 2,
      };
      const key = issueKey(issue);
      issues.set(key, { ...issue, count: (issues.get(key)?.count ?? 0) + 1 });
    }
  }
  return [...issues.values()].sort((left, right) => issueKey(left).localeCompare(issueKey(right)));
}

export function evaluateLintRatchet({ baseline, actualIssues, changedFiles = [] }) {
  const baselineMap = new Map((baseline.issues ?? []).map((issue) => [issueKey(issue), issue.count]));
  const changed = new Set(changedFiles.map((file) => normalizePath(file)));
  const newDebt = [];
  const touchedDebt = [];

  for (const issue of actualIssues) {
    const allowed = baselineMap.get(issueKey(issue)) ?? 0;
    if (issue.count > allowed) {
      newDebt.push({ ...issue, allowed, added: issue.count - allowed });
    }
    if (changed.has(issue.file)) touchedDebt.push(issue);
  }
  return { newDebt, touchedDebt };
}

function run(command, args, { allowLintExit = false, root = process.cwd() } = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0 && !(allowLintExit && result.status === 1)) {
    throw new Error(result.stderr.trim() || `${command} terminó con ${result.status}.`);
  }
  return result.stdout;
}

export function changedFiles(args, { root = process.cwd() } = {}) {
  const range = args.range ?? process.env.QUALITY_DIFF_RANGE;
  if (args.base && (range || args.staged)) throw new Error('--base no admite --range, QUALITY_DIFF_RANGE ni --staged.');
  const base = args.base
    ? run('git', ['merge-base', args.base, 'HEAD'], { root }).trim()
    : null;
  const gitArgs = range
    ? ['diff', '--name-only', '--diff-filter=ACMRD', range]
    : args.staged
      ? ['diff', '--cached', '--name-only', '--diff-filter=ACMRD']
      : ['diff', '--name-only', '--diff-filter=ACMRD', base ?? 'HEAD'];
  const files = run('git', gitArgs, { root }).split(/\r?\n/u).filter(Boolean);
  if (!range && !args.staged) {
    files.push(...run('git', ['ls-files', '--others', '--exclude-standard'], { root })
      .split(/\r?\n/u)
      .filter(Boolean));
  }
  return [...new Set(files.map((file) => normalizePath(file, root)))].sort();
}

function parseArgs(argv) {
  const args = { staged: false, range: null, baseline: 'quality/lint-debt-baseline.json' };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--staged') args.staged = true;
    else if (token === '--range' || token === '--baseline' || token === '--base') {
      const value = argv[index + 1];
      if (!value) throw new Error(`falta el valor de ${token}.`);
      args[token.slice(2)] = value;
      index += 1;
    } else throw new Error(`argumento desconocido: ${token}.`);
  }
  return args;
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const baseline = JSON.parse(fs.readFileSync(path.resolve(args.baseline), 'utf8'));
  if (baseline.schema_version !== 1 || baseline.policy !== 'NO_NEW_DEBT_AND_TOUCHED_FILES_CLEAN') {
    throw new Error('la baseline de lint no contiene una política soportada.');
  }
  const eslintCli = path.resolve('node_modules/eslint/bin/eslint.js');
  const output = run(process.execPath, [eslintCli, '.', '--ignore-pattern', '.delivery/**', '--format', 'json'], { allowLintExit: true });
  const actualIssues = summarizeLintResults(JSON.parse(output));
  const files = changedFiles(args);
  const result = evaluateLintRatchet({ baseline, actualIssues, changedFiles: files });
  const errors = [];
  for (const issue of result.newDebt) {
    errors.push(`${issue.file}: ${issue.rule} tiene ${issue.count}; baseline ${issue.allowed}.`);
  }
  for (const issue of result.touchedDebt) {
    errors.push(`${issue.file}: archivo tocado conserva ${issue.count} hallazgo(s) de ${issue.rule}.`);
  }
  if (errors.length > 0) throw new Error(errors.join('\n'));
  const totals = actualIssues.reduce(
    (accumulator, issue) => {
      accumulator[issue.severity === 2 ? 'errors' : 'warnings'] += issue.count;
      return accumulator;
    },
    { errors: 0, warnings: 0 },
  );
  console.log(
    `OK: ratchet lint; ${totals.errors} errores y ${totals.warnings} advertencias históricas; `
    + `${files.length} archivo(s) tocado(s) limpios.`,
  );
  return { ...result, totals, changedFiles: files };
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
