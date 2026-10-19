import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');
const components = Object.freeze([
  ['Alert', 'alert'], ['AppShell', 'app-shell'], ['AreaSelector', 'area-selector'],
  ['Button', 'button'], ['Card', 'card'],
  ['ContextDiagnostic', 'context-diagnostic'], ['ContextIndicator', 'context-indicator'],
  ['CrossAppHandoff', 'cross-app-handoff'], ['EmptyState', 'empty-state'],
  ['InterruptedProcessState', 'interrupted-process-state'],
  ['KioskTaskSurface', 'kiosk-task-surface'],
  ['PrimaryActionPanel', 'primary-action-panel'],
  ['ProcessStatusLine', 'process-status-line'],
  ['RecoverableErrorState', 'recoverable-error-state'],
  ['SensitiveActionConfirmation', 'sensitive-action-confirmation'],
  ['SimulatedRoleNotice', 'simulated-role-notice'],
  ['SiteSelector', 'site-selector'], ['TabletTaskSurface', 'tablet-task-surface'],
  ['TaskNavigation', 'task-navigation'],
]);
const clientModules = new Set(['AppShell', 'AreaSelector', 'SiteSelector']);

function assert(condition, reason) {
  if (!condition) throw new Error('UI_WEB_BUILD:' + reason);
}

function regularFile(filename) {
  const info = fs.lstatSync(filename);
  assert(info.isFile() && !info.isSymbolicLink(), 'NONREGULAR_FILE:' + filename);
}

function readFile(filename) {
  regularFile(filename);
  return fs.readFileSync(filename, 'utf8');
}

function runBuild() {
  assert(components.length === 19 && new Set(components.map(([name]) => name)).size === 19,
    'UNEXPECTED_COMPONENT_INVENTORY');
  const manifest = JSON.parse(readFile(path.join(root, 'package.json')));
  assert(manifest.name === '@vento/ui-web' && manifest.private === true,
    'UNAPPROVED_PUBLIC_RELEASE');
  const configPath = path.join(root, 'tsconfig.build.json');
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  assert(!config.error, 'TYPESCRIPT_CONFIG_UNREADABLE');
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root, undefined, configPath);
  assert(parsed.errors.length === 0, 'TYPESCRIPT_CONFIG_INVALID:' +
    ts.formatDiagnostics(parsed.errors, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n',
    }));
  assert(parsed.options.declaration === true && parsed.options.emitDeclarationOnly === true
    && parsed.options.noEmit === false && parsed.options.incremental === false,
  'DECLARATION_EMIT_NOT_ISOLATED');
  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const diagnostic = ts.getPreEmitDiagnostics(program).filter((entry) =>
    entry.category === ts.DiagnosticCategory.Error);
  if (diagnostic.length) {
    throw new Error('UI_WEB_BUILD:TYPESCRIPT:' + ts.formatDiagnostics(diagnostic, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n',
    }));
  }

  const stylesheetEntry = readFile(path.join(src, 'styles.css'));
  const imports = stylesheetEntry.trim().split(/\r?\n/u).map((line) => {
    const match = /^@import '\.\/([a-z0-9-]+\.css)';$/u.exec(line);
    assert(match, 'INVALID_STYLESHEET_IMPORT:' + line);
    return match[1];
  });
  const expectedStyles = components.map(([, css]) => css + '.css');
  assert(imports.length === 19 && imports.every((item, i) => item === expectedStyles[i])
    && new Set(imports).size === 19, 'UNEXPECTED_STYLESHEET_ORDER');
  const cssParts = imports.map((file) => {
    const content = readFile(path.join(src, file));
    assert(!/@import\b|@tailwind\b/iu.test(content), 'CSS_NESTED_GLOBAL_IMPORT:' + file);
    return '/* @vento/ui-web: ' + file + ' */\n' + content.trim() + '\n';
  });
  const cleanedSource = new Map();
  for (const [component, css] of components) {
    const input = readFile(path.join(src, component + '.tsx'));
    const cssImport = "import './" + css + ".css';";
    assert(input.split(cssImport).length === 2, 'CSS_IMPORT_CARDINALITY:' + component);
    const source = input.replace(cssImport, '');
    assert(!/^\s*import\s+['"][^'"]+\.css['"];?/mu.test(source),
      'UNEXPECTED_CSS_SIDE_EFFECT:' + component);
    if (clientModules.has(component)) {
      assert(/^'use client';/u.test(source), 'MISSING_CLIENT_BOUNDARY:' + component);
    } else {
      assert(!/^(?:'|")use client(?:'|");/u.test(source), 'UNEXPECTED_CLIENT_BOUNDARY:' + component);
    }
    cleanedSource.set(component, source);
  }

  if (fs.existsSync(dist)) {
    const info = fs.lstatSync(dist);
    assert(info.isDirectory() && !info.isSymbolicLink(), 'UNSAFE_DIST_DIRECTORY');
    fs.rmSync(dist, { recursive: true, force: true });
  }
  fs.mkdirSync(dist, { recursive: true });
  const emitted = program.emit();
  assert(!emitted.emitSkipped && !emitted.diagnostics.some((item) =>
    item.category === ts.DiagnosticCategory.Error), 'DECLARATION_EMIT_FAILED');
  // Declaration emit can retain TypeScript's side-effect CSS imports. The public
  // stylesheet is loaded explicitly once by consumers; declarations must not import CSS.
  for (const [component, css] of components) {
    const filename = path.join(dist, component + '.d.ts');
    const declaration = readFile(filename);
    const cssImport = "import './" + css + ".css';";
    assert(declaration.split(cssImport).length === 2,
      'DECLARATION_CSS_IMPORT_CARDINALITY:' + component);
    const cleaned = declaration.replace(cssImport, '').replace(
      /\bfrom\s+(['"])\.\/([A-Za-z0-9_-]+)\1/gu,
      (_full, quote, spec) => 'from ' + quote + './' + spec + '.js' + quote,
    );
    fs.writeFileSync(filename, cleaned, 'utf8');
  }
  const compilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  };
  for (const [component] of components) {
    const result = ts.transpileModule(cleanedSource.get(component), {
      compilerOptions, fileName: component + '.tsx', reportDiagnostics: true,
    });
    assert(!result.diagnostics?.some((item) => item.category === ts.DiagnosticCategory.Error),
      'TRANSPILE_ERROR:' + component + ':' + ts.formatDiagnostics(result.diagnostics ?? [], {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: () => root,
        getNewLine: () => '\n',
      }));
    const output = result.outputText.replace(
      /\bfrom\s+(['"])\.\/([A-Za-z0-9_-]+)\1/gu,
      (_full, quote, spec) => 'from ' + quote + './' + spec + '.js' + quote,
    );
    if (clientModules.has(component)) {
      assert(/^['"]use client['"];?/u.test(output), 'CLIENT_DIRECTIVE_NOT_EMITTED:' + component);
    }
    assert(!/\bimport\s+['"][^'"]+\.css['"]/u.test(output),
      'DUPLICATE_CSS_RUNTIME_IMPORT:' + component);
    fs.writeFileSync(path.join(dist, component + '.js'), output, 'utf8');
  }
  const index = readFile(path.join(src, 'index.ts'));
  const indexResult = ts.transpileModule(index, {
    compilerOptions, fileName: 'index.ts', reportDiagnostics: true,
  });
  assert(!indexResult.diagnostics?.some((item) => item.category === ts.DiagnosticCategory.Error),
    'INDEX_TRANSPILE_FAILED');
  assert(!/\bfrom\s+['"]\.\/[^'"]+(?<!\.js)['"]/u.test(indexResult.outputText),
    'INDEX_MISSING_JS_SPECIFIER');
  fs.writeFileSync(path.join(dist, 'index.js'), indexResult.outputText, 'utf8');
  fs.writeFileSync(path.join(dist, 'styles.css'), cssParts.join('\n'), 'utf8');

  for (const name of [...components.map(([value]) => value), 'index']) {
    regularFile(path.join(dist, name + '.d.ts'));
    regularFile(path.join(dist, name + '.js'));
  }
  regularFile(path.join(dist, 'styles.css'));
  assert(fs.readdirSync(dist).sort().length === 41, 'UNEXPECTED_DIST_SURFACE');
  console.log('UI_WEB_BUILD:PASS');
  console.log('UI_WEB_COMPONENT_MODULES:' + components.length);
  console.log('UI_WEB_CLIENT_LEAVES:' + clientModules.size);
  console.log('UI_WEB_CSS_SOURCES:' + imports.length);
  console.log('UI_WEB_OUTPUT_FILES:' + fs.readdirSync(dist).length);
}

try {
  runBuild();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
