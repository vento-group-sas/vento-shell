import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import { buildCorrectionStarter } from './correction-starter.mjs';

test('iniciador de correcciones conserva un carril exclusivo', () => {
    const source = buildCorrectionStarter();
    assert.match(source, /^VENTO OS — INICIADOR CANÓNICO DE CORRECCIONES/u);
    assert.match(source, /INTENT_LOCK: CORRECTION/u);
    assert.match(source, /CONVERSATION_LANE: CORRECTION/u);
    assert.match(source, /DO_NOT_SWITCH_LANES: TRUE/u);
    assert.match(source, /VENTO_CANONICAL_CORRECTION_LIFECYCLE_V1|CORRECCIÓN/u);
});

test('iniciador documenta forward migrations y VERIFIED_ON_MAIN', () => {
    const source = fs.readFileSync('scripts/docs/correction-starter.mjs', 'utf8');
    assert.match(source, /forward migration/u);
    assert.match(source, /VERIFIED_ON_MAIN/u);
    assert.match(source, /STALE_TARGET/u);
    assert.match(source, /docs:correction:start/u);
    assert.match(source, /docs:correction:finish/u);
});

test('iniciador obliga autorización y checkpoint nativos', () => {
    const source = fs.readFileSync('scripts/docs/correction-starter.mjs', 'utf8');
    assert.match(source, /docs:correction:authorize/u);
    assert.match(source, /docs:correction:checkpoint/u);
    assert.match(source, /Está prohibido editar directamente el JSON del ledger/u);
    assert.match(source, /WORKTREE CLEAN/u);
    assert.match(source, /rama remota sincronizada 0\/0/u);
});

test('iniciador documenta deploy Supabase resumible y drift sobre candidato limpio', () => {
    const source = fs.readFileSync('scripts/docs/correction-starter.mjs', 'utf8');
    assert.match(source, /docs:correction:supabase:deploy/u);
    assert.match(source, /ALREADY_APPLIED/u);
    assert.match(source, /no repetir db push/u);
    assert.match(source, /environment-drift conserva fail-closed/u);
    assert.match(source, /candidato limpio/u);
    assert.match(source, /rechazar PRODUCTION/u);
});

test('iniciador mantiene quality repair exactamente antes de IMPLEMENTED', () => {
    const source = fs.readFileSync('scripts/docs/correction-starter.mjs', 'utf8');
    assert.match(source, /Antes de IMPLEMENTED: ejecutar exactamente una vez npm run quality:repair/u);
});

test('check tolera ausencia de la proyección no versionada en CI', () => {
    const source = fs.readFileSync('scripts/docs/correction-starter.mjs', 'utf8');
    assert.match(source, /check && changed && fs\.existsSync\(outputPath\)/u);
});

test('docs:plan:build sincroniza el iniciador de correcciones antes del check global', () => {
    const source = fs.readFileSync('scripts/docs/build-plan-canonico.mjs', 'utf8');
    assert.match(source, /import\('\.\/correction-starter\.mjs'\)/u);
    assert.match(source, /writeCorrectionStarter\(\{ root \}\)/u);
});

test('iniciador usa advance como entrada state-aware de continuidad', () => {
    const source = fs.readFileSync('scripts/docs/correction-starter.mjs', 'utf8');
    assert.match(source, /docs:correction:advance/u);
    assert.match(source, /entrada normal para continuar una corrección activa/u);
    assert.match(source, /state-aware/u);
    assert.match(source, /quality:repair exactamente una vez/u);
    assert.match(source, /sella VERIFIED solo con PASS completo/u);
});
