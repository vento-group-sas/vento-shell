import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  pruneRecoveryStore,
  saveRecoveryArtifact,
} from './plan-recovery-store.mjs';

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-recovery-store-'));
  const recoveryDir = path.join(root, 'docs', 'plan-canonico', 'modular', '.generated', '.recovery');
  return { root, recoveryDir };
}

function cleanup(root) {
  fs.rmSync(root, { recursive: true, force: true });
}

test('deduplica payloads iguales y conserva eventos independientes', () => {
  const { root, recoveryDir } = fixture();
  try {
    const first = saveRecoveryArtifact({
      root,
      recoveryDir,
      source: 'mismo 04A\n',
      reconciliation: { changedExistingIds: ['TREQ-PROC-001'] },
      now: new Date('2026-09-08T05:00:00.000Z'),
    });
    const second = saveRecoveryArtifact({
      root,
      recoveryDir,
      source: 'mismo 04A\n',
      reconciliation: { changedExistingIds: ['TREQ-PROC-002'] },
      now: new Date('2026-09-08T05:00:01.000Z'),
    });

    assert.equal(first.payloadCreated, true);
    assert.equal(second.payloadCreated, false);
    assert.equal(first.payloadPath, second.payloadPath);

    const payloads = fs.readdirSync(path.join(recoveryDir, 'payloads'));
    const events = fs.readdirSync(path.join(recoveryDir, 'events'));
    assert.equal(payloads.length, 1);
    assert.equal(events.length, 2);
  } finally {
    cleanup(root);
  }
});

test('retiene un número acotado de eventos y hashes sin dejar payloads huérfanos', () => {
  const { root, recoveryDir } = fixture();
  try {
    for (let index = 0; index < 6; index += 1) {
      saveRecoveryArtifact({
        root,
        recoveryDir,
        source: `04A-${index}\n`,
        now: new Date(`2026-09-08T05:00:0${index}.000Z`),
        maxEvents: 4,
        maxPayloadHashes: 3,
      });
    }

    const events = fs.readdirSync(path.join(recoveryDir, 'events'));
    const payloads = fs.readdirSync(path.join(recoveryDir, 'payloads'));
    assert.equal(events.length, 3);
    assert.equal(payloads.length, 3);

    const eventHashes = new Set(
      events.map((name) => JSON.parse(
        fs.readFileSync(path.join(recoveryDir, 'events', name), 'utf8'),
      ).incomingSha256),
    );
    assert.deepEqual(
      new Set(payloads.map((name) => name.replace(/\.md$/u, ''))),
      eventHashes,
    );
  } finally {
    cleanup(root);
  }
});

test('no toca recovery legacy plano durante la poda de la nueva estructura', () => {
  const { root, recoveryDir } = fixture();
  try {
    fs.mkdirSync(recoveryDir, { recursive: true });
    const legacyPayload = path.join(
      recoveryDir,
      '2026-08-01T00-00-00.000Z-aaaaaaaaaaaa-04A-entrante.md',
    );
    const legacyEvent = path.join(
      recoveryDir,
      '2026-08-01T00-00-00.000Z-aaaaaaaaaaaa-reconciliacion.json',
    );
    fs.writeFileSync(legacyPayload, 'legacy\n', 'utf8');
    fs.writeFileSync(legacyEvent, '{}\n', 'utf8');

    pruneRecoveryStore({ recoveryDir, maxEvents: 2, maxPayloadHashes: 2 });

    assert.equal(fs.existsSync(legacyPayload), true);
    assert.equal(fs.existsSync(legacyEvent), true);
  } finally {
    cleanup(root);
  }
});

test('rechaza un payload content-addressed cuya huella no coincide con el contenido', () => {
  const { root, recoveryDir } = fixture();
  try {
    const first = saveRecoveryArtifact({
      root,
      recoveryDir,
      source: 'contenido esperado\n',
      now: new Date('2026-09-08T05:00:00.000Z'),
    });
    fs.writeFileSync(path.join(root, first.payloadPath), 'contenido corrupto\n', 'utf8');

    assert.throws(
      () => saveRecoveryArtifact({
        root,
        recoveryDir,
        source: 'contenido esperado\n',
        now: new Date('2026-09-08T05:00:01.000Z'),
      }),
      /RECOVERY_PAYLOAD_INTEGRITY_ERROR/u,
    );
  } finally {
    cleanup(root);
  }
});
