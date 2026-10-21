import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const workflowPath = path.resolve('.github/workflows/validate-canonical-plan.yml');
const watcherPath = path.resolve('scripts/docs/watch-plan-canonico.mjs');
const safeBuildPath = path.resolve('scripts/docs/safe-build-plan-canonico.mjs');
const buildWrapperPath = path.resolve('scripts/docs/build-plan-canonico.mjs');
const productionIntegrationPath = path.resolve(
  'docs/plan-canonico/modular/bloques/X_INTEGRACIONES/05_PRODUCCION_E_INVENTARIO.md',
);
const posTransitionPath = path.resolve(
  'docs/plan-canonico/modular/bloques/X_INTEGRACIONES/06_TRANSICION_DEL_POS_EXTERNO.md',
);
const implementationPackagesPath = path.resolve(
  'docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/02_PAQUETES_DE_IMPLEMENTACION.md',
);
const canonicalGapRegistryPath = path.resolve(
  'docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/07_REGISTRO_CANONICO_DE_BRECHAS.md',
);
const processGapReturnPath = path.resolve(
  'docs/plan-canonico/modular/bloques/E2_PROCESOS_Y_EXPERIENCIA/06_03_MATRIZ_ASIS_TOBE_Y_RETORNO_DE_BRECHAS.md',
);

function sliceSection(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.ok(start >= 0 && end > start, `no se pudo aislar ${startMarker}`);
  return source.slice(start, end);
}

test('verifica rango incremental de PR, fuentes antes del build y compilado regenerado', () => {
  const workflow = fs.readFileSync(workflowPath, 'utf8');
  const prebuildCheck = workflow.indexOf(
    'Verificar fuentes y derivados versionados antes de compilar',
  );
  const build = workflow.indexOf('Compilar plan canónico');
  const reproducibleBuild = workflow.indexOf(
    'Verificar que la compilación sea reproducible sin cambios',
  );

  assert.ok(prebuildCheck >= 0, 'falta el check pre-build de fuentes y derivados versionados');
  assert.ok(build > prebuildCheck, 'el build debe ejecutarse después del check pre-build');
  assert.ok(
    reproducibleBuild > build,
    'la comprobación de reproducibilidad debe ejecutarse después del build',
  );
  assert.match(
    workflow.slice(prebuildCheck, build),
    /run: npm run docs:plan:check/u,
  );
  assert.match(
    workflow.slice(reproducibleBuild),
    /run: git diff --exit-code -- docs\/plan-canonico\/modular/u,
  );
  assert.match(workflow, /Verificar alcance fisico autorizado de implementacion/u);
  assert.match(workflow, /steps\.scope\.outputs\.implementation_pr == 'true'/u);
  assert.match(workflow, /--implementation-head-ref "\$HEAD_REF"/u);
  assert.match(workflow, /--range "\$BASE_SHA\.\.\$HEAD_SHA"/u);
  assert.match(workflow, /Verificar aislamiento de commits en pull request inicial/u);
  assert.match(workflow, /implementation_pr != 'true'/u);
  assert.match(workflow, /Verificar aislamiento de commits incorporados por el push actual/u);
  assert.match(workflow, /git cat-file -e "\$BEFORE_SHA\^\{commit\}"/u);
  assert.match(workflow, /git merge-base --is-ancestor "\$BEFORE_SHA" "\$HEAD_SHA"/u);
  assert.match(workflow, /RANGE="\$BASE_SHA\.\.\$HEAD_SHA"/u);
  assert.doesNotMatch(
    workflow,
    /docs:commit-scope:check -- --range "\$\{\{ github\.event\.before \}\}\.\.\$\{\{ github\.event\.pull_request\.head\.sha \}\}"/u,
  );
  assert.doesNotMatch(
    workflow,
    /docs:commit-scope:check -- --range "\$\{\{ github\.event\.pull_request\.base\.sha \}\}\.\.\$\{\{ github\.sha \}\}"/u,
  );
  assert.match(workflow, /uses: actions\/upload-artifact@v7/u);
  assert.doesNotMatch(workflow, /uses: actions\/upload-artifact@v[1-6]\b/u);
  assert.match(workflow, /PLAN_IMPLEMENTACION_VENTO_OS_CANONICO_COMPILADO\.md/u);
  assert.match(workflow, /retention-days: 7/u);
  assert.match(workflow, /fetch-depth: 0/u);
  assert.match(workflow, /quality:lint:ratchet/u);
});

test('el watcher arranca en solo lectura y recompila solo ante cambios documentales reales', () => {
  const watcher = fs.readFileSync(watcherPath, 'utf8');

  assert.match(watcher, /"build-plan-canonico\.mjs"/u);
  assert.doesNotMatch(watcher, /\[safeBuildScript\]/u);
  assert.match(watcher, /"sync-pending-task-context\.mjs"/u);
  assert.match(
    watcher,
    /\[pendingTaskContextCheckScript, "--check"\]/u,
  );
  assert.match(watcher, /"normalize-retired-priority-route\.mjs"/u);
  assert.match(watcher, /"repository-drift\.mjs"/u);
  assert.match(watcher, /"repository-drift-baseline\.json"/u);
  assert.match(watcher, /if \(!existsSync\(repositoryDriftBaseline\)\)/u);
  assert.match(watcher, /driftArgs\.push\("--write-baseline"\)/u);
  assert.match(watcher, /driftIntervalMs = 30 \* 60 \* 1000/u);
  assert.match(watcher, /verifyInitialState/u);
  assert.match(watcher, /function terminalSafeText/u);
  assert.match(watcher, /installTerminalSafeConsole\(\);/u);
  assert.match(watcher, /Verificación inicial de solo lectura/u);
  assert.match(watcher, /Comprobando fuentes y compilado sin escribir/u);
  assert.match(watcher, /Fuentes comprobadas sin rebuild ni cambios versionados/u);
  assert.doesNotMatch(watcher, /rebuild\("verificación inicial"\)/u);
  assert.doesNotMatch(watcher, /writeCurrentTaskDevelopmentArtifacts/u);
  assert.doesNotMatch(watcher, /writeImplementationControlArtifacts/u);
  assert.doesNotMatch(watcher, /writeChatgptWorkStarter/u);
  assert.match(watcher, /"plan-watch\.lock\.json"/u);
  assert.match(watcher, /"plan-status\.md"/u);
  assert.match(watcher, /acquireWatcherLock/u);
  assert.match(watcher, /releaseWatcherLock/u);
  assert.match(watcher, /publishStatus\("COMPILANDO"\)/u);
  assert.match(watcher, /publishStatus\("VIGILANDO"\)/u);
  assert.match(watcher, /ACCIÓN PRINCIPAL/u);
  assert.match(watcher, /invalidPendingJsonFiles/u);
  assert.match(watcher, /ESPERANDO_JSON_COMPLETO/u);
  assert.match(watcher, /JSON todavía guardándose; compilación pospuesta/u);
  assert.match(watcher, /sustituida por un guardado más reciente/u);
});

test('el build prepara formato sin iniciar tareas vacías', () => {
  const safeBuild = fs.readFileSync(safeBuildPath, 'utf8');
  const audit = safeBuild.indexOf('assertProspectiveTasks({ root })');
  const prepare = safeBuild.indexOf('autoPrepareCanonicalTask({');
  const continuity = safeBuild.indexOf('syncPlanContinuity({');

  assert.ok(audit >= 0, 'falta la auditoría prospectiva agregada');
  assert.ok(prepare > audit, 'la auditoría completa debe ejecutarse antes de la preparación puntual');
  assert.ok(prepare >= 0, 'falta la preparación automática de tareas');
  assert.ok(continuity > prepare, 'el formato debe prepararse antes de sincronizar continuidad');
  assert.match(safeBuild, /checkOnly: process\.argv\.includes\('--check'\)/u);
  const autoPrepare = fs.readFileSync(path.resolve('scripts/docs/auto-prepare-canonical-task.mjs'), 'utf8');
  assert.match(autoPrepare, /isHistoricalApprovedExemption\(taskId, developmentPolicy\)/u);
  assert.match(safeBuild, /additionalTaskIds: prospectiveAudit\.normalizableTaskIds/u);
});

test('el build publica un estado local legible sin volverlo canónico', () => {
  const buildWrapper = fs.readFileSync(buildWrapperPath, 'utf8');
  assert.match(buildWrapper, /try \{\s+await import\('\.\/safe-build-plan-canonico\.mjs'\)/u);
  const terminalGuard = buildWrapper.indexOf('installTerminalSafeConsole();');
  const safeBuildImport = buildWrapper.indexOf("await import('./safe-build-plan-canonico.mjs')");
  assert.ok(terminalGuard >= 0 && terminalGuard < safeBuildImport, 'la normalizacion ASCII debe instalarse antes de importar safe-build');
  assert.match(buildWrapper, /function terminalSafeText/u);
  assert.match(
    buildWrapper,
    /\[PLAN CAN\\u00d3NICO\] Validaci\\u00f3n bloqueada:/u,
  );
  assert.match(buildWrapper, /\\u279c ACCI\\u00d3N PRINCIPAL/u);
  assert.match(buildWrapper, /process\.exit\(1\)/u);
  assert.match(buildWrapper, /"plan-status\.md"|'plan-status\.md'/u);
  assert.match(buildWrapper, /writePlanWatchStatus/u);
  assert.match(buildWrapper, /state: 'COMPILACI\\u00d3N COMPLETADA'/u);
  assert.match(buildWrapper, /derivePreflight/u);
  assert.match(buildWrapper, /writeCurrentTaskDevelopmentArtifacts/u);
  assert.match(buildWrapper, /writeImplementationControlArtifacts/u);
  assert.match(buildWrapper, /writeChatgptWorkStarter/u);
  assert.match(buildWrapper, /implementationControl/u);
});

test('INT-PROD conserva decidir, ejecutar y verificar sin dependencia circular', () => {
  const source = fs.readFileSync(productionIntegrationPath, 'utf8');
  const start = source.indexOf('### ✅ INT-PROD-003');
  const end = source.indexOf('### ✅ INT-PROD-004', start);
  assert.ok(start >= 0 && end > start, 'no se pudo aislar INT-PROD-003');
  const task = source.slice(start, end);

  assert.doesNotMatch(task, /Solo una disposición de calidad registrada y verificada/u);
  assert.doesNotMatch(task, /Solo la existencia expresamente liberada puede ser candidata/u);
  assert.match(task, /DISPOSITION_DECIDED → ejecución de la disposición → EXECUTION_VERIFICATION_PENDING → QUALITY_DISPOSITION_VERIFIED/u);
  assert.match(task, /QUALITY_DISPOSITION_VERIFIED` no constituye una precondición/u);

  const decided = task.indexOf('`VPROC-0035.EVT-004` — disposición decidida');
  const pending = task.indexOf('`VPROC-0035.EVT-005` — verificación de ejecución pendiente');
  const verified = task.indexOf('`VPROC-0035.EVT-006` — disposición de calidad verificada');
  assert.ok(decided >= 0 && decided < pending && pending < verified);
});

test('INT-PROD-005 conserva su predecesora aprobada y reserva INT-POS-001', () => {
  const source = fs.readFileSync(productionIntegrationPath, 'utf8');
  const start = source.indexOf('### ✅ INT-PROD-005');
  assert.ok(start >= 0, 'no se pudo aislar INT-PROD-005');
  const task = source.slice(start);

  assert.match(
    task,
    /Tarea anterior dentro del flujo integral[^\n]+INT-PROD-004[^\n]+APROBADA/u,
  );
  assert.doesNotMatch(task, /INT-PROD-004[^\n]+NO INICIADA/u);
  assert.match(task, /PREDECESORA CANÓNICA APROBADA\s+INT-PROD-004/u);
  assert.match(task, /ÚLTIMA TAREA CANÓNICA APROBADA\s+INT-PROD-005/u);
  assert.match(task, /SIGUIENTE TAREA RESERVADA — NO INICIADA\s+INT-POS-001/u);
});

test('INT-POS-018 entrega acumulación, reversión y conciliación a identidades PASS vigentes', () => {
  const source = fs.readFileSync(posTransitionPath, 'utf8');
  const start = source.indexOf('### ✅ INT-POS-018');
  const end = source.indexOf('### ✅ INT-POS-019', start);
  assert.ok(start >= 0 && end > start, 'no se pudo aislar INT-POS-018');
  const task = source.slice(start, end);

  assert.doesNotMatch(task, /PASS-INT-006|PASS-INT-007/u);
  assert.doesNotMatch(task, /correlación evento-cuenta-movimiento[^\n]+PASS-INT-003/u);
  assert.doesNotMatch(task, /idempotencia detallada de acumulación[^\n]+PASS-INT-004/u);
  assert.match(task, /correlación evento-cuenta-movimiento de acumulación[^\n]+PASS-INT-001/u);
  assert.match(task, /idempotencia detallada de acumulación[^\n]+PASS-INT-001/u);
  assert.match(task, /reversión o compensación de acumulación PASS[^\n]+PASS-INT-001/u);
  assert.match(task, /conciliación de acumulación PASS[^\n]+PASS-INT-001[^\n]+PASS-QA-001/u);
});

test('DELIV-PKG-003 conserva un único título canónico en sus referencias de continuidad', () => {
  const source = fs.readFileSync(implementationPackagesPath, 'utf8');
  const canonicalTitle = 'Definir aplicación, dominio y repositorio propietarios';

  const taskHeadings = [
    ...source.matchAll(/^### (?<marker>.*?)DELIV-PKG-003 — (?<title>[^\n]+)$/gmu),
  ];
  assert.equal(taskHeadings.length, 1, 'DELIV-PKG-003 debe tener un único marcador canónico');
  assert.equal(taskHeadings[0].groups.title, canonicalTitle);
  const titledReferences = [
    ...source.matchAll(/`DELIV-PKG-003 — (?<title>[^`\n]+)`/gu),
  ];
  assert.ok(titledReferences.length > 0, 'faltan referencias tituladas a DELIV-PKG-003');
  assert.deepEqual(
    [...new Set(titledReferences.map((match) => match.groups.title))],
    [canonicalTitle],
  );
});

test('DELIV-PKG-001 separa identidad raíz de frontera física sin perder el cierre obligatorio', () => {
  const packages = fs.readFileSync(implementationPackagesPath, 'utf8');
  const gapRegistry = fs.readFileSync(canonicalGapRegistryPath, 'utf8');
  const task = sliceSection(packages, '### ✅ DELIV-PKG-001', '### ✅ DELIV-PKG-002');

  assert.doesNotMatch(gapRegistry, /Durante `DELIV-PKG-001` se deberá:/u);
  assert.match(gapRegistry, /Esta regla rectifica el mandato histórico/u);
  assert.match(task, /`implementation_unit_id`/u);
  assert.match(task, /`DELIV-PKG-025` deberá registrar para cada uno de los 207 expedientes/u);
  assert.match(task, /KEEP_AS_SINGLE_UNIT/u);
  assert.match(task, /SPLIT_INTO_IMPLEMENTATION_UNITS/u);
  assert.match(task, /SHARE_IMPLEMENTATION_UNIT_WITH_LINEAGE/u);
});

test('DELIV-PKG-002 materializa exactamente los vínculos históricos proceso-paquete aprobados', () => {
  const packages = fs.readFileSync(implementationPackagesPath, 'utf8');
  const gapRegistry = fs.readFileSync(canonicalGapRegistryPath, 'utf8');
  const processReturn = fs.readFileSync(processGapReturnPath, 'utf8');

  const packageProcessMatrix = sliceSection(
    packages,
    '##### 7.2. Matriz histórica `package_id` ↔ `process_id`',
    '#### 8. Tratamiento de la línea histórica',
  );
  const actual = packageProcessMatrix
    .split(/\r?\n/u)
    .filter((line) => /^\|/u.test(line))
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim().replaceAll('`', '')),
    )
    .filter(
      (cells) =>
        cells.length === 6 &&
        /^GAP-PKG-\d{3}$/u.test(cells[0]) &&
        /^VPROC-\d{4}$/u.test(cells[1]) &&
        /^CAP-[0-9]{2}\.[0-9]{2}$/u.test(cells[4]),
    )
    .map((cells) => cells.join('|'));

  const historicalGapMatrix = sliceSection(
    gapRegistry,
    '#### 9. Matriz completa brecha → tarea → paquete',
    '#### 10. Referencias de control o evidencia',
  );
  const gapToPackage = new Map();
  for (const line of historicalGapMatrix.split(/\r?\n/u)) {
    if (!/^\|\s*`/u.test(line) || !line.includes('GAP-PKG-')) continue;
    const identities = line.match(/^\|\s*`([^`]+)`\s*\|\s*`([^`]+)`/u);
    const packageId = line.match(/`(GAP-PKG-\d{3})`/u);
    if (!identities || !packageId) continue;
    gapToPackage.set(identities[1], { gapId: identities[1], packageId: packageId[1] });
    gapToPackage.set(identities[2], { gapId: identities[1], packageId: packageId[1] });
  }

  const processGapMatrix = sliceSection(
    processReturn,
    '#### 5. PROCESS-GAP-RETURN-MATRIX-001',
    '#### 6. PROCESS-GAP-REGISTER-DELTA-001',
  );
  const expected = [];
  for (const line of processGapMatrix.split(/\r?\n/u)) {
    if (!/^\|\s*`VPROC-/u.test(line)) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim().replaceAll('`', ''));
    const [processId, , capabilityId, , , decision, gaps] = cells;
    if (gaps === '—' || gaps.includes('H-PROC-COVER-010-')) continue;

    for (const sourceGap of gaps.split(';').map((gap) => gap.trim())) {
      const resolved = gapToPackage.get(sourceGap);
      assert.ok(resolved, `brecha de proceso sin paquete histórico: ${sourceGap}`);
      expected.push(
        [
          resolved.packageId,
          processId,
          sourceGap,
          resolved.gapId,
          capabilityId,
          decision,
        ].join('|'),
      );
    }
  }

  assert.equal(actual.length, 53);
  assert.equal(new Set(actual).size, 53);
  assert.equal(new Set(actual.map((row) => row.split('|')[1])).size, 27);
  assert.equal(new Set(actual.map((row) => row.split('|')[0])).size, 8);
  assert.deepEqual([...actual].sort(), [...expected].sort());
});
