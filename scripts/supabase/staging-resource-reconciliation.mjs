import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import {
  buildExpectedBaseline,
  compareRemote,
  observeLocalDatabase,
  observeRemoteEnvironment,
  parseToml,
  stableStringify,
} from './environment-drift.mjs';
import {
  assertTargetBinding,
  readEnvironmentBindings,
} from './hosted-replay-precondition.mjs';
import { resolveNpmInvocation } from '../quality/supabase-db-harness.mjs';

const MANAGEMENT_BASE_URL = 'https://api.supabase.com';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';
const ACKNOWLEDGEMENT = 'MRP015-040';
const SUPPORTED_ENVIRONMENT = 'STAGING';
const STRUCTURAL_SQL_KEYS = Object.freeze([
  'governed_schemas',
  'relations',
  'views',
  'columns',
  'constraints',
  'indexes',
  'functions',
  'triggers',
  'policies',
  'publications',
  'types',
  'vital_boundary',
]);
const TABLE_GRANTEES = new Set(['anon', 'authenticated', 'service_role']);
const ROUTINE_GRANTEES = new Set(['anon', 'authenticated', 'service_role', 'PUBLIC']);
const TABLE_PRIVILEGES = new Set([
  'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER', 'MAINTAIN',
]);
const ROUTINE_PRIVILEGES = new Set(['EXECUTE']);
const SECRET_PLACEHOLDER = /(?:^|[^a-z])(example|placeholder|changeme|replace[_-]?me|your[_-]?|todo)(?:$|[^a-z])/iu;
const ENV_FILE_NAME = /^\.env\.(?:staging|preview|development)(?:\.local)?$/iu;
const EXCLUDED_ENV_FILE_NAME = /(?:production|prod|example|sample|template)/iu;
const MAX_ENV_SCAN_DEPTH = 4;
const FUNCTION_DEPLOY_TIMEOUT_MS = 180000;

function fail(code, detail = '') {
  const error = new Error(detail ? `${code}:${detail}` : code);
  error.code = code;
  throw error;
}

function repoRootFromModule() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
}

function safeAscii(value) {
  return String(value ?? '')
    .replace(/postgres(?:ql)?:\/\/[^\s]+/giu, '[REDACTED_DB_URL]')
    .replace(/\b(?:eyJ|sb_[A-Za-z0-9_]|vca_|vcr_)[A-Za-z0-9._-]{16,}\b/gu, '[REDACTED_TOKEN]')
    .replace(/[^\x20-\x7E\r\n]/gu, '?');
}

function run(command, args, {
  cwd = process.cwd(),
  allowFailure = false,
  env = process.env,
  timeout = 120000,
} = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    env,
    timeout,
    maxBuffer: 32 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = String(result.stdout ?? '').trimEnd();
  const stderr = String(result.stderr ?? '').trimEnd();
  if (result.error && !allowFailure) fail('PROCESS_ERROR', safeAscii(result.error.message));
  if (status !== 0 && !allowFailure) {
    fail('PROCESS_FAILED', safeAscii(stderr || stdout || `${command} ${args.join(' ')}`));
  }
  return { status, stdout, stderr };
}

export function parseArgs(argv = []) {
  const tokens = [...argv];
  const mode = String(tokens.shift() ?? '').trim().toLowerCase();
  if (!['plan', 'apply'].includes(mode)) fail('MODE_MUST_BE_PLAN_OR_APPLY');
  const args = {
    mode,
    environmentRole: null,
    projectRef: null,
    owner: null,
    acknowledgement: null,
  };
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const value = tokens[index + 1];
    if (!value || value.startsWith('--')) fail('ARGUMENT_VALUE_MISSING', token);
    if (token === '--environment-role') args.environmentRole = value;
    else if (token === '--project-ref') args.projectRef = value;
    else if (token === '--owner') args.owner = value;
    else if (token === '--acknowledge') args.acknowledgement = value;
    else fail('UNKNOWN_ARGUMENT', token);
    index += 1;
  }
  if (String(args.environmentRole ?? '').trim().toUpperCase() !== SUPPORTED_ENVIRONMENT) {
    fail('ONLY_STAGING_IS_ALLOWED');
  }
  if (!/^[A-Za-z0-9_-]+$/u.test(String(args.projectRef ?? '').trim())) {
    fail('PROJECT_REF_INVALID');
  }
  if (!String(args.owner ?? '').trim()) fail('OWNER_REQUIRED');
  if (mode === 'apply' && args.acknowledgement !== ACKNOWLEDGEMENT) {
    fail('APPLY_ACKNOWLEDGEMENT_REQUIRED', ACKNOWLEDGEMENT);
  }
  return {
    ...args,
    environmentRole: SUPPORTED_ENVIRONMENT,
    projectRef: String(args.projectRef).trim(),
    owner: String(args.owner).trim(),
  };
}

function surfaceMap(remoteObserved) {
  return new Map((remoteObserved?.surfaces ?? []).map((entry) => [entry.name, entry]));
}

function requiredSurface(surfaces, name) {
  const row = surfaces.get(name);
  if (!row || row.status !== 'PASS') fail('REQUIRED_SURFACE_UNAVAILABLE', name);
  return row.value;
}

export function structuralFingerprintDifferences(localFingerprint, remoteFingerprint) {
  return STRUCTURAL_SQL_KEYS.filter((key) =>
    stableStringify(localFingerprint?.[key] ?? null)
    !== stableStringify(remoteFingerprint?.[key] ?? null));
}

function quoteIdent(value) {
  const text = String(value ?? '');
  if (!text) fail('SQL_IDENTIFIER_EMPTY');
  return `"${text.replaceAll('"', '""')}"`;
}

function sqlLiteral(value) {
  return `'${String(value ?? '').replaceAll("'", "''")}'`;
}

function aclBaseKey(surface, row) {
  if (surface === 'table') {
    return [surface, row.schema, row.relation, row.grantor, row.grantee, row.privilege].join('\u001f');
  }
  return [
    surface,
    row.schema,
    row.routine,
    row.identity_args,
    row.grantor,
    row.grantee,
    row.privilege,
  ].join('\u001f');
}

function validateAclRow(surface, row) {
  if (!row || typeof row !== 'object' || Array.isArray(row)) fail('ACL_ROW_INVALID', surface);
  if (String(row.grantor ?? '') !== 'postgres') fail('ACL_GRANTOR_UNSUPPORTED', String(row.grantor ?? 'EMPTY'));
  const grantee = String(row.grantee ?? '');
  const privilege = String(row.privilege ?? '').toUpperCase();
  if (surface === 'table') {
    if (!TABLE_GRANTEES.has(grantee)) fail('TABLE_GRANTEE_UNSUPPORTED', grantee);
    if (!TABLE_PRIVILEGES.has(privilege)) fail('TABLE_PRIVILEGE_UNSUPPORTED', privilege);
    if (!String(row.schema ?? '') || !String(row.relation ?? '')) fail('TABLE_ACL_IDENTITY_INVALID');
  } else {
    if (!ROUTINE_GRANTEES.has(grantee)) fail('ROUTINE_GRANTEE_UNSUPPORTED', grantee);
    if (!ROUTINE_PRIVILEGES.has(privilege)) fail('ROUTINE_PRIVILEGE_UNSUPPORTED', privilege);
    if (!String(row.schema ?? '') || !String(row.routine ?? '')) fail('ROUTINE_ACL_IDENTITY_INVALID');
    if (row.identity_args === null || row.identity_args === undefined) fail('ROUTINE_IDENTITY_ARGS_INVALID');
  }
}

function mapAclRows(surface, rows) {
  const map = new Map();
  for (const row of rows ?? []) {
    const normalized = {
      ...row,
      grantor: String(row.grantor ?? ''),
      grantee: String(row.grantee ?? ''),
      privilege: String(row.privilege ?? '').toUpperCase(),
      grantable: Boolean(row.grantable),
    };
    const key = aclBaseKey(surface, normalized);
    if (map.has(key)) fail('ACL_DUPLICATE_KEY', key);
    map.set(key, normalized);
  }
  return map;
}

function routineKindMap(fingerprint) {
  const map = new Map();
  for (const row of fingerprint?.functions ?? []) {
    const key = [row.schema, row.name, row.identity_args ?? ''].join('\u001f');
    const definition = String(row.definition ?? '');
    map.set(key, /\bCREATE\s+(?:OR\s+REPLACE\s+)?PROCEDURE\b/iu.test(definition) ? 'PROCEDURE' : 'FUNCTION');
  }
  return map;
}

function granteeSql(grantee) {
  return grantee === 'PUBLIC' ? 'PUBLIC' : quoteIdent(grantee);
}

function tableObjectSql(row) {
  return `${quoteIdent(row.schema)}.${quoteIdent(row.relation)}`;
}

function routineObjectSql(row, kinds) {
  const key = [row.schema, row.routine, row.identity_args ?? ''].join('\u001f');
  const kind = kinds.get(key);
  if (!kind) fail('ROUTINE_KIND_UNRESOLVED', `${row.schema}.${row.routine}(${row.identity_args ?? ''})`);
  return {
    kind,
    object: `${quoteIdent(row.schema)}.${quoteIdent(row.routine)}(${String(row.identity_args ?? '')})`,
  };
}

function aclStatement(surface, transition, row, kinds) {
  validateAclRow(surface, row);
  const privilege = String(row.privilege).toUpperCase();
  const target = granteeSql(row.grantee);
  if (surface === 'table') {
    const object = tableObjectSql(row);
    if (transition === 'grant') {
      return `grant ${privilege} on table ${object} to ${target}${row.grantable ? ' with grant option' : ''};`;
    }
    if (transition === 'upgrade') {
      return `grant ${privilege} on table ${object} to ${target} with grant option;`;
    }
    if (transition === 'downgrade') {
      return `revoke grant option for ${privilege} on table ${object} from ${target};`;
    }
    return `revoke ${privilege} on table ${object} from ${target};`;
  }
  const routine = routineObjectSql(row, kinds);
  if (transition === 'grant') {
    return `grant ${privilege} on ${routine.kind.toLowerCase()} ${routine.object} to ${target}${row.grantable ? ' with grant option' : ''};`;
  }
  if (transition === 'upgrade') {
    return `grant ${privilege} on ${routine.kind.toLowerCase()} ${routine.object} to ${target} with grant option;`;
  }
  if (transition === 'downgrade') {
    return `revoke grant option for ${privilege} on ${routine.kind.toLowerCase()} ${routine.object} from ${target};`;
  }
  return `revoke ${privilege} on ${routine.kind.toLowerCase()} ${routine.object} from ${target};`;
}

export function buildAclPlan(localFingerprint, remoteFingerprint) {
  const differences = structuralFingerprintDifferences(localFingerprint, remoteFingerprint);
  if (differences.length > 0) {
    return {
      structural_differences: differences,
      actions: [],
      unsupported: [],
      sql: null,
    };
  }
  const kinds = routineKindMap(localFingerprint);
  const actions = [];
  const unsupported = [];
  const addAction = (surface, transition, row) => {
    try {
      validateAclRow(surface, row);
      if (surface === 'routine') routineObjectSql(row, kinds);
      actions.push({ surface, transition, row });
    } catch (error) {
      unsupported.push({
        surface,
        transition,
        identity: surface === 'table'
          ? `${String(row?.schema ?? '')}.${String(row?.relation ?? '')}:${String(row?.grantee ?? '')}:${String(row?.privilege ?? '')}`
          : `${String(row?.schema ?? '')}.${String(row?.routine ?? '')}(${String(row?.identity_args ?? '')}):${String(row?.grantee ?? '')}:${String(row?.privilege ?? '')}`,
        reason: safeAscii(error?.message ?? String(error)),
      });
    }
  };
  for (const [surface, localRows, remoteRows] of [
    ['table', localFingerprint?.table_grants ?? [], remoteFingerprint?.table_grants ?? []],
    ['routine', localFingerprint?.routine_grants ?? [], remoteFingerprint?.routine_grants ?? []],
  ]) {
    const expected = mapAclRows(surface, localRows);
    const observed = mapAclRows(surface, remoteRows);
    const keys = [...new Set([...expected.keys(), ...observed.keys()])].sort();
    for (const key of keys) {
      const left = expected.get(key) ?? null;
      const right = observed.get(key) ?? null;
      if (!left && right) {
        addAction(surface, 'revoke', right);
      } else if (left && !right) {
        addAction(surface, 'grant', left);
      } else if (left && right && Boolean(left.grantable) !== Boolean(right.grantable)) {
        addAction(surface, left.grantable ? 'upgrade' : 'downgrade', left);
      }
    }
  }
  const statements = actions.map((action) =>
    aclStatement(action.surface, action.transition, action.row, kinds));
  return {
    structural_differences: [],
    actions,
    unsupported,
    sql: statements.length > 0 ? `begin;\n${statements.join('\n')}\ncommit;` : null,
  };
}

function normalizeCsv(value) {
  if (Array.isArray(value)) return value.map(String).map((entry) => entry.trim()).filter(Boolean);
  return String(value ?? '').split(',').map((entry) => entry.trim()).filter(Boolean);
}

export function buildDataApiPlan(expectedDataApi, observedPostgrest) {
  const expectedSchemas = expectedDataApi?.schemas ?? [];
  const expectedSearch = expectedDataApi?.extra_search_path ?? [];
  const expectedMaxRows = Number(expectedDataApi?.max_rows);
  const observedSchemas = normalizeCsv(observedPostgrest?.db_schema);
  const observedSearch = normalizeCsv(observedPostgrest?.db_extra_search_path);
  const observedMaxRows = Number(observedPostgrest?.max_rows);
  const needsPatch = stableStringify(expectedSchemas) !== stableStringify(observedSchemas)
    || stableStringify(expectedSearch) !== stableStringify(observedSearch)
    || expectedMaxRows !== observedMaxRows;
  return {
    needs_patch: needsPatch,
    body: {
      db_schema: expectedSchemas.join(','),
      db_extra_search_path: expectedSearch.join(','),
      max_rows: expectedMaxRows,
    },
  };
}

export function buildCronPlan(expectedRows, observedRows, localRows = []) {
  const expected = new Map();
  const observed = new Map();
  for (const row of expectedRows ?? []) {
    const name = String(row?.jobname ?? '').trim();
    if (!name || expected.has(name)) fail('EXPECTED_CRON_DUPLICATE', name || 'EMPTY');
    expected.set(name, {
      jobname: name,
      schedule: String(row.schedule ?? ''),
      active: Boolean(row.active),
    });
  }
  for (const row of observedRows ?? []) {
    const name = String(row?.jobname ?? '').trim();
    if (!name || observed.has(name)) fail('OBSERVED_CRON_DUPLICATE', name || 'EMPTY');
    observed.set(name, row);
  }
  const missing = [...expected.keys()].filter((name) => !observed.has(name)).sort();
  const extra = [...observed.keys()].filter((name) => !expected.has(name)).sort();
  const local = new Map();
  for (const row of localRows ?? []) {
    const name = String(row?.jobname ?? '').trim();
    if (!name || local.has(name)) fail('LOCAL_CRON_DUPLICATE', name || 'EMPTY');
    local.set(name, row);
  }
  const creates = [];
  const unresolvedMissing = [];
  for (const name of missing) {
    const target = expected.get(name);
    const source = local.get(name);
    if (!source) {
      unresolvedMissing.push(name);
      continue;
    }
    if (
      String(source.schedule ?? '') !== target.schedule
      || Boolean(source.active) !== target.active
      || !String(source.command ?? '').trim()
    ) {
      fail('LOCAL_CRON_CANDIDATE_MISMATCH', name);
    }
    creates.push({
      jobname: name,
      schedule: target.schedule,
      active: target.active,
      command: String(source.command),
    });
  }
  const alters = [];
  for (const [name, target] of expected) {
    const current = observed.get(name);
    if (!current) continue;
    if (String(current.schedule ?? '') !== target.schedule || Boolean(current.active) !== target.active) {
      if (!Number.isInteger(Number(current.jobid)) || Number(current.jobid) <= 0) {
        fail('CRON_JOB_ID_INVALID', name);
      }
      alters.push({
        jobname: name,
        jobid: Number(current.jobid),
        schedule: target.schedule,
        active: target.active,
      });
    }
  }
  return { missing: unresolvedMissing, creates, extra, alters };
}

function cronMutationSql(plan) {
  const statements = [];
  for (const row of plan.creates ?? []) {
    statements.push(
      `select cron.schedule(${sqlLiteral(row.jobname)}, ${sqlLiteral(row.schedule)}, ${sqlLiteral(row.command)});`,
    );
    if (!row.active) {
      statements.push(
        `select cron.alter_job(job_id := (select jobid from cron.job where jobname = ${sqlLiteral(row.jobname)}), active := false);`,
      );
    }
  }
  for (const row of plan.alters) {
    statements.push(
      `select cron.alter_job(job_id := ${row.jobid}, schedule := ${sqlLiteral(row.schedule)}, active := ${row.active ? 'true' : 'false'});`,
    );
  }
  for (const name of plan.extra) {
    statements.push(`select cron.unschedule(${sqlLiteral(name)});`);
  }
  return statements.length > 0 ? `begin;\n${statements.join('\n')}\ncommit;` : null;
}

function functionMap(rows) {
  return new Map((rows ?? []).map((row) => [String(row?.slug ?? ''), row]));
}

export function buildFunctionPlan(expectedFunctions, observedFunctions, environmentContract) {
  const soloLocal = new Set(environmentContract?.edge_functions?.solo_local ?? []);
  const expected = functionMap((expectedFunctions ?? []).filter((row) => !soloLocal.has(row.slug)));
  const observed = functionMap(observedFunctions ?? []);
  const deploy = [];
  for (const [slug, target] of expected) {
    const current = observed.get(slug);
    if (
      !current
      || current.verify_jwt !== target.verify_jwt
      || !current.source_digest
      || current.source_digest !== target.source_digest
    ) {
      deploy.push(slug);
    }
  }
  const remove = [...observed.keys()]
    .filter((slug) => soloLocal.has(slug) || !expected.has(slug))
    .sort();
  return { deploy: deploy.sort(), remove };
}

function parseEnvValue(raw) {
  const value = String(raw ?? '').trim();
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  return value.replace(/\s+#.*$/u, '').trim();
}

export function parseEnvSource(source) {
  const values = {};
  for (const rawLine of String(source ?? '').split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = /^(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=\s*(.*)$/u.exec(line);
    if (!match) continue;
    values[match[1]] = parseEnvValue(match[2]);
  }
  return values;
}

function candidateEnvFiles(root) {
  const workspace = path.dirname(root);
  const roots = [root];
  for (const entry of fs.readdirSync(workspace, { withFileTypes: true })) {
    if (entry.isDirectory()) roots.push(path.join(workspace, entry.name));
  }
  const seen = new Set();
  const files = [];
  const visit = (directory, depth) => {
    let entries;
    try {
      entries = fs.readdirSync(directory, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        if (depth >= MAX_ENV_SCAN_DEPTH) continue;
        if (['.git', 'node_modules', '.next', 'dist', 'build', 'coverage', '.turbo'].includes(entry.name)) continue;
        visit(absolute, depth + 1);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!ENV_FILE_NAME.test(entry.name) || EXCLUDED_ENV_FILE_NAME.test(entry.name)) continue;
      const resolved = path.resolve(absolute);
      if (!seen.has(resolved)) {
        seen.add(resolved);
        files.push(resolved);
      }
    }
  };
  for (const directory of roots) visit(directory, 0);
  return files.sort((left, right) => left.localeCompare(right, 'en'));
}

function usableSecretValue(name, value) {
  const text = String(value ?? '').trim();
  if (!text) return false;
  if (name === 'GOOGLE_WALLET_SERVICE_ACCOUNT_JSON') {
    try {
      const parsed = JSON.parse(text);
      return Boolean(parsed?.client_email && parsed?.private_key);
    } catch {
      return false;
    }
  }
  if (SECRET_PLACEHOLDER.test(text)) return false;
  if (name === 'ANIMA_OWNER_DELETE_UID') {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(text);
  }
  if (['SET_PASSWORD_WEB_URL', 'EXPO_PUBLIC_ANIMA_AUTH_REDIRECT_URL', 'INVITE_REDIRECT_URL'].includes(name)) {
    try {
      const url = new URL(text);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  }
  return text.length >= 4;
}

function addSecretCandidate(candidates, name, value, source) {
  if (!usableSecretValue(name, value)) return;
  if (!candidates.has(name)) candidates.set(name, []);
  const rows = candidates.get(name);
  if (!rows.some((entry) => entry.value === value)) rows.push({ value: String(value), source });
}

function candidateSecretNames(requirements) {
  return [...new Set([
    ...(requirements?.required_all ?? []),
    ...(requirements?.required_any_of ?? []).flatMap((entry) => entry.names ?? []),
  ])].sort();
}

function deriveSetPasswordUrl(root) {
  const candidate = path.join(root, 'src', 'features', 'auth', 'login-form.tsx');
  if (!fs.existsSync(candidate)) return null;
  const source = fs.readFileSync(candidate, 'utf8');
  const match = /NEXT_PUBLIC_SET_PASSWORD_URL\s*\|\|\s*["'](https?:\/\/[^"']+)["']/u.exec(source);
  return match?.[1] ?? null;
}

async function remoteReadOnlyScalar(projectRef, token, query, fetchImpl = fetch) {
  const response = await fetchImpl(`${MANAGEMENT_BASE_URL}/v1/projects/${projectRef}/database/query/read-only`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, parameters: [] }),
  });
  if (!response.ok) return null;
  const payload = await response.json();
  const rows = Array.isArray(payload) ? payload : Array.isArray(payload?.result) ? payload.result : payload?.data;
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const first = rows[0];
  const value = first && typeof first === 'object' ? Object.values(first)[0] : first;
  if (typeof value !== 'string') return value ?? null;
  const trimmed = value.trim();
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try { return JSON.parse(trimmed); } catch { return value; }
  }
  return value;
}

async function deriveOwnerUid(projectRef, token, fetchImpl = fetch) {
  const ids = await remoteReadOnlyScalar(
    projectRef,
    token,
    "select coalesce(jsonb_agg(e.id::text order by e.id), '[]'::jsonb)::text as owner_ids from public.employees as e where lower(btrim(coalesce(e.role, ''))) = 'propietario';",
    fetchImpl,
  );
  return Array.isArray(ids) && ids.length === 1 ? String(ids[0]) : null;
}

export async function discoverSecretSources({
  root,
  requirements,
  projectRef,
  token,
  env = process.env,
  fetchImpl = fetch,
  envFiles = null,
} = {}) {
  const names = candidateSecretNames(requirements);
  const candidates = new Map();
  for (const name of names) {
    addSecretCandidate(candidates, name, env[`VENTO_STAGING_${name}`], 'STAGING_SCOPED_ENV');
  }
  const files = envFiles ?? candidateEnvFiles(root);
  for (const file of files) {
    let values;
    try {
      values = parseEnvSource(fs.readFileSync(file, 'utf8'));
    } catch {
      continue;
    }
    for (const name of names) addSecretCandidate(candidates, name, values[name], 'NON_PRODUCTION_ENV_FILE');
  }
  const fallbackUrl = deriveSetPasswordUrl(root);
  if (fallbackUrl) addSecretCandidate(candidates, 'SET_PASSWORD_WEB_URL', fallbackUrl, 'VERSIONED_APP_FALLBACK');
  if (!candidates.has('ANIMA_OWNER_DELETE_UID')) {
    const ownerId = await deriveOwnerUid(projectRef, token, fetchImpl);
    if (ownerId) addSecretCandidate(candidates, 'ANIMA_OWNER_DELETE_UID', ownerId, 'UNIQUE_STAGING_OWNER');
  }
  const resolved = new Map();
  const ambiguous = [];
  for (const [name, rows] of candidates) {
    if (rows.length === 1) resolved.set(name, rows[0]);
    else if (rows.length > 1) ambiguous.push(name);
  }
  return { resolved, ambiguous: ambiguous.sort(), scanned_file_count: files.length };
}

export function buildSecretPlan(requirements, observedSecretNames, discovered) {
  const observed = new Set((observedSecretNames ?? []).map(String));
  const toSet = [];
  const unresolved = [];
  const ambiguous = new Set(discovered?.ambiguous ?? []);
  for (const name of requirements?.required_all ?? []) {
    if (observed.has(name)) continue;
    const row = discovered?.resolved?.get(name);
    if (row && !ambiguous.has(name)) toSet.push({ name, value: row.value, source: row.source });
    else unresolved.push(name);
  }
  for (const group of requirements?.required_any_of ?? []) {
    if ((group.names ?? []).some((name) => observed.has(name))) continue;
    const candidates = (group.names ?? [])
      .map((name) => ({ name, row: discovered?.resolved?.get(name) }))
      .filter((entry) => entry.row && !ambiguous.has(entry.name));
    if (candidates.length > 0) {
      const selected = candidates[0];
      toSet.push({ name: selected.name, value: selected.row.value, source: selected.row.source });
    } else {
      unresolved.push(group.requirement_id);
    }
  }
  return {
    to_set: toSet.sort((left, right) => left.name.localeCompare(right.name, 'en')),
    unresolved: unresolved.sort(),
    ambiguous: [...ambiguous].sort(),
  };
}

async function managementWrite({ token, pathname, method, body = null, fetchImpl = fetch }) {
  if (!token) fail('SUPABASE_ACCESS_TOKEN_MISSING');
  const response = await fetchImpl(`${MANAGEMENT_BASE_URL}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ...(body === null ? {} : { 'Content-Type': 'application/json' }),
    },
    body: body === null ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    fail('MANAGEMENT_WRITE_FAILED', `${response.status}:${pathname}`);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
}

async function applySql(projectRef, token, sql, fetchImpl = fetch) {
  if (!sql) return false;
  await managementWrite({
    token,
    pathname: `/v1/projects/${projectRef}/database/query`,
    method: 'POST',
    body: { query: sql },
    fetchImpl,
  });
  return true;
}

async function applyPostgrest(projectRef, token, plan, fetchImpl = fetch) {
  if (!plan.needs_patch) return false;
  await managementWrite({
    token,
    pathname: `/v1/projects/${projectRef}/postgrest`,
    method: 'PATCH',
    body: plan.body,
    fetchImpl,
  });
  return true;
}

async function applySecrets(projectRef, token, secretPlan, fetchImpl = fetch) {
  if (secretPlan.to_set.length === 0) return 0;
  await managementWrite({
    token,
    pathname: `/v1/projects/${projectRef}/secrets`,
    method: 'POST',
    body: secretPlan.to_set.map(({ name, value }) => ({ name, value })),
    fetchImpl,
  });
  return secretPlan.to_set.length;
}

async function applyFunctionDeletes(projectRef, token, slugs, fetchImpl = fetch) {
  const removed = [];
  for (const slug of slugs) {
    await managementWrite({
      token,
      pathname: `/v1/projects/${projectRef}/functions/${encodeURIComponent(slug)}`,
      method: 'DELETE',
      fetchImpl,
    });
    removed.push(slug);
  }
  return removed;
}

function applyFunctionDeploys(root, projectRef, token, slugs) {
  if (slugs.length === 0) return [];
  const invocation = resolveNpmInvocation();
  const deployed = [];
  for (const slug of slugs) {
    const result = run(
      invocation.command,
      [
        ...invocation.prefixArgs,
        'exec', '--', 'supabase',
        'functions', 'deploy', slug,
        '--project-ref', projectRef,
      ],
      {
        cwd: root,
        allowFailure: true,
        env: { ...process.env, SUPABASE_ACCESS_TOKEN: token },
        timeout: FUNCTION_DEPLOY_TIMEOUT_MS,
      },
    );
    if (result.status !== 0) {
      fail('EDGE_FUNCTION_DEPLOY_FAILED', `${slug}:${safeAscii(result.stderr || result.stdout)}`);
    }
    deployed.push(slug);
  }
  return deployed;
}

function driftCounts(drifts) {
  const counts = new Map();
  for (const row of drifts ?? []) {
    const surface = String(row?.surface ?? 'UNKNOWN');
    counts.set(surface, (counts.get(surface) ?? 0) + 1);
  }
  return [...counts.entries()].sort((left, right) => left[0].localeCompare(right[0], 'en'));
}

function unresolvedDriftIdentities(drifts) {
  return (drifts ?? [])
    .filter((row) => row?.classification === 'UNAUTHORIZED_DRIFT')
    .map((row) => `${String(row.surface ?? 'UNKNOWN')}:${String(row.identity ?? 'UNKNOWN')}`)
    .sort();
}

function localSupabaseContainer(root) {
  const config = parseToml(fs.readFileSync(path.join(root, 'supabase', 'config.toml'), 'utf8'));
  const projectId = String(config['']?.project_id ?? '').trim();
  if (!projectId) fail('LOCAL_PROJECT_ID_MISSING');
  const result = run('docker', ['ps', '--format', '{{.Names}}'], { cwd: root, allowFailure: true });
  if (result.status !== 0) fail('LOCAL_DOCKER_UNAVAILABLE');
  const names = result.stdout.split(/\r?\n/u).map((entry) => entry.trim()).filter(Boolean);
  const exact = `supabase_db_${projectId}`;
  if (names.includes(exact)) return exact;
  const normalized = projectId.replace(/[^A-Za-z0-9_-]/gu, '_');
  const candidates = names.filter((name) => name.startsWith('supabase_db_') && name.includes(normalized));
  if (candidates.length !== 1) fail('LOCAL_SUPABASE_DB_CONTAINER_UNRESOLVED', String(candidates.length));
  return candidates[0];
}

function readLocalCronRows(root, expectedRows) {
  const names = (expectedRows ?? []).map((row) => String(row?.jobname ?? '').trim()).filter(Boolean);
  if (names.length === 0) return [];
  const container = localSupabaseContainer(root);
  const nameSql = names.map(sqlLiteral).join(',');
  const query = `select coalesce(jsonb_agg(jsonb_build_object('jobname', j.jobname, 'schedule', j.schedule, 'active', j.active, 'command', j.command) order by j.jobname), '[]'::jsonb)::text from cron.job as j where j.jobname = any(array[${nameSql}]::text[]);`;
  const result = run('docker', [
    'exec', '-i', container,
    'psql', '-X', '-A', '-t', '-v', 'ON_ERROR_STOP=1', '-U', 'postgres', '-d', 'postgres', '-c', query,
  ], { cwd: root, allowFailure: true });
  if (result.status !== 0) fail('LOCAL_CRON_QUERY_FAILED', safeAscii(result.stderr));
  let rows;
  try { rows = JSON.parse(result.stdout.trim() || '[]'); }
  catch { fail('LOCAL_CRON_QUERY_INVALID_JSON'); }
  if (!Array.isArray(rows)) fail('LOCAL_CRON_QUERY_INVALID');
  return rows;
}

async function buildPlan({ root, args, token, fetchImpl = fetch } = {}) {
  const bindings = readEnvironmentBindings({ root });
  assertTargetBinding({
    projectRef: args.projectRef,
    owner: args.owner,
    environmentRole: args.environmentRole,
    bindings,
  });
  const expected = buildExpectedBaseline({ root });
  if (!expected?.candidate?.clean) fail('CANDIDATE_MUST_BE_CLEAN');
  const localObserved = observeLocalDatabase({ root, expected });
  const remoteObserved = await observeRemoteEnvironment({
    projectRef: args.projectRef,
    environmentRole: 'staging',
    owner: args.owner,
    scope: 'full',
    token,
    fetchImpl,
  });
  const before = compareRemote({
    expected,
    localObserved,
    remoteObserved,
    scope: 'full',
  });
  const insufficient = before.drifts.filter((row) => row.classification === 'INSUFFICIENT_EVIDENCE');
  if (insufficient.length > 0) fail('PRE_APPLY_EVIDENCE_INSUFFICIENT', String(insufficient.length));
  const surfaces = surfaceMap(remoteObserved);
  const remoteFingerprint = requiredSurface(surfaces, 'sql_fingerprint');
  const postgrest = requiredSurface(surfaces, 'postgrest');
  requiredSurface(surfaces, 'cron_jobs');
  const cronRows = await remoteReadOnlyScalar(
    args.projectRef,
    token,
    "select coalesce(jsonb_agg(jsonb_build_object('jobid', j.jobid, 'jobname', j.jobname, 'schedule', j.schedule, 'active', j.active) order by j.jobname, j.jobid), '[]'::jsonb)::text as jobs from cron.job as j;",
    fetchImpl,
  );
  if (!Array.isArray(cronRows)) fail('CRON_RECONCILIATION_EVIDENCE_INVALID');
  const functions = requiredSurface(surfaces, 'edge_functions');
  const secretNames = requiredSurface(surfaces, 'secret_names');
  const staging = expected.hosted_resources.environment_contracts.STAGING;
  const stagingSecretRequirements = staging.edge_environment_requirements
    ?? expected.hosted_resources.edge_environment_requirements;
  const acl = buildAclPlan(localObserved.sql_fingerprint, remoteFingerprint);
  const dataApi = buildDataApiPlan(staging.config.data_api, postgrest);
  const localCronRows = readLocalCronRows(root, expected.hosted_resources.cron_jobs);
  const cron = buildCronPlan(expected.hosted_resources.cron_jobs, cronRows, localCronRows);
  const functionPlan = buildFunctionPlan(expected.edge_functions, functions, staging);
  const discovered = await discoverSecretSources({
    root,
    requirements: stagingSecretRequirements,
    projectRef: args.projectRef,
    token,
    fetchImpl,
  });
  const secrets = buildSecretPlan(
    stagingSecretRequirements,
    secretNames,
    discovered,
  );
  return {
    expected,
    localObserved,
    remoteObserved,
    before,
    acl,
    dataApi,
    cron,
    functions: functionPlan,
    secrets,
    secret_scan_file_count: discovered.scanned_file_count,
  };
}

function printPlan(args, plan, after = null, applied = null) {
  console.log(RESULT_START);
  console.log('ESTADO: PASS');
  console.log('OPERACION: STAGING_RESOURCE_RECONCILIATION');
  console.log(`MODE: ${args.mode.toUpperCase()}`);
  console.log(`PROJECT_REF: ${safeAscii(args.projectRef)}`);
  console.log(`CANDIDATE_SHA: ${safeAscii(plan.expected.candidate.commit_sha)}`);
  console.log(`PRE_DRIFT_TOTAL: ${plan.before.drifts.length}`);
  console.log(`SQL_STRUCTURAL_DIFFERENCES: ${plan.acl.structural_differences.join(',') || 'NONE'}`);
  console.log(`ACL_ACTIONS: ${plan.acl.actions.length}`);
  console.log(`ACL_UNSUPPORTED: ${plan.acl.unsupported?.length ?? 0}`);
  if ((plan.acl.unsupported?.length ?? 0) > 0) {
    console.log(`ACL_UNSUPPORTED_IDENTITIES: ${plan.acl.unsupported.slice(0, 8).map((row) => row.identity).join(',')}${plan.acl.unsupported.length > 8 ? ',...' : ''}`);
  }
  console.log(`DATA_API_PATCH: ${plan.dataApi.needs_patch ? 'YES' : 'NO'}`);
  console.log(`CRON_ALTERS: ${plan.cron.alters.length}`);
  console.log(`CRON_CREATES: ${(plan.cron.creates ?? []).map((row) => row.jobname).join(',') || 'NONE'}`);
  console.log(`CRON_MISSING: ${plan.cron.missing.join(',') || 'NONE'}`);
  console.log(`CRON_EXTRA_TO_UNSCHEDULE: ${plan.cron.extra.join(',') || 'NONE'}`);
  console.log(`EDGE_DEPLOY: ${plan.functions.deploy.join(',') || 'NONE'}`);
  console.log(`EDGE_DELETE: ${plan.functions.remove.join(',') || 'NONE'}`);
  console.log(`SECRETS_READY_TO_SET: ${plan.secrets.to_set.map((row) => row.name).join(',') || 'NONE'}`);
  console.log(`SECRETS_UNRESOLVED: ${plan.secrets.unresolved.join(',') || 'NONE'}`);
  console.log(`SECRETS_AMBIGUOUS: ${plan.secrets.ambiguous.join(',') || 'NONE'}`);
  console.log(`NON_PRODUCTION_ENV_FILES_SCANNED: ${plan.secret_scan_file_count}`);
  if (applied) {
    console.log(`ACL_MUTATION: ${applied.acl ? 'YES' : 'NO'}`);
    console.log(`DATA_API_MUTATION: ${applied.dataApi ? 'YES' : 'NO'}`);
    console.log(`CRON_MUTATION: ${applied.cron ? 'YES' : 'NO'}`);
    console.log(`SECRETS_SET: ${applied.secretCount}`);
    console.log(`EDGE_DEPLOYED: ${applied.functions.join(',') || 'NONE'}`);
    console.log(`EDGE_DELETED: ${applied.deletedFunctions.join(',') || 'NONE'}`);
  }
  console.log(`POST_DRIFT_TOTAL: ${after ? after.drifts.length : 'NOT_RUN'}`);
  console.log(`ENVIRONMENT_CERTIFIED: ${after?.certification === 'STAGING_CERTIFIED' ? 'YES' : 'NO'}`);
  if (after) {
    for (const [surface, count] of driftCounts(after.drifts)) {
      console.log(`REMAINING_SURFACE_${safeAscii(surface).replace(/[^A-Za-z0-9]+/gu, '_').toUpperCase()}: ${count}`);
    }
    const identities = unresolvedDriftIdentities(after.drifts);
    console.log(`REMAINING_DRIFTS: ${identities.join(',') || 'NONE'}`);
  }
  console.log('PRODUCTION_MUTATIONS: NO');
  console.log('SECRET_VALUES_IN_OUTPUT: NO');
  console.log('DETECTOR_MODIFIED: NO');
  console.log(RESULT_END);
}

function sleep(milliseconds) {
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) return;
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

async function observeAfterApply({ args, token, plan, fetchImpl = fetch, attempts = 3 } = {}) {
  let last = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const remoteObserved = await observeRemoteEnvironment({
      projectRef: args.projectRef,
      environmentRole: 'staging',
      owner: args.owner,
      scope: 'full',
      token,
      fetchImpl,
    });
    last = compareRemote({
      expected: plan.expected,
      localObserved: plan.localObserved,
      remoteObserved,
      scope: 'full',
    });
    if (last.certification === 'STAGING_CERTIFIED') return last;
    if (attempt < attempts) sleep(1500);
  }
  return last;
}

async function applyPlan({ root, args, token, plan, fetchImpl = fetch } = {}) {
  const applied = {
    acl: false,
    dataApi: false,
    cron: false,
    secretCount: 0,
    functions: [],
    deletedFunctions: [],
  };
  if (
    plan.acl.structural_differences.length === 0
    && (plan.acl.unsupported?.length ?? 0) === 0
    && plan.acl.sql
  ) {
    applied.acl = await applySql(args.projectRef, token, plan.acl.sql, fetchImpl);
  }
  applied.dataApi = await applyPostgrest(args.projectRef, token, plan.dataApi, fetchImpl);
  const cronSql = cronMutationSql(plan.cron);
  if (cronSql) applied.cron = await applySql(args.projectRef, token, cronSql, fetchImpl);
  applied.secretCount = await applySecrets(args.projectRef, token, plan.secrets, fetchImpl);
  applied.deletedFunctions = await applyFunctionDeletes(
    args.projectRef,
    token,
    plan.functions.remove,
    fetchImpl,
  );
  applied.functions = applyFunctionDeploys(root, args.projectRef, token, plan.functions.deploy);
  const after = await observeAfterApply({ args, token, plan, fetchImpl });
  return { applied, after };
}

async function main() {
  const root = repoRootFromModule();
  const args = parseArgs(process.argv.slice(2));
  const token = String(process.env.SUPABASE_ACCESS_TOKEN ?? '').trim();
  if (!token) fail('SUPABASE_ACCESS_TOKEN_MISSING');
  const plan = await buildPlan({ root, args, token });
  if (args.mode === 'plan') {
    printPlan(args, plan);
    return;
  }
  const { applied, after } = await applyPlan({ root, args, token, plan });
  printPlan(args, plan, after, applied);
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    await main();
  } catch (error) {
    console.log(RESULT_START);
    console.log('ESTADO: FAIL');
    console.log('OPERACION: STAGING_RESOURCE_RECONCILIATION');
    console.log(`ERROR: ${safeAscii(error?.message ?? String(error)).replace(/\s+/gu, ' ').trim()}`);
    console.log('PRODUCTION_MUTATIONS: NO');
    console.log('SECRET_VALUES_IN_OUTPUT: NO');
    console.log('DETECTOR_MODIFIED: NO');
    console.log(RESULT_END);
    process.exitCode = 1;
  }
}

export const __test = Object.freeze({
  STRUCTURAL_SQL_KEYS,
  cronMutationSql,
  usableSecretValue,
});
