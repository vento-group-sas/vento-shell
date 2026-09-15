import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function sha256(value) {
  const input = Buffer.isBuffer(value) ? value : Buffer.from(String(value), 'utf8');
  return crypto.createHash('sha256').update(input).digest('hex');
}

export function spawnGitUtf8(args, {
  cwd = process.cwd(),
  windowsHide,
  maxBuffer,
} = {}) {
  const options = {
    cwd,
    encoding: 'utf8',
  };

  if (windowsHide !== undefined) options.windowsHide = windowsHide;
  if (maxBuffer !== undefined) options.maxBuffer = maxBuffer;

  return spawnSync('git', args, options);
}

export function parseGitPorcelainV1Paths(source) {
  const paths = [];
  for (const rawLine of String(source ?? '').split(/\r?\n/u)) {
    if (!rawLine) continue;
    const line = rawLine.endsWith('\r') ? rawLine.slice(0, -1) : rawLine;
    if (line.length < 3) continue;
    const payload = line.slice(3);
    const candidate = payload.includes(' -> ') ? payload.split(' -> ').at(-1) : payload;
    const normalized = String(candidate ?? '')
      .replace(/^"|"$/gu, '')
      .replaceAll('\\', '/');
    if (normalized) paths.push(normalized);
  }
  return [...new Set(paths)].sort((left, right) => left.localeCompare(right, 'en'));
}

export function writePrettyJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  return filePath;
}
