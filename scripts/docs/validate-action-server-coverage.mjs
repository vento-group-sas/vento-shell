// Reconciles declared server obligations with every action in the source matrix.
export function validateActionServerCoverage(source, expectedCount = 1320) {
  const block = (id) => source.match(new RegExp(`^### ✅ ${id} —[^\\n]*\\n([\\s\\S]*?)(?=^### (?:✅|\\[ \\]) |$(?![\\s\\S]))`, 'mu'))?.[1];
  const server = block('AUTH-UI-043');
  if (!server) return { skipped: true, actions: 0, modes: 0 };
  const actions = block('AUTH-UI-031');
  if (!actions) throw new Error('AUTH-UI-043 requiere la matriz aprobada de AUTH-UI-031.');
  const rows = actions.split('\n').filter(line => /^\|\s*`[^`]+::(?:PRIMARY|SECONDARY:\d+)`\s*\|/u.test(line));
  const ids = new Set();
  const modes = new Set();
  for (const row of rows) {
    const cells = row.split('|').slice(1, -1).map(cell => cell.trim().replace(/^`|`$/gu, ''));
    if (ids.has(cells[0])) throw new Error(`AUTH-UI-031: acción duplicada ${cells[0]}.`);
    ids.add(cells[0]);
    // assignment_mode is the ninth column of the canonical action register.
    if (!/^ACTION-[A-Z-]+$/u.test(cells[8] ?? '')) throw new Error(`${cells[0]}: assignment_mode ausente o inválido.`);
    modes.add(cells[8]);
  }
  if (ids.size !== expectedCount) throw new Error(`AUTH-UI-031: ${ids.size} acciones; se requieren ${expectedCount}.`);
  const obligations = [...server.matchAll(/^\|\s*`(ACTION-[A-Z-]+)`\s*\|\s*([^\n|]+)\|\s*$/gmu)];
  const declared = new Set();
  for (const [, mode, obligation] of obligations) {
    if (declared.has(mode)) throw new Error(`AUTH-UI-043: modalidad duplicada ${mode}.`);
    if (!obligation.trim()) throw new Error(`AUTH-UI-043: obligación vacía ${mode}.`);
    declared.add(mode);
  }
  const missing = [...modes].filter(mode => !declared.has(mode));
  const extra = [...declared].filter(mode => !modes.has(mode));
  if (missing.length || extra.length) throw new Error(`AUTH-UI-043: modalidades sin obligación: ${missing.join(', ') || 'ninguna'}; sin fuente: ${extra.join(', ') || 'ninguna'}.`);
  return { skipped: false, actions: ids.size, modes: modes.size };
}
