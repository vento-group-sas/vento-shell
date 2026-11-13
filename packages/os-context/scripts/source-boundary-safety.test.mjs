import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// This DRAFT gate is intentionally limited to the three non-legacy entrypoints.
// Only SHELL-AUTH-002 with its own approval may introduce runtime adapters.
const CONTRACT_TYPES = '@vento/contracts/authorization/response-contracts/v1';
const CANONICAL = ['server', 'client', 'testing'];

function inspectBoundary(name, source) {
  if (!CANONICAL.includes(name)) throw new Error('UNREVIEWED_BOUNDARY');
  const tree = ts.createSourceFile(name + '.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (tree.parseDiagnostics.length) throw new Error('CANONICAL_SOURCE_BOUNDARY_PARSE_ERROR');
  const imports = [];
  function visit(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      if (node.moduleSpecifier) {
        const specifier = ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : null;
        const typeOnly = node.isTypeOnly === true || node.importClause?.isTypeOnly === true;
        if (!specifier || name !== 'server' || !typeOnly || specifier !== CONTRACT_TYPES) {
          throw new Error('CANONICAL_SOURCE_BOUNDARY_IMPORT_FORBIDDEN');
        }
        imports.push(specifier);
      }
    } else if (ts.isImportEqualsDeclaration(node)) {
      throw new Error('CANONICAL_SOURCE_BOUNDARY_IMPORT_EQUALS_FORBIDDEN');
    } else if (ts.isCallExpression(node)) {
      const target = node.expression;
      if (target.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(target) && ['require', 'fetch', 'eval'].includes(target.text)) ||
          (ts.isPropertyAccessExpression(target) &&
            ['rpc', 'fetch', 'require', 'import'].includes(target.name.text))) {
        throw new Error('CANONICAL_SOURCE_BOUNDARY_RUNTIME_CALL_FORBIDDEN');
      }
    } else if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) &&
      ['Function', 'WebSocket', 'XMLHttpRequest'].includes(node.expression.text)) {
      throw new Error('CANONICAL_SOURCE_BOUNDARY_DYNAMIC_RUNTIME_FORBIDDEN');
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return imports;
}

test('security: only the approved type-only contract can cross a canonical entrypoint', () => {
  for (const name of CANONICAL) {
    const source = readFileSync(new URL('../src/' + name + '/index.ts', import.meta.url), 'utf8');
    const modules = inspectBoundary(name, source);
    assert.deepEqual(modules, name === 'server' ? [CONTRACT_TYPES] : [], name);
  }
});

test('security: canonical imports, reexports, dynamic calls and RPC reachability fail closed', () => {
  const malicious = [
    "import { getEffectiveContext } from '../client.js';",
    "export * from '../legacy/index.js';",
    "import type { EffectiveContext } from '../types.js';",
    "export { AccessContextV1 } from '@vento/contracts/authorization/response-contracts/v1';",
    "async function go() { return import('../legacy/index.js'); }",
    "const supabase = require('@supabase/supabase-js');",
    "const f = fetch('https://example.invalid');",
    "const response = supabase.rpc('get_effective_context_v1');",
    "const response = globalThis.fetch('https://example.invalid');",
    "const unsafe = new Function('return 1');",
    "const socket = new WebSocket('wss://example.invalid');",
  ];
  for (const fragment of malicious) {
    for (const name of CANONICAL) {
      assert.throws(() => inspectBoundary(name, fragment),
        /^Error: CANONICAL_SOURCE_BOUNDARY_/u, name + ': ' + fragment);
    }
  }
});
