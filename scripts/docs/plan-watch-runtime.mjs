import fs from 'node:fs';
import path from 'node:path';

function readLock(lockPath) {
  try {
    return JSON.parse(fs.readFileSync(lockPath, 'utf8'));
  } catch {
    return null;
  }
}

export function isProcessAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code === 'EPERM';
  }
}

export function acquireWatcherLock({
  lockPath,
  pid = process.pid,
  startedAt = new Date().toISOString(),
  processAlive = isProcessAlive,
}) {
  fs.mkdirSync(path.dirname(lockPath), { recursive: true });
  const lock = { pid, started_at: startedAt };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      fs.writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`, {
        encoding: 'utf8',
        flag: 'wx',
      });
      return { acquired: true, lock, reclaimed: attempt > 0 };
    } catch (error) {
      if (error?.code !== 'EEXIST') throw error;
      const existing = readLock(lockPath);
      if (existing?.pid && processAlive(existing.pid)) {
        return { acquired: false, lock: existing, reclaimed: false };
      }
      try {
        fs.rmSync(lockPath);
      } catch (removeError) {
        if (removeError?.code !== 'ENOENT') throw removeError;
      }
    }
  }
  throw new Error('no se pudo adquirir el lock del watcher después de reintentar.');
}

export function releaseWatcherLock({ lockPath, pid = process.pid }) {
  const existing = readLock(lockPath);
  if (existing?.pid !== pid) return false;
  try {
    fs.rmSync(lockPath);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

export function registerPendingChange(pendingChanges, relativePath) {
  const firstInBatch = !pendingChanges.has(relativePath);
  pendingChanges.add(relativePath);
  return firstInBatch;
}

function display(value, fallback = '—') {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value).replace(/\r?\n/gu, '<br>');
}

export function renderPlanWatchStatus({
  state,
  pid,
  startedAt,
  updatedAt = new Date().toISOString(),
  buildId = null,
  reason = null,
  result = 'PENDIENTE',
  message = null,
  pendingChanges = 0,
  preflight = null,
  implementationControl = null,
}) {
  return `# Estado local del plan canónico

> Generado automáticamente por el watcher. No es una fuente canónica ni aprueba tareas.

## QUÉ TOCA HACER AHORA

- **Acción física prioritaria:** ${display(implementationControl?.primaryAction?.type)}
- **Objetivo físico exacto:** ${display(implementationControl?.primaryAction?.target)} — ${display(implementationControl?.primaryAction?.title)}
- **Instrucción física:** ${display(implementationControl?.primaryAction?.instruction)}
- **Carril documental:** ${display(implementationControl?.documentary?.state)} — ${display(implementationControl?.documentary?.taskId)}
- **Implementación física autorizada:** ${implementationControl?.physical?.authorized?.length > 0 ? implementationControl.physical.authorized.map(({ instanceId }) => instanceId).join(', ') : 'NINGUNA'}

## INICIADORES CHATGPT POR INTENCIÓN

- **Documentación:** \`.delivery/INICIADOR_VENTO_DOCUMENTACION.txt\`
- **Documentación adelantada:** \`.delivery/INICIADOR_VENTO_DOCUMENTACION_TRABAJO_ADELANTADO.txt\` — alias sincronizado del mismo snapshot documental.
- **Implementación:** \`.delivery/INICIADOR_VENTO_IMPLEMENTACION.txt\`
- **Selector legacy:** \`INICIADOR_VENTO_ACTUAL.txt\` — no contiene el payload completo.
- **Regla:** carga únicamente el iniciador correspondiente a la intención de la conversación.

## Watcher

- **Estado:** ${display(state)}
- **PID:** ${display(pid)}
- **Iniciado:** ${display(startedAt)}
- **Actualizado:** ${display(updatedAt)}
- **Cambios pendientes:** ${display(pendingChanges, '0')}

## Continuidad observada

- **Última aprobada:** ${display(preflight?.continuity?.previous)}
- **Tarea actual:** ${display(preflight?.continuity?.current)} — ${display(preflight?.task?.title)}
- **Estado de la tarea actual:** ${display(preflight?.task?.state)}
- **Siguiente reservada:** ${display(preflight?.continuity?.next)}
- **Ruta:** ${display(preflight?.continuity?.route)}

## Última compilación

- **Compilación:** ${buildId === null ? '—' : `#${buildId}`}
- **Motivo:** ${display(reason)}
- **Resultado:** ${display(result)}
- **Detalle:** ${display(message)}
`;
}

export function writePlanWatchStatus(statusPath, status) {
  fs.mkdirSync(path.dirname(statusPath), { recursive: true });
  fs.writeFileSync(statusPath, renderPlanWatchStatus(status), 'utf8');
}
