import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const RECOVERY_STORE_SCHEMA_VERSION = 1;
export const RECOVERY_MAX_EVENTS = 512;
export const RECOVERY_MAX_PAYLOAD_HASHES = 128;

function sha256(source) {
  return crypto.createHash('sha256').update(source).digest('hex');
}

function normalizeRelativePath(root, absolutePath) {
  return path.relative(root, absolutePath).replaceAll('\\\\', '/');
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function safeTimestamp(date) {
  return date.toISOString().replaceAll(':', '-');
}

function readEvent(eventPath) {
  try {
    const parsed = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    if (
      parsed?.schemaVersion !== RECOVERY_STORE_SCHEMA_VERSION
      || typeof parsed.createdAt !== 'string'
      || !/^[a-f0-9]{64}$/u.test(parsed.incomingSha256 ?? '')
      || typeof parsed.payload !== 'string'
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function nextEventPath(eventsDir, timestamp, shortHash) {
  const base = `${safeTimestamp(timestamp)}-${shortHash}`;
  let candidate = path.join(eventsDir, `${base}.json`);
  if (!fs.existsSync(candidate)) return candidate;

  for (let sequence = 1; sequence <= 9999; sequence += 1) {
    candidate = path.join(
      eventsDir,
      `${base}-${String(sequence).padStart(4, '0')}.json`,
    );
    if (!fs.existsSync(candidate)) return candidate;
  }

  throw new Error('RECOVERY_EVENT_ID_EXHAUSTED: no se pudo reservar un evento único.');
}

function listValidEvents(eventsDir) {
  if (!fs.existsSync(eventsDir)) return [];

  return fs.readdirSync(eventsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => {
      const eventPath = path.join(eventsDir, entry.name);
      const event = readEvent(eventPath);
      return event ? { eventPath, event } : null;
    })
    .filter(Boolean)
    .sort((left, right) => {
      const byCreatedAt = right.event.createdAt.localeCompare(left.event.createdAt);
      return byCreatedAt !== 0
        ? byCreatedAt
        : path.basename(right.eventPath).localeCompare(path.basename(left.eventPath));
    });
}

export function pruneRecoveryStore({
  recoveryDir,
  maxEvents = RECOVERY_MAX_EVENTS,
  maxPayloadHashes = RECOVERY_MAX_PAYLOAD_HASHES,
} = {}) {
  if (!Number.isInteger(maxEvents) || maxEvents < 1) {
    throw new Error('RECOVERY_RETENTION_INVALID: maxEvents debe ser entero positivo.');
  }
  if (!Number.isInteger(maxPayloadHashes) || maxPayloadHashes < 1) {
    throw new Error('RECOVERY_RETENTION_INVALID: maxPayloadHashes debe ser entero positivo.');
  }

  const payloadsDir = path.join(recoveryDir, 'payloads');
  const eventsDir = path.join(recoveryDir, 'events');
  ensureDirectory(payloadsDir);
  ensureDirectory(eventsDir);

  const validEvents = listValidEvents(eventsDir);
  const retained = [];
  const removedEvents = [];
  const retainedHashes = new Set();

  for (const entry of validEvents) {
    const hash = entry.event.incomingSha256;
    const introducesNewHash = !retainedHashes.has(hash);
    const withinEventBudget = retained.length < maxEvents;
    const withinHashBudget = !introducesNewHash || retainedHashes.size < maxPayloadHashes;

    if (withinEventBudget && withinHashBudget) {
      retained.push(entry);
      retainedHashes.add(hash);
      continue;
    }

    fs.rmSync(entry.eventPath, { force: true });
    removedEvents.push(entry.eventPath);
  }

  const removedPayloads = [];
  for (const entry of fs.readdirSync(payloadsDir, { withFileTypes: true })) {
    if (!entry.isFile() || !/^[a-f0-9]{64}\.md$/u.test(entry.name)) continue;
    const hash = entry.name.slice(0, -3);
    if (retainedHashes.has(hash)) continue;

    const payloadPath = path.join(payloadsDir, entry.name);
    fs.rmSync(payloadPath, { force: true });
    removedPayloads.push(payloadPath);
  }

  return {
    retainedEvents: retained.length,
    retainedPayloadHashes: retainedHashes.size,
    removedEvents,
    removedPayloads,
  };
}

export function saveRecoveryArtifact({
  root = process.cwd(),
  recoveryDir,
  source,
  reconciliation = {},
  now = new Date(),
  maxEvents = RECOVERY_MAX_EVENTS,
  maxPayloadHashes = RECOVERY_MAX_PAYLOAD_HASHES,
} = {}) {
  if (typeof recoveryDir !== 'string' || !recoveryDir.trim()) {
    throw new Error('RECOVERY_STORE_INVALID: recoveryDir es obligatorio.');
  }
  if (typeof source !== 'string') {
    throw new Error('RECOVERY_STORE_INVALID: source debe ser texto.');
  }
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) {
    throw new Error('RECOVERY_STORE_INVALID: now debe ser una fecha válida.');
  }

  const payloadsDir = path.join(recoveryDir, 'payloads');
  const eventsDir = path.join(recoveryDir, 'events');
  ensureDirectory(payloadsDir);
  ensureDirectory(eventsDir);

  const incomingSha256 = sha256(source);
  const shortHash = incomingSha256.slice(0, 12);
  const payloadPath = path.join(payloadsDir, `${incomingSha256}.md`);

  let payloadCreated = false;
  if (fs.existsSync(payloadPath)) {
    const existing = fs.readFileSync(payloadPath, 'utf8');
    if (sha256(existing) !== incomingSha256) {
      throw new Error(
        `RECOVERY_PAYLOAD_INTEGRITY_ERROR: ${normalizeRelativePath(root, payloadPath)}`,
      );
    }
  } else {
    fs.writeFileSync(payloadPath, source, { encoding: 'utf8', flag: 'wx' });
    payloadCreated = true;
  }

  const eventPath = nextEventPath(eventsDir, now, shortHash);
  const event = {
    schemaVersion: RECOVERY_STORE_SCHEMA_VERSION,
    createdAt: now.toISOString(),
    incomingSha256,
    payload: normalizeRelativePath(root, payloadPath),
    payloadCreated,
    restoredHistoricalIds: reconciliation.changedExistingIds ?? [],
    preservedHistoricalIds: reconciliation.preservedChangedExistingIds ?? [],
    preservedNewIds: reconciliation.newIds ?? [],
    normalizedApprovalIds: reconciliation.normalizedApprovalIds ?? [],
  };

  fs.writeFileSync(
    eventPath,
    `${JSON.stringify(event, null, 2)}\n`,
    'utf8',
  );

  const retention = pruneRecoveryStore({
    recoveryDir,
    maxEvents,
    maxPayloadHashes,
  });

  return {
    incomingSha256,
    payloadPath: normalizeRelativePath(root, payloadPath),
    eventPath: normalizeRelativePath(root, eventPath),
    payloadCreated,
    retention,
  };
}
