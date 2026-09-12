import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  actionResponseContract,
  buildChatgptWorkStarter,
  CHATGPT_STARTER_PATHS,
  projectAdvanceOnlyImplementationSource,
} from './chatgpt-work-starter.mjs';

test('genera dos iniciadores separados por intención y un selector legacy mínimo', () => {
  const result = buildChatgptWorkStarter();

  assert.equal(CHATGPT_STARTER_PATHS.documentation, '.delivery/INICIADOR_VENTO_DOCUMENTACION.txt');
  assert.equal(CHATGPT_STARTER_PATHS.implementation, '.delivery/INICIADOR_VENTO_IMPLEMENTACION.txt');
  assert.equal(CHATGPT_STARTER_PATHS.selector, 'INICIADOR_VENTO_ACTUAL.txt');

  assert.match(result.source, /^VENTO OS — SELECTOR DE INICIADOR POR INTENCIÓN/u);
  assert.match(result.source, /INICIADOR_VENTO_DOCUMENTACION\.txt/u);
  assert.match(result.source, /INICIADOR_VENTO_IMPLEMENTACION\.txt/u);
  assert.match(result.source, /Nunca cargues ambos/u);
  assert.doesNotMatch(result.source, /CONTENIDO CANÓNICO DE LA TAREA OBJETIVO/u);

  assert.match(result.documentationSource, /INTENT_LOCK: DOCUMENTATION/u);
  assert.match(result.documentationSource, /CONVERSATION_LANE: DOCUMENTARY/u);
  assert.match(result.documentationSource, /DO_NOT_SWITCH_LANES: TRUE/u);
  assert.match(
    result.documentationSource,
    new RegExp(`ID: ${result.control.documentary.taskId}`, 'u'),
  );
  assert.match(result.documentationSource, /CONTENIDO CANÓNICO DE LA TAREA OBJETIVO/u);
  assert.doesNotMatch(
    result.documentationSource,
    /CONTEXTO CANÓNICO INMEDIATO — TAREA ANTERIOR APROBADA/u,
  );
  assert.match(result.documentationSource, /FORMATO_ENTREGA_VENTO_V1/u);
  assert.match(result.documentationSource, /exactamente estas ocho secciones/u);
  assert.match(result.documentationSource, /NO autorices implementaciones/u);
  assert.match(result.documentationSource, /NO ejecutes implementaciones/u);
  assert.doesNotMatch(result.documentationSource, /REGISTRO ACTIVO EXACTO/u);
  assert.doesNotMatch(result.documentationSource, /HISTORIAL FÍSICO RESUMIDO/u);
  assert.doesNotMatch(result.documentationSource, /quality:repair/u);
  assert.doesNotMatch(result.documentationSource, /docs:implementation:start/u);
  assert.match(result.documentationSource, /ENTREGA DOCUMENTAL AUTOCONTENIDA OBLIGATORIA/u);
  assert.match(result.documentationSource, /FUENTES OBLIGATORIAS ANTES DE TRABAJAR UNA TAREA/u);
  assert.match(result.documentationSource, /PREENTREGA OBLIGATORIA Y POWERSHELL SEGURO/u);
  assert.match(result.documentationSource, /FORMATO DE TAREAS DOCUMENTALES/u);
  assert.match(result.documentationSource, /REGISTRO 04A/u);
  assert.match(result.documentationSource, /docs:task:quality/u);
  assert.match(result.documentationSource, /docs:delivery:check/u);
  assert.match(result.documentationSource, /docs:plan:build/u);
  assert.match(result.documentationSource, /FORMATEO CANÓNICO OBLIGATORIO ANTES DE CHECK/u);
  assert.match(result.documentationSource, /Formateo canónico obligatorio después del reemplazo:/u);
  assert.match(result.documentationSource, /Comprobación de formato, solo después del --write:/u);
  assert.match(result.documentationSource, /FORMAT_WRITE -> FORMAT_CHECK -> TASK_QUALITY -> DELIVERY_CHECK/u);
  const formatWriteIndex = result.documentationSource.indexOf('Formateo canónico obligatorio después del reemplazo:');
  const formatCheckIndex = result.documentationSource.indexOf(
    'Comprobación de formato, solo después del --write:',
    formatWriteIndex,
  );
  const qualityIndex = result.documentationSource.indexOf(
    'Calidad de tarea: npm run docs:task:quality',
    formatCheckIndex,
  );
  assert.ok(formatWriteIndex >= 0);
  assert.ok(formatCheckIndex > formatWriteIndex);
  assert.ok(qualityIndex > formatCheckIndex);
  assert.match(result.documentationSource, /docs:task:finish -- --task-id/u);
  assert.match(result.documentationSource, /NEXT_TASK_ALLOWED: SI/u);
  assert.doesNotMatch(result.documentationSource, /DOCUMENTATION_ONLY/u);

  assert.match(result.implementationSource, /INTENT_LOCK: PHYSICAL_IMPLEMENTATION/u);
  assert.match(result.implementationSource, /CONVERSATION_LANE: PHYSICAL/u);
  assert.match(result.implementationSource, /DO_NOT_SWITCH_LANES: TRUE/u);
  assert.match(result.implementationSource, /CARRIL DOCUMENTAL — SOLO ESTADO INFORMATIVO|NO EXISTE UNA INSTANCIA FÍSICA ACTIVA/u);

  if (result.control.physical.active) {
    assert.match(
      result.implementationSource,
      new RegExp(result.control.physical.active.instanceId.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&'), 'u'),
    );
    assert.match(result.implementationSource, /REGISTRO ACTIVO EXACTO/u);
    assert.match(result.implementationSource, /HISTORIAL FÍSICO RESUMIDO/u);
    assert.match(result.implementationSource, /docs:implementation:advance/u);
    assert.doesNotMatch(result.implementationSource, /docs:implementation:(?:start|preverify|finish)/u);
    assert.doesNotMatch(result.implementationSource, /npm run quality:repair/u);
    assert.match(result.implementationSource, /ENTREGA FÍSICA AUTOCONTENIDA OBLIGATORIA/u);
    assert.match(result.implementationSource, /MODO PREDETERMINADO DE IMPLEMENTACIÓN HUMANA/u);
    assert.match(result.implementationSource, /FLUJO RÁPIDO DE IMPLEMENTACIÓN FÍSICA/u);
    assert.match(result.implementationSource, /READY_TO_RESTART_WATCHER: SI/u);
    assert.match(result.implementationSource, /RESULTADO PARA CHATGPT/u);
    assert.match(result.implementationSource, /LIMPIEZA TRANSACCIONAL DE ENTRADAS DESCARGADAS/u);
    assert.match(result.implementationSource, /Remove-Item -LiteralPath sin comodines y sin -Recurse/u);
    assert.match(result.implementationSource, /DOWNLOAD_CLEANUP: PASS/u);
    assert.match(result.implementationSource, /DOWNLOAD_CLEANUP: FAIL/u);
    assert.match(result.implementationSource, /no emitas el PASS final de la operación/u);
    assert.match(result.implementationSource, /CONTINUATION_POLICY: PASS_CONTINUES_LOCALLY/u);
    assert.match(result.implementationSource, /CHAT_RETURN_POLICY: FAIL_OR_UNRESOLVED_ONLY/u);
    assert.match(result.implementationSource, /FULL_DETERMINISTIC_RUNBOOK_REQUIRED: TRUE/u);
    assert.match(result.implementationSource, /MESSAGE_DELIVERY_CONTRACT: INLINE_VISIBLE_STEPS_ONLY/u);
    assert.match(result.implementationSource, /MESSAGE_MEANS_ASSISTANT_REPLY_BODY: TRUE/u);
    assert.match(result.implementationSource, /RUNBOOK_TERM_MEANS_VISIBLE_MESSAGE_PROCEDURE: TRUE/u);
    assert.match(result.implementationSource, /PROCEDURE_MUST_SURVIVE_ATTACHMENT_REMOVAL: TRUE/u);
    assert.match(result.implementationSource, /FILE_IS_NOT_MESSAGE: TRUE/u);
    assert.match(result.implementationSource, /DOWNLOAD_IS_SUPPLEMENT_ONLY: TRUE/u);
    assert.match(result.implementationSource, /RUNBOOK_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE/u);
    assert.match(result.implementationSource, /PATCH_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE/u);
    assert.match(result.implementationSource, /ORCHESTRATOR_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE/u);
    assert.match(result.implementationSource, /Un MENSAJE significa exclusivamente el cuerpo visible/u);
    assert.match(result.implementationSource, /La palabra RUNBOOK en este iniciador significa exclusivamente la secuencia de PASOS visible/u);
    assert.match(result.implementationSource, /todos los PASO 1\.\.N deterministas aparezcan literalmente escritos y numerados/u);
    assert.match(result.implementationSource, /Nunca puede contener la unica copia de las instrucciones operativas/u);
    assert.match(result.implementationSource, /patch puede ser el mecanismo de materializacion de codigo, pero no reemplaza el mensaje/u);
    assert.match(result.implementationSource, /INVALID_DELIVERY_EXAMPLE/u);
    assert.match(result.implementationSource, /VALID_DELIVERY_EXAMPLE/u);
    assert.match(result.implementationSource, /AUTO_VERIFICATION_BEFORE_SEND/u);
    assert.match(result.implementationSource, /REGLA CRITICA DE CONTINUIDAD CONVERSACIONAL/u);
    assert.match(result.implementationSource, /La mera existencia futura de una comprobacion PASS\/FAIL NO constituye un gate conversacional/u);
    assert.match(result.implementationSource, /Si un GATE LOCAL produce PASS, el usuario continua inmediatamente/u);
    assert.match(result.implementationSource, /Si un GATE LOCAL produce FAIL, el usuario detiene solamente la secuencia local/u);
    assert.doesNotMatch(result.implementationSource, /FORMATO DE TAREAS DOCUMENTALES/u);
    assert.doesNotMatch(result.implementationSource, /La fuente física canónica actual del registro/u);
    assert.doesNotMatch(result.implementationSource, /docs:task:quality/u);
    assert.doesNotMatch(result.implementationSource, /docs:delivery:check/u);
    assert.doesNotMatch(result.implementationSource, /DOCUMENTATION_ONLY/u);
  } else {
    assert.match(result.implementationSource, /NO EXISTE UNA INSTANCIA FÍSICA ACTIVA/u);
    assert.doesNotMatch(result.implementationSource, /REGISTRO ACTIVO EXACTO/u);
  }
});

test('el iniciador documental no incrusta el bloque completo de la tarea anterior', () => {
  const source = fs.readFileSync('scripts/docs/chatgpt-work-starter.mjs', 'utf8');

  assert.doesNotMatch(source, /previous\.block\.trim\(\)/u);
  assert.doesNotMatch(source, /CONTEXTO CANÓNICO INMEDIATO — TAREA ANTERIOR APROBADA/u);
  assert.doesNotMatch(source, /sourceContext\(task, workTopology, emptyDraft\)/u);
  assert.match(source, /sourceContext\(task\)/u);
});

test('la plantilla compartida contiene solo reglas comunes y una ranura', () => {
  const template = fs.readFileSync(
    'docs/plan-canonico/modular/chatgpt-work-starter-template.txt',
    'utf8',
  );

  assert.equal(template.split('{{CURRENT_WORK}}').length, 2);
  assert.match(template, /SELECCIÓN DE CARRIL/u);
  assert.match(template, /INTENT_LOCK/u);
  assert.match(template, /Nunca combines ambos payloads/u);
  assert.match(template, /FORMATO_ENTREGA_VENTO_V1/u);
  assert.match(template, /FUENTES OBLIGATORIAS ANTES DE TRABAJAR UNA TAREA/u);
  assert.match(template, /PREENTREGA OBLIGATORIA Y POWERSHELL SEGURO/u);
  assert.match(template, /LECTURA DE ARCHIVOS GRANDES Y RESPUESTAS TRUNCADAS/u);
  assert.match(template, /REGLA DE SALIDA COMPACTA DE BATERÍAS Y COMPROBACIONES/u);
  assert.match(template, /Su contrato incluye regenerar los iniciadores locales documental, físico y de correcciones/u);
  assert.match(template, /REGLA DE SEGURIDAD DE TERMINAL INTERACTIVA/u);
  assert.match(template, /REGLA DE SALIDA ASCII SEGURA EN TERMINAL/u);
  assert.doesNotMatch(template, /FLUJO RÁPIDO DE IMPLEMENTACIÓN FÍSICA/u);
  assert.doesNotMatch(template, /docs:implementation:start/u);
  assert.doesNotMatch(template, /docs:implementation:finish/u);

  // Compatibilidad con el lifecycle documental histórico:
  // la plantilla compartida conserva únicamente la regla de apertura/cierre
  // documental exigida por task-branch-lifecycle, sin incorporar payload físico.
  assert.match(template, /REGLA OBLIGATORIA DE RAMA POR TAREA Y CIERRE EN MAIN/u);
  assert.match(template, /docs:task:start/u);
  assert.match(template, /docs:task:finish/u);
  assert.match(template, /NEXT_TASK_ALLOWED: SI/u);
});

test('el contrato físico conserva lifecycle, reparación y autorización explícita', () => {
  const source = actionResponseContract({
    primaryAction: {
      type: 'AUTORIZAR_IMPLEMENTACION',
      target: 'SHELL-CI-001::GLOBAL',
    },
    physical: {
      active: {
        instanceId: 'SHELL-CI-001::GLOBAL',
        status: 'PENDING_AUTHORIZATION',
        recordPath: 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-001__GLOBAL.json',
      },
    },
  }, 'a'.repeat(64));

  assert.match(source, /FORMATO_ENTREGA_VENTO_V1/u);
  assert.match(source, /usuario humano/u);
  assert.match(source, /AUTORIZO EJECUCION ASISTIDA DEL PASO N/u);
  assert.match(source, /CONTINUATION_POLICY: PASS_CONTINUES_LOCALLY/u);
  assert.match(source, /CHAT_RETURN_POLICY: FAIL_OR_UNRESOLVED_ONLY/u);
  assert.match(source, /FULL_DETERMINISTIC_RUNBOOK_REQUIRED: TRUE/u);
  assert.match(source, /MESSAGE_DELIVERY_CONTRACT: INLINE_VISIBLE_STEPS_ONLY/u);
  assert.match(source, /MESSAGE_MEANS_ASSISTANT_REPLY_BODY: TRUE/u);
  assert.match(source, /RUNBOOK_TERM_MEANS_VISIBLE_MESSAGE_PROCEDURE: TRUE/u);
  assert.match(source, /PROCEDURE_MUST_SURVIVE_ATTACHMENT_REMOVAL: TRUE/u);
  assert.match(source, /FILE_IS_NOT_MESSAGE: TRUE/u);
  assert.match(source, /DOWNLOAD_IS_SUPPLEMENT_ONLY: TRUE/u);
  assert.match(source, /RUNBOOK_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE/u);
  assert.match(source, /PATCH_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE/u);
  assert.match(source, /ORCHESTRATOR_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE/u);
  assert.match(source, /Un MENSAJE significa exclusivamente el cuerpo visible/u);
  assert.match(source, /La palabra RUNBOOK en este iniciador significa exclusivamente la secuencia de PASOS visible/u);
  assert.match(source, /todos los PASO 1\.\.N deterministas aparezcan literalmente escritos y numerados/u);
  assert.match(source, /Nunca puede contener la unica copia de las instrucciones operativas/u);
  assert.match(source, /patch puede ser el mecanismo de materializacion de codigo, pero no reemplaza el mensaje/u);
  assert.match(source, /INVALID_DELIVERY_EXAMPLE/u);
  assert.match(source, /VALID_DELIVERY_EXAMPLE/u);
  assert.match(source, /AUTO_VERIFICATION_BEFORE_SEND/u);
  assert.match(source, /GATE LOCAL PASS\/FAIL no constituye un gate conversacional/u);
  assert.match(source, /GATE LOCAL produce PASS, continúa inmediatamente/u);
  assert.match(source, /GATE LOCAL produce FAIL, detén únicamente la secuencia local/u);
  assert.match(source, /docs:implementation:advance -- --instance-id SHELL-CI-001::GLOBAL/u);
  assert.doesNotMatch(source, /docs:implementation:(?:start|preverify|finish)/u);
  assert.doesNotMatch(source, /npm run quality:repair/u);
  assert.match(source, /READY_FOR_VALIDATION: SI/u);
  assert.match(source, /validation_commands/u);
  assert.match(source, /status AUTHORIZED/u);
  assert.match(source, /source_contract_sha256/u);
  assert.match(source, new RegExp('a{64}', 'u'));
  assert.match(source, /evidence permanece \[\]/u);
});

test('la limpieza de Descargas es post-PASS, exacta y fail-closed', () => {
  const source = fs.readFileSync('scripts/docs/chatgpt-work-starter.mjs', 'utf8');

  assert.match(source, /LIMPIEZA TRANSACCIONAL DE ENTRADAS DESCARGADAS/u);
  assert.match(source, /todos los consumidores previstos terminaron de usarla/u);
  assert.match(source, /todas las comprobaciones que pertenecen a la operación consumidora produjeron PASS/u);
  assert.match(source, /Remove-Item -LiteralPath sin comodines y sin -Recurse/u);
  assert.match(source, /rechaza cualquier ruta que no resuelva dentro de la carpeta real de Descargas/u);
  assert.match(source, /DOWNLOAD_CLEANUP: PASS/u);
  assert.match(source, /DOWNLOAD_CLEANUP: FAIL/u);
  assert.match(source, /Nunca limpies Descargas de forma general/u);
});

// CORR-013 STARTER MULTI ACTIVE
test('el iniciador fisico expone governed active set sin convertir el puntero en exclusividad global', () => {
  const source = fs.readFileSync('scripts/docs/chatgpt-work-starter.mjs', 'utf8');
  assert.match(source, /Conjunto físico gobernado/u);
  assert.match(source, /puntero determinista de compatibilidad/u);
  assert.match(source, /otras instancias físicas independientes en curso/u);
});

// C6_STARTER_ADVANCE_ONLY_PROJECTION
test('proyección física suprime entrypoints directos y repair manual', () => {
  const projected = projectAdvanceOnlyImplementationSource(`
npm run docs:implementation:start -- --instance-id SHELL-CI-001::GLOBAL
npm run docs:implementation:preverify -- --instance-id SHELL-CI-001::GLOBAL
npm run quality:repair
npm run docs:implementation:finish -- --instance-id SHELL-CI-001::GLOBAL
`);
  assert.match(projected, /ADVANCE_ONLY_OPERATIONAL_PROJECTION_V1/u);
  assert.match(projected, /docs:implementation:advance -- --instance-id SHELL-CI-001::GLOBAL/u);
  assert.doesNotMatch(projected, /docs:implementation:(?:start|preverify|finish)/u);
  assert.doesNotMatch(projected, /npm run quality:repair/u);
});

// C6_STARTER_INTEGRITY_RECOVERY_PROTOCOL_TEST
test('recovery de integridad conserva protocolo físico y suprime comandos mutantes', () => {
  const source = actionResponseContract({
    primaryAction: {
      type: 'RECONCILE_IMPLEMENTATION_STATE_INTEGRITY',
      target: 'SHELL-CI-001::GLOBAL',
    },
    physical: {
      active: {
        instanceId: 'SHELL-CI-001::GLOBAL',
        status: 'IN_PROGRESS',
        declaredStatus: 'VERIFIED',
        effectiveStatus: 'IN_PROGRESS',
        stateIntegrityRecoveryRequired: true,
        recoveryAction: 'RECONCILE_DECLARED_STATUS_TO_IN_PROGRESS',
        stateIntegrity: { status_valid: false },
        record: { status: 'VERIFIED' },
        recordPath: 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-001__GLOBAL.json',
      },
    },
  }, 'a'.repeat(64));

  assert.match(source, /STATE_INTEGRITY_RECOVERY_REQUIRED: TRUE/u);
  assert.match(source, /MESSAGE_DELIVERY_CONTRACT: INLINE_VISIBLE_STEPS_ONLY/u);
  assert.match(source, /Un MENSAJE significa exclusivamente el cuerpo visible/u);
  assert.match(source, /MUTATION_SUPPRESSED_UNTIL_STATE_INTEGRITY_RECONCILED/u);
  assert.doesNotMatch(source, /npm run docs:implementation:advance/u);
  assert.doesNotMatch(source, /docs:implementation:(?:start|preverify|finish)/u);

  const projectedRecovery = projectAdvanceOnlyImplementationSource([
    'STATE_INTEGRITY_RECOVERY_REQUIRED: TRUE',
    'npm run docs:implementation:start -- --instance-id SHELL-CI-001::GLOBAL',
    'npm run docs:implementation:finish -- --instance-id SHELL-CI-001::GLOBAL',
  ].join('\n'));
  assert.match(projectedRecovery, /MUTATION_SUPPRESSED_UNTIL_STATE_INTEGRITY_RECONCILED/u);
  assert.doesNotMatch(projectedRecovery, /npm run docs:implementation:advance/u);
});
