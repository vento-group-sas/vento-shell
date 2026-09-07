import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { checkManifest } from './migration-manifest.mjs';
import { resolveNpmInvocation, runHarness } from '../quality/supabase-db-harness.mjs';

const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';
const MANAGEMENT_BASE_URL = 'https://api.supabase.com';
const CONFIG_RELATIVE = 'supabase/config.toml';
const MANIFEST_RELATIVE = 'supabase/MIGRATION_MANIFEST.md';
const FUNCTIONS_RELATIVE = 'supabase/functions';
const READINESS_CONTRACT_RELATIVE = 'scripts/docs/package-readiness/package-readiness-contract.json';
const OUTPUT_PREFIX = '.delivery/';
const PROCESS_OUTPUT_MAX_BYTES = 32 * 1024 * 1024;
const ALLOWED_REMOTE_ROLES = new Set(['staging', 'production']);
const ALLOWED_REMOTE_SCOPES = new Set(['full', 'environment', 'history']);
const ALLOWLIST_CLASSIFICATIONS = new Set(['EXPECTED_OVERLAY', 'TEMPORARY_EXCEPTION']);
const DEFAULT_SUPABASE_SECRET_NAMES = new Set([
  'SUPABASE_URL',
  'SUPABASE_DB_URL',
  'SUPABASE_PUBLISHABLE_KEYS',
  'SUPABASE_SECRET_KEYS',
  'SUPABASE_JWKS',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
]);
const MANAGED_SCHEMAS = new Set([
  '_realtime',
  'auth',
  'extensions',
  'graphql',
  'graphql_public',
  'information_schema',
  'net',
  'pg_catalog',
  'pgbouncer',
  'realtime',
  'storage',
  'supabase_functions',
  'supabase_migrations',
  'vault',
  'cron',
  'vital',
]);

const FINGERPRINT_SQL = String.raw`
with governed_schemas as (
  select n.oid, n.nspname
  from pg_catalog.pg_namespace as n
  where n.nspname !~ '^pg_'
    and n.nspname not in (
      '_realtime', 'auth', 'extensions', 'graphql', 'graphql_public', 'information_schema',
      'net', 'pgbouncer', 'realtime', 'storage', 'supabase_functions', 'supabase_migrations',
      'vault', 'cron', 'vital'
    )
),
relations as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'name', c.relname,
    'kind', c.relkind,
    'rls', c.relrowsecurity,
    'force_rls', c.relforcerowsecurity
  ) order by n.nspname, c.relname, c.relkind), '[]'::jsonb) as value
  from pg_catalog.pg_class as c
  join governed_schemas as n on n.oid = c.relnamespace
  where c.relkind in ('r', 'p', 'v', 'm', 'S', 'f')
),
views as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'name', c.relname,
    'definition', pg_catalog.pg_get_viewdef(c.oid, true)
  ) order by n.nspname, c.relname), '[]'::jsonb) as value
  from pg_catalog.pg_class as c
  join governed_schemas as n on n.oid = c.relnamespace
  where c.relkind in ('v', 'm')
),
columns as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'relation', c.relname,
    'position', a.attnum,
    'name', a.attname,
    'type', pg_catalog.format_type(a.atttypid, a.atttypmod),
    'not_null', a.attnotnull,
    'default', pg_catalog.pg_get_expr(ad.adbin, ad.adrelid)
  ) order by n.nspname, c.relname, a.attnum), '[]'::jsonb) as value
  from pg_catalog.pg_attribute as a
  join pg_catalog.pg_class as c on c.oid = a.attrelid
  join governed_schemas as n on n.oid = c.relnamespace
  left join pg_catalog.pg_attrdef as ad on ad.adrelid = a.attrelid and ad.adnum = a.attnum
  where a.attnum > 0 and not a.attisdropped and c.relkind in ('r', 'p', 'v', 'm', 'f')
),
constraints as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'relation', c.relname,
    'name', con.conname,
    'type', con.contype,
    'definition', pg_catalog.pg_get_constraintdef(con.oid, true)
  ) order by n.nspname, c.relname, con.conname), '[]'::jsonb) as value
  from pg_catalog.pg_constraint as con
  join pg_catalog.pg_class as c on c.oid = con.conrelid
  join governed_schemas as n on n.oid = c.relnamespace
),
indexes as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'relation', c.relname,
    'name', i.relname,
    'definition', pg_catalog.pg_get_indexdef(i.oid)
  ) order by n.nspname, c.relname, i.relname), '[]'::jsonb) as value
  from pg_catalog.pg_index as x
  join pg_catalog.pg_class as c on c.oid = x.indrelid
  join governed_schemas as n on n.oid = c.relnamespace
  join pg_catalog.pg_class as i on i.oid = x.indexrelid
),
functions as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'name', p.proname,
    'identity_args', pg_catalog.pg_get_function_identity_arguments(p.oid),
    'result', pg_catalog.pg_get_function_result(p.oid),
    'volatility', p.provolatile,
    'security_definer', p.prosecdef,
    'config', coalesce(to_jsonb(p.proconfig), '[]'::jsonb),
    'definition', pg_catalog.pg_get_functiondef(p.oid)
  ) order by n.nspname, p.proname, pg_catalog.pg_get_function_identity_arguments(p.oid)), '[]'::jsonb) as value
  from pg_catalog.pg_proc as p
  join governed_schemas as n on n.oid = p.pronamespace
),
triggers as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'relation', c.relname,
    'name', t.tgname,
    'definition', pg_catalog.pg_get_triggerdef(t.oid, true)
  ) order by n.nspname, c.relname, t.tgname), '[]'::jsonb) as value
  from pg_catalog.pg_trigger as t
  join pg_catalog.pg_class as c on c.oid = t.tgrelid
  join governed_schemas as n on n.oid = c.relnamespace
  where not t.tgisinternal
),
policies as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', p.schemaname,
    'relation', p.tablename,
    'name', p.policyname,
    'permissive', p.permissive,
    'roles', p.roles,
    'command', p.cmd,
    'using', p.qual,
    'with_check', p.with_check
  ) order by p.schemaname, p.tablename, p.policyname), '[]'::jsonb) as value
  from pg_catalog.pg_policies as p
  where (
    p.schemaname = 'storage'
    or p.schemaname in (select nspname from governed_schemas)
  )
),
table_grants as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'relation', c.relname,
    'grantor', pg_catalog.pg_get_userbyid(a.grantor),
    'grantee', case
      when a.grantee = 0 then 'PUBLIC'
      else pg_catalog.pg_get_userbyid(a.grantee)
    end,
    'privilege', a.privilege_type,
    'grantable', a.is_grantable
  ) order by
    n.nspname,
    c.relname,
    case when a.grantee = 0 then 'PUBLIC' else pg_catalog.pg_get_userbyid(a.grantee) end,
    a.privilege_type,
    pg_catalog.pg_get_userbyid(a.grantor)
  ), '[]'::jsonb) as value
  from pg_catalog.pg_class as c
  join governed_schemas as n on n.oid = c.relnamespace
  cross join lateral pg_catalog.aclexplode(c.relacl) as a
  where c.relkind in ('r', 'p', 'v', 'm', 'f')
    and (
      case when a.grantee = 0 then 'PUBLIC' else pg_catalog.pg_get_userbyid(a.grantee) end
    ) in ('anon', 'authenticated', 'service_role')
),
routine_grants as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'routine', p.proname,
    'identity_args', pg_catalog.pg_get_function_identity_arguments(p.oid),
    'grantor', pg_catalog.pg_get_userbyid(a.grantor),
    'grantee', case
      when a.grantee = 0 then 'PUBLIC'
      else pg_catalog.pg_get_userbyid(a.grantee)
    end,
    'privilege', a.privilege_type,
    'grantable', a.is_grantable
  ) order by
    n.nspname,
    p.proname,
    pg_catalog.pg_get_function_identity_arguments(p.oid),
    case when a.grantee = 0 then 'PUBLIC' else pg_catalog.pg_get_userbyid(a.grantee) end,
    a.privilege_type,
    pg_catalog.pg_get_userbyid(a.grantor)
  ), '[]'::jsonb) as value
  from pg_catalog.pg_proc as p
  join governed_schemas as n on n.oid = p.pronamespace
  cross join lateral pg_catalog.aclexplode(
    coalesce(p.proacl, pg_catalog.acldefault('f'::"char", p.proowner))
  ) as a
  where p.prokind in ('f', 'p')
    and (
      case when a.grantee = 0 then 'PUBLIC' else pg_catalog.pg_get_userbyid(a.grantee) end
    ) in ('anon', 'authenticated', 'service_role', 'PUBLIC')
),
publications as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'publication', p.pubname,
    'schema', pt.schemaname,
    'relation', pt.tablename
  ) order by p.pubname, pt.schemaname, pt.tablename), '[]'::jsonb) as value
  from pg_catalog.pg_publication as p
  left join pg_catalog.pg_publication_tables as pt on pt.pubname = p.pubname
),
types as (
  select coalesce(jsonb_agg(jsonb_build_object(
    'schema', n.nspname,
    'name', t.typname,
    'kind', t.typtype,
    'category', t.typcategory,
    'enum_labels', coalesce((
      select jsonb_agg(e.enumlabel order by e.enumsortorder)
      from pg_catalog.pg_enum as e
      where e.enumtypid = t.oid
    ), '[]'::jsonb)
  ) order by n.nspname, t.typname), '[]'::jsonb) as value
  from pg_catalog.pg_type as t
  join governed_schemas as n on n.oid = t.typnamespace
  where t.typtype in ('e', 'd')
)
select jsonb_build_object(
  'governed_schemas', coalesce((select jsonb_agg(nspname order by nspname) from governed_schemas), '[]'::jsonb),
  'relations', (select value from relations),
  'views', (select value from views),
  'columns', (select value from columns),
  'constraints', (select value from constraints),
  'indexes', (select value from indexes),
  'functions', (select value from functions),
  'triggers', (select value from triggers),
  'policies', (select value from policies),
  'table_grants', (select value from table_grants),
  'routine_grants', (select value from routine_grants),
  'publications', (select value from publications),
  'types', (select value from types),
  'vital_boundary', jsonb_build_object(
    'schema_present', exists(select 1 from pg_catalog.pg_namespace where nspname = 'vital'),
    'included_in_governed_schemas', false
  )
)::text as fingerprint;
`;

const EXTENSION_CAPABILITIES_SQL = String.raw`
select coalesce(jsonb_agg(jsonb_build_object(
  'name', e.extname
) order by e.extname), '[]'::jsonb)::text as extension_capabilities
from pg_catalog.pg_extension as e;
`;

const STORAGE_BUCKETS_SQL = String.raw`
select coalesce(jsonb_agg(jsonb_build_object(
  'id', b.id,
  'public', b.public,
  'file_size_limit', b.file_size_limit,
  'allowed_mime_types', b.allowed_mime_types
) order by b.id), '[]'::jsonb)::text as storage_buckets
from storage.buckets as b;
`;

const CRON_JOBS_SQL = String.raw`
select coalesce(jsonb_agg(jsonb_build_object(
  'jobname', j.jobname,
  'schedule', j.schedule,
  'database', j.database,
  'username', j.username,
  'active', j.active,
  'command_sha256', encode(extensions.digest(convert_to(j.command, 'UTF8'), 'sha256'), 'hex')
) order by j.jobname, j.schedule, j.database, j.username), '[]'::jsonb)::text as cron_jobs
from cron.job as j;
`;

const INTERNAL_JOB_SECRET_KEYS_SQL = String.raw`
select coalesce(jsonb_agg(s.key order by s.key), '[]'::jsonb)::text as internal_job_secret_keys
from public.internal_job_secrets as s
where length(btrim(coalesce(s.secret_value, ''))) > 0;
`;

function fail(code, detail = '') {
  const error = new Error(detail ? `${code}:${detail}` : code);
  error.exitCode = 1;
  throw error;
}

function repoRootFromModule() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
}

function normalizeRepoPath(value) {
  return String(value ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
}

function canonicalBytes(value) {
  const input = Buffer.isBuffer(value) ? value : Buffer.from(String(value ?? ''), 'utf8');
  const normalized = input
    .toString('utf8')
    .replace(/^\uFEFF/u, '')
    .replaceAll('\r\n', '\n');
  return Buffer.from(normalized, 'utf8');
}

export function sha256(value) {
  return crypto.createHash('sha256').update(canonicalBytes(value)).digest('hex');
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map((entry) => stableValue(entry));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value).sort((left, right) => left.localeCompare(right, 'en'))
        .map((key) => [key, stableValue(value[key])]),
    );
  }
  return value;
}

export function stableStringify(value) {
  return JSON.stringify(stableValue(value));
}

function safeAscii(value) {
  return String(value ?? '')
    .replace(/postgres(?:ql)?:\/\/[^\s]+/giu, '[REDACTED_DB_URL]')
    .replace(/\b(?:eyJ|sb_[A-Za-z0-9_])[A-Za-z0-9._-]{20,}\b/gu, '[REDACTED_TOKEN]')
    .replace(/[^\x20-\x7E\r\n]/gu, '?');
}

function run(command, args, { cwd, allowFailure = false, env = process.env } = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    env,
    maxBuffer: PROCESS_OUTPUT_MAX_BYTES,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.error) {
    if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
    fail('PROCESS_START_FAILED', path.basename(command));
  }
  const status = Number.isInteger(result.status) ? result.status : 1;
  const output = {
    status,
    stdout: String(result.stdout ?? '').trimEnd(),
    stderr: String(result.stderr ?? '').trimEnd(),
  };
  if (status !== 0 && !allowFailure) {
    fail('PROCESS_FAILED', `${path.basename(command)}:exit=${status}`);
  }
  return output;
}

function git(root, args, options = {}) {
  return run('git', args, { cwd: root, ...options });
}

function stripTomlComment(line) {
  let quoted = false;
  let escaped = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === '\\' && quoted) {
      escaped = true;
      continue;
    }
    if (char === '"') quoted = !quoted;
    if (char === '#' && !quoted) return line.slice(0, index);
  }
  return line;
}

function parseTomlScalar(source) {
  const value = String(source ?? '').trim();
  if (/^(?:true|false)$/u.test(value)) return value === 'true';
  if (/^-?\d+(?:\.\d+)?$/u.test(value)) return Number(value);
  if (value.startsWith('"') && value.endsWith('"')) return JSON.parse(value);
  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

export function parseToml(source) {
  const sections = { '': {} };
  let current = '';
  for (const rawLine of String(source ?? '').replaceAll('\r\n', '\n').split('\n')) {
    const line = stripTomlComment(rawLine).trim();
    if (!line) continue;
    const section = /^\[([^\]]+)\]$/u.exec(line);
    if (section) {
      current = section[1].trim();
      sections[current] ??= {};
      continue;
    }
    const assignment = /^([A-Za-z0-9_.-]+)\s*=\s*(.+)$/u.exec(line);
    if (!assignment) continue;
    sections[current][assignment[1]] = parseTomlScalar(assignment[2]);
  }
  return sections;
}

function parseByteSize(value) {
  if (Number.isFinite(value)) return Number(value);
  const match = /^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB|KiB|MiB|GiB)$/iu.exec(String(value ?? '').trim());
  if (!match) return null;
  const amount = Number(match[1]);
  const unit = match[2].toUpperCase();
  const multipliers = {
    B: 1,
    KB: 1000,
    MB: 1000 ** 2,
    GB: 1000 ** 3,
    KIB: 1024,
    MIB: 1024 ** 2,
    GIB: 1024 ** 3,
  };
  return Math.round(amount * multipliers[unit]);
}

const FUNCTION_SOURCE_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.mts',
  '.cts',
  '.json',
  '.jsonc',
]);

function listFilesRecursive(directory, prefix = '') {
  const entries = fs.readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name, 'en'));
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.DS_Store' || entry.name === 'node_modules') continue;
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listFilesRecursive(absolute, relative));
    else if (entry.isFile()) files.push(relative);
  }
  return files;
}

function npmrcHasEffectiveConfiguration(source) {
  return canonicalBytes(source)
    .toString('utf8')
    .split('\n')
    .some((line) => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#') && !trimmed.startsWith(';');
    });
}

function denoJsonHasEffectiveConfiguration(source) {
  const text = canonicalBytes(source).toString('utf8').trim();
  if (!text) return false;
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return true;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return true;
  const keys = Object.keys(parsed);
  if (keys.length === 0) return false;
  if (
    keys.length === 1
    && keys[0] === 'imports'
    && parsed.imports
    && typeof parsed.imports === 'object'
    && !Array.isArray(parsed.imports)
    && Object.keys(parsed.imports).length === 0
  ) {
    return false;
  }
  return true;
}

function functionSourcePaths(directory, configSection, slug) {
  if (
    Object.prototype.hasOwnProperty.call(configSection, 'static_files')
    && (
      !Array.isArray(configSection.static_files)
      || configSection.static_files.length > 0
    )
  ) {
    fail('EDGE_FUNCTION_STATIC_FILES_PARITY_UNSUPPORTED', slug);
  }

  const npmrcPath = path.join(directory, '.npmrc');

  if (
    fs.existsSync(npmrcPath)
    && npmrcHasEffectiveConfiguration(fs.readFileSync(npmrcPath))
  ) {
    fail('EDGE_FUNCTION_NPMRC_PARITY_UNSUPPORTED', slug);
  }

  return listFilesRecursive(directory)
    .filter((relative) => {
      const normalized = normalizeRepoPath(relative);
      const basename = path.posix.basename(normalized);

      if (basename === '.npmrc') return false;
      if (basename === 'deno.json') {
        const absolute = path.join(directory, ...normalized.split('/'));
        if (!denoJsonHasEffectiveConfiguration(fs.readFileSync(absolute))) return false;
      }
      if (basename === 'deno.lock') return true;

      return FUNCTION_SOURCE_EXTENSIONS.has(
        path.posix.extname(normalized).toLowerCase(),
      );
    })
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function referencedSecretNames(source) {
  const names = new Set();
  const patterns = [
    /Deno\.env\.get\(\s*['"]([A-Z][A-Z0-9_]*)['"]\s*\)/gu,
    /process\.env\.([A-Z][A-Z0-9_]*)\b/gu,
  ];
  for (const pattern of patterns) {
    for (const match of String(source ?? '').matchAll(pattern)) {
      if (!DEFAULT_SUPABASE_SECRET_NAMES.has(match[1])) names.add(match[1]);
    }
  }
  return names;
}

export function inventoryEdgeFunctions({ root = repoRootFromModule(), configSections = null } = {}) {
  const functionsRoot = path.join(root, ...FUNCTIONS_RELATIVE.split('/'));
  if (!fs.existsSync(functionsRoot) || !fs.statSync(functionsRoot).isDirectory()) return [];
  const config = configSections ?? parseToml(fs.readFileSync(path.join(root, ...CONFIG_RELATIVE.split('/')), 'utf8'));
  const entries = fs.readdirSync(functionsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name, 'en'));

  return entries.map((entry) => {
    const slug = entry.name;
    const directory = path.join(functionsRoot, slug);
    const functionConfig = config[`functions.${slug}`] ?? {};
    const files = functionSourcePaths(directory, functionConfig, slug).map((relative) => {
      const content = canonicalBytes(fs.readFileSync(path.join(directory, ...relative.split('/'))));
      return {
        path: normalizeRepoPath(relative),
        sha256: crypto.createHash('sha256').update(content).digest('hex'),
        bytes: content.byteLength,
      };
    });
    const secrets = new Set();
    for (const file of files) {
      const source = fs.readFileSync(path.join(directory, ...file.path.split('/')), 'utf8');
      for (const name of referencedSecretNames(source)) secrets.add(name);
    }
    const verifyJwt = functionConfig.verify_jwt ?? true;
    return {
      slug,
      verify_jwt: Boolean(verifyJwt),
      files,
      source_digest: sha256(stableStringify(files)),
      referenced_secret_names: [...secrets].sort((left, right) => left.localeCompare(right, 'en')),
    };
  });
}

function gitCandidate(root) {
  const head = git(root, ['rev-parse', 'HEAD']).stdout.trim();
  const branch = git(root, ['branch', '--show-current'], { allowFailure: true }).stdout.trim() || 'DETACHED';
  const status = git(root, ['status', '--porcelain=v1', '--untracked-files=all']).stdout;
  const dirtyPaths = status.split(/\r?\n/u)
    .map((line) => line.slice(3).trim())
    .filter(Boolean)
    .map(normalizeRepoPath)
    .sort((left, right) => left.localeCompare(right, 'en'));
  return {
    commit_sha: head,
    branch,
    clean: dirtyPaths.length === 0,
    dirty_paths_digest: dirtyPaths.length === 0 ? null : sha256(dirtyPaths.join('\n')),
    dirty_path_count: dirtyPaths.length,
  };
}

function supabaseCliVersion(root) {
  const invocation = resolveNpmInvocation();
  const result = run(
    invocation.command,
    [...invocation.prefixArgs, 'exec', '--', 'supabase', '--version'],
    { cwd: root, allowFailure: true },
  );
  if (result.status !== 0) return null;
  return safeAscii(result.stdout || result.stderr).split(/\r?\n/u)[0].trim() || null;
}

function normalizeEdgeEnvironmentNameList(value, code, minimum = 0) {
  if (!Array.isArray(value)) fail(code);

  const names = value.map((entry) => String(entry ?? '').trim());

  if (
    names.length < minimum
    || names.some((name) => !/^[A-Z][A-Z0-9_]*$/u.test(name))
    || new Set(names).size !== names.length
  ) {
    fail(code);
  }

  return names.sort((left, right) => left.localeCompare(right, 'en'));
}

function normalizeEdgeEnvironmentRequirements(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail('EDGE_ENVIRONMENT_REQUIREMENTS_INVALID');
  }

  const requiredAll = normalizeEdgeEnvironmentNameList(
    value.required_all,
    'EDGE_ENVIRONMENT_REQUIRED_ALL_INVALID',
  );

  const optionalOrDefaulted = normalizeEdgeEnvironmentNameList(
    value.optional_or_defaulted,
    'EDGE_ENVIRONMENT_OPTIONAL_INVALID',
  );

  const localOnly = normalizeEdgeEnvironmentNameList(
    value.local_only ?? [],
    'EDGE_ENVIRONMENT_LOCAL_ONLY_INVALID',
  );

  if (!Array.isArray(value.required_any_of)) {
    fail('EDGE_ENVIRONMENT_REQUIRED_ANY_OF_INVALID');
  }

  const requiredAnyOf = value.required_any_of.map((entry) => {
    const requirementId = String(entry?.requirement_id ?? '').trim();

    if (!/^[A-Z][A-Z0-9_]*$/u.test(requirementId)) {
      fail('EDGE_ENVIRONMENT_REQUIREMENT_ID_INVALID');
    }

    return {
      requirement_id: requirementId,
      names: normalizeEdgeEnvironmentNameList(
        entry?.names,
        'EDGE_ENVIRONMENT_REQUIRED_ANY_OF_NAMES_INVALID',
        2,
      ),
    };
  }).sort((left, right) =>
    left.requirement_id.localeCompare(right.requirement_id, 'en'));

  if (
    new Set(requiredAnyOf.map((entry) => entry.requirement_id)).size
    !== requiredAnyOf.length
  ) {
    fail('EDGE_ENVIRONMENT_REQUIREMENT_ID_DUPLICATED');
  }

  const classifiedNames = [
    ...requiredAll,
    ...optionalOrDefaulted,
    ...localOnly,
    ...requiredAnyOf.flatMap((entry) => entry.names),
  ];

  if (new Set(classifiedNames).size !== classifiedNames.length) {
    fail('EDGE_ENVIRONMENT_NAME_CLASSIFIED_MORE_THAN_ONCE');
  }

  return {
    required_all: requiredAll,
    required_any_of: requiredAnyOf,
    optional_or_defaulted: optionalOrDefaulted,
    local_only: localOnly,
  };
}

function normalizeHostedEnvironmentContracts(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail('HOSTED_ENVIRONMENT_CONTRACTS_INVALID');
  }

  const normalized = {};
  for (const [rawRole, rawContract] of Object.entries(value)) {
    const role = String(rawRole ?? '').trim().toUpperCase();
    if (!['STAGING', 'PRODUCTION'].includes(role) || normalized[role]) {
      fail('HOSTED_ENVIRONMENT_ROLE_INVALID', role || 'EMPTY');
    }
    if (!rawContract || typeof rawContract !== 'object' || Array.isArray(rawContract)) {
      fail('HOSTED_ENVIRONMENT_CONTRACT_INVALID', role);
    }

    const config = rawContract.config;
    const dataApi = config?.data_api;
    const auth = config?.auth;
    const storage = config?.storage;
    const realtime = config?.realtime;
    const edgeFunctions = rawContract.edge_functions;
    const edgeEnvironmentRequirements = rawContract.edge_environment_requirements === undefined
      ? null
      : normalizeEdgeEnvironmentRequirements(rawContract.edge_environment_requirements);

    const normalizeUniqueStrings = (entries, code) => {
      if (!Array.isArray(entries)) fail(code, role);
      const values = entries.map((entry) => String(entry ?? '').trim());
      if (values.some((entry) => !entry) || new Set(values).size !== values.length) fail(code, role);
      return values;
    };

    const schemas = normalizeUniqueStrings(
      dataApi?.schemas,
      'HOSTED_DATA_API_SCHEMAS_INVALID',
    );
    const extraSearchPath = normalizeUniqueStrings(
      dataApi?.extra_search_path,
      'HOSTED_DATA_API_SEARCH_PATH_INVALID',
    );
    const maxRows = Number(dataApi?.max_rows);
    if (!Number.isInteger(maxRows) || maxRows <= 0) {
      fail('HOSTED_DATA_API_MAX_ROWS_INVALID', role);
    }

    if (
      typeof auth?.signup_enabled !== 'boolean'
      || typeof auth?.anonymous_sign_ins_enabled !== 'boolean'
      || !Number.isInteger(Number(auth?.jwt_expiry))
      || Number(auth.jwt_expiry) <= 0
      || !/^https?:\/\//u.test(String(auth?.site_url ?? ''))
    ) {
      fail('HOSTED_AUTH_CONTRACT_INVALID', role);
    }

    const fileSizeLimitBytes = Number(storage?.file_size_limit_bytes);
    if (!Number.isFinite(fileSizeLimitBytes) || fileSizeLimitBytes <= 0) {
      fail('HOSTED_STORAGE_CONTRACT_INVALID', role);
    }
    if (typeof realtime?.suspended !== 'boolean') {
      fail('HOSTED_REALTIME_CONTRACT_INVALID', role);
    }

    if (
      !edgeFunctions
      || typeof edgeFunctions !== 'object'
      || Array.isArray(edgeFunctions)
      || edgeFunctions.default_disposition !== 'REQUIRED_HOSTED'
      || !Array.isArray(edgeFunctions.solo_local)
    ) {
      fail('HOSTED_EDGE_FUNCTION_CONTRACT_INVALID', role);
    }

    const soloLocal = edgeFunctions.solo_local
      .map((entry) => String(entry ?? '').trim())
      .sort((left, right) => left.localeCompare(right, 'en'));
    if (
      soloLocal.some((slug) => !/^[a-z0-9][a-z0-9-]*$/u.test(slug))
      || new Set(soloLocal).size !== soloLocal.length
    ) {
      fail('HOSTED_EDGE_FUNCTION_SOLO_LOCAL_INVALID', role);
    }

    normalized[role] = {
      config: {
        data_api: {
          schemas,
          extra_search_path: extraSearchPath,
          max_rows: maxRows,
        },
        auth: {
          signup_enabled: auth.signup_enabled,
          anonymous_sign_ins_enabled: auth.anonymous_sign_ins_enabled,
          jwt_expiry: Number(auth.jwt_expiry),
          site_url: String(auth.site_url),
        },
        storage: { file_size_limit_bytes: fileSizeLimitBytes },
        realtime: { suspended: realtime.suspended },
      },
      edge_functions: {
        default_disposition: 'REQUIRED_HOSTED',
        solo_local: soloLocal,
      },
      edge_environment_requirements: edgeEnvironmentRequirements,
    };
  }

  if (!normalized.STAGING) fail('HOSTED_STAGING_ENVIRONMENT_CONTRACT_MISSING');
  return normalized;
}

function readHostedResourceBaseline(root) {
  const absolute = path.join(root, ...READINESS_CONTRACT_RELATIVE.split('/'));
  const contract = JSON.parse(fs.readFileSync(absolute, 'utf8'));
  const baseline = contract?.physical_dependencies?.supabase_pre_e5_foundation?.hosted_resource_baseline;

  if (
    !baseline
    || baseline.schema_version !== 3
    || !Array.isArray(baseline.cron_jobs)
    || !Array.isArray(baseline.internal_job_secret_keys)
  ) {
    fail('HOSTED_RESOURCE_BASELINE_MISSING');
  }

  const cronJobs = baseline.cron_jobs.map((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      fail('HOSTED_CRON_CONTRACT_INVALID');
    }
    if ('command' in entry || 'command_sha256' in entry) {
      fail('HOSTED_CRON_COMMAND_FORBIDDEN');
    }
    const jobname = String(entry.jobname ?? '').trim();
    const schedule = String(entry.schedule ?? '').trim();
    if (!jobname || !schedule || typeof entry.active !== 'boolean') {
      fail('HOSTED_CRON_CONTRACT_INVALID', jobname || 'UNKNOWN');
    }
    return { jobname, schedule, active: entry.active };
  }).sort((left, right) =>
    left.jobname.localeCompare(right.jobname, 'en')
    || left.schedule.localeCompare(right.schedule, 'en')
    || Number(left.active) - Number(right.active));

  const internalJobSecretKeys = [...new Set(
    baseline.internal_job_secret_keys
      .map((entry) => String(entry ?? '').trim())
      .filter(Boolean)
  )].sort((left, right) => left.localeCompare(right, 'en'));

  if (internalJobSecretKeys.length !== baseline.internal_job_secret_keys.length) {
    fail('HOSTED_INTERNAL_SECRET_KEY_CONTRACT_INVALID');
  }

  if (baseline.cron_commands_forbidden !== true || baseline.secret_values_forbidden !== true) {
    fail('HOSTED_RESOURCE_REDACTION_CONTRACT_INVALID');
  }

  const edgeEnvironmentRequirements = normalizeEdgeEnvironmentRequirements(
    baseline.edge_environment_requirements,
  );
  const environmentContracts = normalizeHostedEnvironmentContracts(
    baseline.environment_contracts,
  );

  return {
    schema_version: 2,
    cron_jobs: cronJobs,
    internal_job_secret_keys: internalJobSecretKeys,
    edge_environment_requirements: edgeEnvironmentRequirements,
    environment_contracts: environmentContracts,
  };
}

function expectedConfigContract(sections) {
  const api = sections.api ?? {};
  const db = sections.db ?? {};
  const storage = sections.storage ?? {};
  const auth = sections.auth ?? {};
  const realtime = sections.realtime ?? {};
  return {
    postgres_major: Number(db.major_version),
    data_api: {
      schemas: Array.isArray(api.schemas) ? [...api.schemas] : [],
      extra_search_path: Array.isArray(api.extra_search_path) ? [...api.extra_search_path] : [],
      max_rows: Number(api.max_rows),
    },
    storage: {
      enabled: storage.enabled !== false,
      file_size_limit_bytes: parseByteSize(storage.file_size_limit),
    },
    auth: {
      enabled: auth.enabled !== false,
      signup_enabled: auth.enable_signup !== false,
      anonymous_sign_ins_enabled: auth.enable_anonymous_sign_ins === true,
      jwt_expiry: Number(auth.jwt_expiry),
      site_url: auth.site_url ?? null,
      additional_redirect_urls: Array.isArray(auth.additional_redirect_urls) ? auth.additional_redirect_urls : [],
    },
    realtime: {
      enabled: realtime.enabled !== false,
    },
  };
}

export function buildExpectedBaseline({ root = repoRootFromModule() } = {}) {
  const manifest = checkManifest({ root });
  const configPath = path.join(root, ...CONFIG_RELATIVE.split('/'));
  const manifestPath = path.join(root, ...MANIFEST_RELATIVE.split('/'));
  const configSource = fs.readFileSync(configPath, 'utf8');
  const manifestSource = fs.readFileSync(manifestPath, 'utf8');
  const configSections = parseToml(configSource);
  const edgeFunctions = inventoryEdgeFunctions({ root, configSections });
  const hostedResources = readHostedResourceBaseline(root);
  const candidate = gitCandidate(root);
  const secretNames = [...new Set(edgeFunctions.flatMap((entry) => entry.referenced_secret_names))]
    .sort((left, right) => left.localeCompare(right, 'en'));
  const stagingContract = hostedResources.environment_contracts.STAGING;
  const soloLocal = new Set(stagingContract.edge_functions.solo_local);
  const localFunctionSlugs = new Set(edgeFunctions.map((entry) => entry.slug));
  for (const slug of soloLocal) {
    if (!localFunctionSlugs.has(slug)) {
      fail('HOSTED_EDGE_FUNCTION_SOLO_LOCAL_SOURCE_MISSING', slug);
    }
  }
  const hostedFunctionSecrets = new Set(
    edgeFunctions
      .filter((entry) => !soloLocal.has(entry.slug))
      .flatMap((entry) => entry.referenced_secret_names),
  );
  const exclusiveLocalOnlySecrets = secretNames
    .filter((name) => !hostedFunctionSecrets.has(name))
    .sort((left, right) => left.localeCompare(right, 'en'));
  if (
    stableStringify(exclusiveLocalOnlySecrets)
    !== stableStringify(hostedResources.edge_environment_requirements.local_only)
  ) {
    fail('HOSTED_LOCAL_ONLY_SECRET_CONTRACT_MISMATCH');
  }
  const core = {
    schema_version: 1,
    authority: 'VENTO_SHELL_VERSIONED_EXPECTED_STATE',
    candidate,
    migration_manifest: {
      digest: sha256(manifestSource),
      count: manifest.summary.files,
      rows: manifest.rows.map((row) => ({
        version: row.version,
        filename: row.filename,
        sha256: row.sha256,
        bytes: row.bytes,
      })),
    },
    config: {
      digest: sha256(configSource),
      contract: expectedConfigContract(configSections),
    },
    edge_functions: edgeFunctions,
    referenced_secret_names: secretNames,
    hosted_resources: hostedResources,
    toolchain: {
      node: process.version,
      supabase_cli: supabaseCliVersion(root),
    },
  };
  return {
    ...core,
    expected_digest: sha256(stableStringify(core)),
  };
}

function normalizeSqlValue(value) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return value;
      }
    }
  }
  return value;
}

export function extractSqlScalar(payload) {
  let rows = payload;
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    if (Array.isArray(payload.result)) rows = payload.result;
    else if (Array.isArray(payload.data)) rows = payload.data;
  }
  if (!Array.isArray(rows) || rows.length === 0) fail('SQL_RESULT_EMPTY');
  const first = rows[0];
  if (first && typeof first === 'object' && !Array.isArray(first)) {
    const values = Object.values(first);
    if (values.length !== 1) fail('SQL_RESULT_SCALAR_EXPECTED');
    return normalizeSqlValue(values[0]);
  }
  return normalizeSqlValue(first);
}

function localContainerName(root, projectId) {
  const explicit = String(process.env.VENTO_SUPABASE_DB_CONTAINER ?? '').trim();
  if (explicit) return explicit;
  const result = run('docker', ['ps', '--format', '{{.Names}}'], { cwd: root, allowFailure: true });
  if (result.status !== 0) fail('LOCAL_DOCKER_UNAVAILABLE');
  const names = result.stdout.split(/\r?\n/u).map((entry) => entry.trim()).filter(Boolean);
  const exact = `supabase_db_${projectId}`;
  if (names.includes(exact)) return exact;
  const normalizedProject = projectId.replace(/[^A-Za-z0-9_-]/gu, '_');
  const candidates = names.filter((name) => name.startsWith('supabase_db_') && name.includes(normalizedProject));
  if (candidates.length !== 1) fail('LOCAL_SUPABASE_DB_CONTAINER_UNRESOLVED', `candidates=${candidates.length}`);
  return candidates[0];
}

function runLocalSql(root, projectId, query) {
  const container = localContainerName(root, projectId);
  const result = run('docker', [
    'exec', '-i', container,
    'psql', '-X', '-A', '-t', '-v', 'ON_ERROR_STOP=1', '-U', 'postgres', '-d', 'postgres', '-c', query,
  ], { cwd: root, allowFailure: true });
  if (result.status !== 0) fail('LOCAL_SQL_QUERY_FAILED', `exit=${result.status}`);
  return normalizeSqlValue(result.stdout.trim());
}

function extensionNames(capabilities) {
  return new Set((capabilities ?? []).map((entry) => String(entry?.name ?? '')));
}

function requiredExtensionCapabilities(expected, localObserved) {
  const required = new Set();
  if (Array.isArray(expected?.hosted_resources?.cron_jobs)
    && expected.hosted_resources.cron_jobs.length > 0) {
    required.add('pg_cron');
  }
  const functions = localObserved?.sql_fingerprint?.functions ?? [];
  if (functions.some((entry) =>
    /\bnet\.http_(?:get|post|delete)\s*\(/u.test(String(entry?.definition ?? '')))) {
    required.add('pg_net');
  }
  return [...required].sort((left, right) => left.localeCompare(right, 'en'));
}

export function observeLocalDatabase({ root = repoRootFromModule(), expected = null } = {}) {
  const baseline = expected ?? buildExpectedBaseline({ root });
  const sections = parseToml(fs.readFileSync(path.join(root, ...CONFIG_RELATIVE.split('/')), 'utf8'));
  const projectId = String(sections['']?.project_id ?? '').trim();
  if (!projectId) fail('LOCAL_PROJECT_ID_MISSING');
  const harness = runHarness({ mode: 'incremental', root });
  const fingerprint = runLocalSql(root, projectId, FINGERPRINT_SQL);
  const extensionCapabilities = runLocalSql(root, projectId, EXTENSION_CAPABILITIES_SQL);
  const storageBuckets = runLocalSql(root, projectId, STORAGE_BUCKETS_SQL);
  let cronJobs = [];
  let cronEvidence = 'NOT_APPLICABLE';
  if (extensionNames(extensionCapabilities).has('pg_cron')) {
    cronJobs = runLocalSql(root, projectId, CRON_JOBS_SQL);
    cronEvidence = 'PASS';
  }
  const core = {
    environment_role: 'local',
    identity: {
      technical_id: `LOCAL:${projectId}`,
      project_id: projectId,
      owner: 'LOCAL_OPERATOR',
    },
    observed_at: new Date().toISOString(),
    toolchain: {
      node: process.version,
      supabase_cli: harness.supabaseVersion,
      postgres_major: harness.postgresMajor,
    },
    harness: {
      mode: harness.mode,
      migrations: harness.migrations,
      test_files: harness.testFiles,
      pgtap_files: harness.pgTapFiles,
      assertions: harness.assertions,
      pass: true,
    },
    sql_fingerprint: fingerprint,
    extension_capabilities: extensionCapabilities,
    storage_buckets: storageBuckets,
    cron: {
      evidence: cronEvidence,
      jobs: cronJobs,
    },
  };
  return {
    ...core,
    observed_digest: sha256(stableStringify(core)),
    expected_digest: baseline.expected_digest,
  };
}

export function assertManagementRequest(method, pathname) {
  const normalizedMethod = String(method ?? '').toUpperCase();
  const normalizedPath = String(pathname ?? '');
  const allowedGet = [
    /^\/v1\/branches\/[A-Za-z0-9_-]+$/u,
    /^\/v1\/projects\/[A-Za-z0-9_-]+$/u,
    /^\/v1\/projects\/[A-Za-z0-9_-]+\/database\/migrations$/u,
    /^\/v1\/projects\/[A-Za-z0-9_-]+\/functions$/u,
    /^\/v1\/projects\/[A-Za-z0-9_-]+\/functions\/[A-Za-z0-9_-]+\/body$/u,
    /^\/v1\/projects\/[A-Za-z0-9_-]+\/config\/auth$/u,
    /^\/v1\/projects\/[A-Za-z0-9_-]+\/config\/storage$/u,
    /^\/v1\/projects\/[A-Za-z0-9_-]+\/config\/realtime$/u,
    /^\/v1\/projects\/[A-Za-z0-9_-]+\/postgrest$/u,
    /^\/v1\/projects\/[A-Za-z0-9_-]+\/secrets$/u,
  ];
  const readOnlyQuery = /^\/v1\/projects\/[A-Za-z0-9_-]+\/database\/query\/read-only$/u;
  if (normalizedMethod === 'GET' && allowedGet.some((pattern) => pattern.test(normalizedPath))) return true;
  if (normalizedMethod === 'POST' && readOnlyQuery.test(normalizedPath)) return true;
  fail('MANAGEMENT_API_OPERATION_FORBIDDEN', `${normalizedMethod}:${normalizedPath}`);
}

async function managementRequest({ token, pathname, method = 'GET', body = null, fetchImpl = fetch }) {
  assertManagementRequest(method, pathname);
  if (!token) fail('SUPABASE_ACCESS_TOKEN_MISSING');
  const response = await fetchImpl(`${MANAGEMENT_BASE_URL}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ...(body === null ? {} : { 'Content-Type': 'application/json' }),
    },
    body: body === null ? undefined : JSON.stringify(body),
  });
  if (!response.ok) fail('MANAGEMENT_API_HTTP', `${response.status}:${pathname}`);
  return response.json();
}

function multipartBoundary(contentType) {
  const match = /boundary=(?:"([^"]+)"|([^;]+))/iu.exec(String(contentType ?? ''));
  const boundary = String(match?.[1] ?? match?.[2] ?? '').trim();
  if (!boundary) fail('REMOTE_FUNCTION_MULTIPART_BOUNDARY_MISSING');
  return boundary;
}

function multipartHeaders(raw) {
  const headers = {};
  for (const line of String(raw ?? '').split('\r\n')) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const name = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (name) headers[name] = value;
  }
  return headers;
}

function dispositionParameter(value, parameter) {
  const expression = new RegExp(`(?:^|;)\\s*${parameter}=\"([^\"]*)\"`, 'iu');
  return expression.exec(String(value ?? ''))?.[1] ?? null;
}

function normalizeRemoteFunctionFileName(slug, rawName) {
  const name = normalizeRepoPath(rawName);
  const segments = name.split('/');
  if (
    !name
    || name.includes('\u0000')
    || name.startsWith('/')
    || /^[A-Za-z]:\//u.test(name)
    || segments.includes('..')
  ) {
    fail('REMOTE_FUNCTION_FILE_PATH_UNSAFE', slug);
  }
  return name;
}

function parseRemoteFunctionMultipartMetadata(slug, payload) {
  const source = Buffer.isBuffer(payload) ? payload.toString('utf8') : String(payload ?? '');
  try {
    const parsed = JSON.parse(source.trim());
    const entrypointPath =
      typeof parsed?.deno2_entrypoint_path === 'string' && parsed.deno2_entrypoint_path.trim()
        ? parsed.deno2_entrypoint_path.trim()
        : typeof parsed?.entrypoint_path === 'string' && parsed.entrypoint_path.trim()
          ? parsed.entrypoint_path.trim()
          : null;
    return entrypointPath;
  } catch {
    fail('REMOTE_FUNCTION_MULTIPART_METADATA_INVALID', slug);
  }
}

export function parseRemoteFunctionMultipart(slug, payload, contentType) {
  const body = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  const boundary = multipartBoundary(contentType);
  const delimiter = Buffer.from(`--${boundary}`, 'utf8');
  const nextPrefix = Buffer.from(`\r\n--${boundary}`, 'utf8');
  const headerSeparator = Buffer.from('\r\n\r\n', 'utf8');
  const files = [];
  let entrypointPath = null;

  let boundaryIndex = body.indexOf(delimiter);
  if (boundaryIndex < 0) fail('REMOTE_FUNCTION_MULTIPART_OPENING_BOUNDARY_MISSING', slug);

  while (boundaryIndex >= 0) {
    let cursor = boundaryIndex + delimiter.length;

    if (body[cursor] === 45 && body[cursor + 1] === 45) break;

    if (body[cursor] !== 13 || body[cursor + 1] !== 10) {
      fail('REMOTE_FUNCTION_MULTIPART_INVALID_BOUNDARY', slug);
    }
    cursor += 2;

    const headerEnd = body.indexOf(headerSeparator, cursor);
    if (headerEnd < 0) fail('REMOTE_FUNCTION_MULTIPART_HEADERS_MISSING', slug);

    const headers = multipartHeaders(body.subarray(cursor, headerEnd).toString('utf8'));
    const partStart = headerEnd + headerSeparator.length;
    const nextBoundary = body.indexOf(nextPrefix, partStart);

    if (nextBoundary < 0) fail('REMOTE_FUNCTION_MULTIPART_CLOSING_BOUNDARY_MISSING', slug);

    const disposition = headers['content-disposition'] ?? '';
    const fieldName = dispositionParameter(disposition, 'name');
    const filename =
      headers['supabase-path']
      ?? dispositionParameter(disposition, 'filename');

    if (filename) {
      files.push({
        name: normalizeRemoteFunctionFileName(slug, filename),
        content: Buffer.from(body.subarray(partStart, nextBoundary)),
      });
    } else if (fieldName === 'metadata') {
      entrypointPath = parseRemoteFunctionMultipartMetadata(
        slug,
        body.subarray(partStart, nextBoundary),
      );
    }

    boundaryIndex = nextBoundary + 2;
  }

  if (files.length === 0) {
    fail('REMOTE_FUNCTION_MULTIPART_FILES_MISSING', slug);
  }

  return { files, entrypoint_path: entrypointPath };
}

export async function fetchRemoteFunctionBody({
  token,
  projectRef,
  slug,
  fetchImpl = fetch,
} = {}) {
  const pathname = `/v1/projects/${projectRef}/functions/${slug}/body`;
  assertManagementRequest('GET', pathname);
  if (!token) fail('SUPABASE_ACCESS_TOKEN_MISSING');

  const response = await fetchImpl(`${MANAGEMENT_BASE_URL}${pathname}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'multipart/form-data',
    },
  });

  if (!response.ok) {
    fail('MANAGEMENT_API_HTTP', `${response.status}:${pathname}`);
  }

  const contentType = String(response.headers?.get?.('content-type') ?? '');
  if (!contentType.toLowerCase().startsWith('multipart/')) {
    fail('REMOTE_FUNCTION_MULTIPART_CONTENT_TYPE_INVALID', contentType || 'MISSING');
  }

  const payload = Buffer.from(await response.arrayBuffer());
  return parseRemoteFunctionMultipart(slug, payload, contentType);
}

function normalizeProject(payload) {
  return {
    ref: payload?.ref ?? payload?.id ?? null,
    name: payload?.name ?? null,
    region: payload?.region ?? null,
    status: payload?.status ?? null,
    database: {
      version: payload?.database?.version ?? null,
      postgres_engine: payload?.database?.postgres_engine ?? null,
      release_channel: payload?.database?.release_channel ?? null,
    },
  };
}

function normalizeBranchProject(payload) {
  return {
    ref: payload?.ref ?? null,
    name: payload?.name ?? null,
    region: payload?.region ?? null,
    status: payload?.status ?? null,
    hosted_identity_kind: 'branch',
    database: {
      version: payload?.postgres_version ?? null,
      postgres_engine: payload?.postgres_engine ?? null,
      release_channel: payload?.release_channel ?? null,
    },
  };
}

async function resolveHostedProjectIdentity(ref, token, fetchImpl) {
  let projectError = null;
  try {
    return normalizeProject(await managementRequest({
      token,
      pathname: `/v1/projects/${ref}`,
      fetchImpl,
    }));
  } catch (error) {
    projectError = error;
  }

  try {
    return normalizeBranchProject(await managementRequest({
      token,
      pathname: `/v1/branches/${ref}`,
      fetchImpl,
    }));
  } catch (branchError) {
    fail(
      'REMOTE_HOSTED_IDENTITY_UNRESOLVED',
      `project=${safeAscii(projectError?.message ?? String(projectError))};branch=${safeAscii(branchError?.message ?? String(branchError))}`,
    );
  }
}

function normalizeMigrationHistory(payload) {
  if (!Array.isArray(payload)) return null;
  return payload.map((entry) => ({
    version: String(entry?.version ?? ''),
    name: String(entry?.name ?? ''),
  })).sort((left, right) => left.version.localeCompare(right.version, 'en') || left.name.localeCompare(right.name, 'en'));
}

function normalizeRemoteFunctionFilePath(slug, rawName, entrypointPath) {
  let name = normalizeRemoteFunctionFileName(slug, rawName);
  if (!entrypointPath) {
    if (name.startsWith(`${slug}/`)) name = name.slice(slug.length + 1);
    return name;
  }

  let entrypoint = normalizeRepoPath(entrypointPath);
  if (entrypoint.startsWith('file://')) {
    try {
      entrypoint = new URL(entrypoint).pathname;
    } catch {
      fail('REMOTE_FUNCTION_ENTRYPOINT_PATH_INVALID', slug);
    }
  }

  const entrypointAbsolute = entrypoint.startsWith('/');
  const partAbsolute = name.startsWith('/');
  if (entrypointAbsolute !== partAbsolute) {
    if (name.startsWith(`${slug}/`)) name = name.slice(slug.length + 1);
    return name;
  }

  const relativePath = path.posix.relative(entrypoint, name);
  const entrypointName = path.posix.basename(entrypoint);
  let destination = path.posix.normalize(
    relativePath
      ? path.posix.join(entrypointName, relativePath)
      : entrypointName,
  );
  if (destination.startsWith(`${slug}/`)) {
    destination = destination.slice(slug.length + 1);
  }

  return normalizeRemoteFunctionFileName(slug, destination);
}

function normalizeRemoteFunctionFiles(slug, payload) {
  const files = Array.isArray(payload?.files) ? payload.files : [];
  if (files.length === 0) return null;
  const entrypointPath = String(payload?.entrypoint_path ?? '').trim() || null;
  return files.map((entry) => {
    const name = normalizeRemoteFunctionFilePath(
      slug,
      entry?.name ?? '',
      entrypointPath,
    );
    const content = canonicalBytes(entry?.content ?? '');
    const basename = path.posix.basename(name);
    if (basename === '.npmrc') {
      if (npmrcHasEffectiveConfiguration(content)) {
        fail('REMOTE_FUNCTION_NPMRC_PARITY_UNSUPPORTED', slug);
      }
      return null;
    }
    if (basename === 'deno.json' && !denoJsonHasEffectiveConfiguration(content)) {
      return null;
    }
    return {
      path: name,
      sha256: crypto.createHash('sha256').update(content).digest('hex'),
      bytes: content.byteLength,
    };
  }).filter(Boolean).sort((left, right) => left.path.localeCompare(right.path, 'en'));
}

export function normalizeRemoteFunctionBody(slug, metadata, body) {
  const files = normalizeRemoteFunctionFiles(slug, body);
  return {
    slug,
    verify_jwt: Boolean(metadata?.verify_jwt),
    status: metadata?.status ?? null,
    version: metadata?.version ?? null,
    deployed_bundle_digest: metadata?.ezbr_sha256 ?? null,
    files,
    source_digest: files ? sha256(stableStringify(files)) : null,
  };
}

function normalizeAuthConfig(payload) {
  return {
    disable_signup: payload?.disable_signup ?? null,
    external_anonymous_users_enabled: payload?.external_anonymous_users_enabled ?? null,
    jwt_exp: payload?.jwt_exp ?? null,
    mailer_autoconfirm: payload?.mailer_autoconfirm ?? null,
    external_email_enabled: payload?.external_email_enabled ?? null,
    site_url: payload?.site_url ?? null,
    uri_allow_list: payload?.uri_allow_list ?? null,
  };
}

function normalizeStorageConfig(payload) {
  return {
    file_size_limit: payload?.fileSizeLimit ?? null,
    features: payload?.features ?? null,
    capabilities: payload?.capabilities ?? null,
    migration_version: payload?.migrationVersion ?? null,
    database_pool_mode: payload?.databasePoolMode ?? null,
  };
}

function normalizeRealtimeConfig(payload) {
  const keys = [
    'private_only',
    'connection_pool',
    'max_concurrent_users',
    'max_events_per_second',
    'max_bytes_per_second',
    'max_channels_per_client',
    'max_joins_per_second',
    'max_presence_events_per_second',
    'max_payload_size_in_kb',
    'suspend',
    'presence_enabled',
  ];
  return Object.fromEntries(keys.map((key) => [key, payload?.[key] ?? null]));
}

function normalizePostgrestConfig(payload) {
  return {
    db_schema: payload?.db_schema ?? null,
    max_rows: payload?.max_rows ?? null,
    db_extra_search_path: payload?.db_extra_search_path ?? null,
    db_pool: payload?.db_pool ?? null,
    db_pool_acquisition_timeout: payload?.db_pool_acquisition_timeout ?? null,
  };
}

function normalizeSecretNames(payload) {
  if (!Array.isArray(payload)) return null;
  return payload.map((entry) => String(entry?.name ?? '')).filter(Boolean)
    .sort((left, right) => left.localeCompare(right, 'en'));
}

async function captureSurface(name, callback) {
  try {
    return { name, status: 'PASS', value: await callback() };
  } catch (error) {
    return { name, status: 'INSUFFICIENT_EVIDENCE', error: safeAscii(error?.message ?? String(error)) };
  }
}

async function remoteReadOnlySql(projectRef, token, query, fetchImpl) {
  const payload = await managementRequest({
    token,
    pathname: `/v1/projects/${projectRef}/database/query/read-only`,
    method: 'POST',
    body: { query, parameters: [] },
    fetchImpl,
  });
  return extractSqlScalar(payload);
}

export async function observeRemoteEnvironment({
  projectRef,
  environmentRole,
  owner,
  scope = 'full',
  token,
  fetchImpl = fetch,
} = {}) {
  const role = String(environmentRole ?? '').trim().toLowerCase();
  const ref = String(projectRef ?? '').trim();
  const environmentOwner = String(owner ?? '').trim();
  const remoteScope = String(scope ?? 'full').trim().toLowerCase();
  const identityIssues = [];
  if (!ALLOWED_REMOTE_ROLES.has(role)) identityIssues.push('ENVIRONMENT_ROLE_MISSING_OR_INVALID');
  if (!ALLOWED_REMOTE_SCOPES.has(remoteScope)) identityIssues.push('REMOTE_SCOPE_MISSING_OR_INVALID');
  if (!/^[A-Za-z0-9_-]+$/u.test(ref)) identityIssues.push('PROJECT_REF_MISSING_OR_INVALID');
  if (!environmentOwner) identityIssues.push('ENVIRONMENT_OWNER_MISSING');
  if (!token) identityIssues.push('SUPABASE_ACCESS_TOKEN_MISSING');
  if (identityIssues.length > 0) {
    return {
      environment_role: role || null,
      remote_scope: remoteScope || null,
      identity: { project_ref: ref || null, owner: environmentOwner || null },
      identity_status: 'INSUFFICIENT_EVIDENCE',
      identity_issues: identityIssues,
      surfaces: [],
      observed_digest: null,
    };
  }

  const surfaces = [];
  const project = await captureSurface('project', async () => resolveHostedProjectIdentity(
    ref,
    token,
    fetchImpl,
  ));
  surfaces.push(project);

  if (remoteScope === 'history' || remoteScope === 'full') {
    const migrations = await captureSurface('migrations', async () => normalizeMigrationHistory(await managementRequest({
      token, pathname: `/v1/projects/${ref}/database/migrations`, fetchImpl,
    })));
    surfaces.push(migrations);
  }

  if (remoteScope === 'full') {
    const functionList = await captureSurface('edge_functions', async () => {
      const list = await managementRequest({ token, pathname: `/v1/projects/${ref}/functions`, fetchImpl });
      if (!Array.isArray(list)) fail('REMOTE_FUNCTION_LIST_INVALID');
      const normalized = [];
      for (const metadata of [...list].sort((left, right) => String(left?.slug ?? '').localeCompare(String(right?.slug ?? ''), 'en'))) {
        const slug = String(metadata?.slug ?? '').trim();
        if (!slug) fail('REMOTE_FUNCTION_SLUG_MISSING');
        const body = await fetchRemoteFunctionBody({
          token,
          projectRef: ref,
          slug,
          fetchImpl,
        });
        normalized.push(normalizeRemoteFunctionBody(slug, metadata, body));
      }
      return normalized;
    });
    const auth = await captureSurface('auth', async () => normalizeAuthConfig(await managementRequest({
      token, pathname: `/v1/projects/${ref}/config/auth`, fetchImpl,
    })));
    const storage = await captureSurface('storage', async () => normalizeStorageConfig(await managementRequest({
      token, pathname: `/v1/projects/${ref}/config/storage`, fetchImpl,
    })));
    const realtime = await captureSurface('realtime', async () => normalizeRealtimeConfig(await managementRequest({
      token, pathname: `/v1/projects/${ref}/config/realtime`, fetchImpl,
    })));
    const postgrest = await captureSurface('postgrest', async () => normalizePostgrestConfig(await managementRequest({
      token, pathname: `/v1/projects/${ref}/postgrest`, fetchImpl,
    })));
    const secrets = await captureSurface('secret_names', async () => normalizeSecretNames(await managementRequest({
      token, pathname: `/v1/projects/${ref}/secrets`, fetchImpl,
    })));
    const sqlFingerprint = await captureSurface('sql_fingerprint', async () => remoteReadOnlySql(ref, token, FINGERPRINT_SQL, fetchImpl));
    const extensionCapabilities = await captureSurface(
      'extension_capabilities',
      async () => remoteReadOnlySql(ref, token, EXTENSION_CAPABILITIES_SQL, fetchImpl),
    );
    const storageBuckets = await captureSurface('storage_buckets', async () => remoteReadOnlySql(ref, token, STORAGE_BUCKETS_SQL, fetchImpl));
    const cron = extensionCapabilities.status === 'PASS'
      && !extensionNames(extensionCapabilities.value).has('pg_cron')
      ? { name: 'cron_jobs', status: 'NOT_APPLICABLE', value: [] }
      : extensionCapabilities.status === 'PASS'
        ? await captureSurface('cron_jobs', async () => remoteReadOnlySql(ref, token, CRON_JOBS_SQL, fetchImpl))
        : { name: 'cron_jobs', status: 'INSUFFICIENT_EVIDENCE', error: 'EXTENSION_CAPABILITIES_UNAVAILABLE' };
    const internalJobSecretKeys = await captureSurface(
      'internal_job_secret_keys',
      async () => remoteReadOnlySql(ref, token, INTERNAL_JOB_SECRET_KEYS_SQL, fetchImpl),
    );
    surfaces.push(
      functionList, auth, storage, realtime, postgrest, secrets,
      sqlFingerprint, extensionCapabilities, storageBuckets, cron, internalJobSecretKeys,
    );
  }

  const core = {
    environment_role: role,
    remote_scope: remoteScope,
    identity: {
      project_ref: ref,
      owner: environmentOwner,
      region: project.status === 'PASS' ? project.value.region : null,
      technical_id: project.status === 'PASS' ? project.value.ref : ref,
    },
    identity_status: 'PASS',
    observed_at: new Date().toISOString(),
    surfaces,
  };
  return {
    ...core,
    observed_digest: sha256(stableStringify(core)),
  };
}

function surfaceMap(observed) {
  return new Map((observed?.surfaces ?? []).map((entry) => [entry.name, entry]));
}

function driftId(surface, identity, environment, expected, observed) {
  return `DRIFT-${sha256(stableStringify({ surface, identity, environment, expected, observed })).slice(0, 16).toUpperCase()}`;
}

function safeEvidenceValue(value) {
  if (value === undefined) return null;
  if (value === null || typeof value === 'boolean' || typeof value === 'number') return value;
  if (typeof value === 'string' && value.length <= 160) return safeAscii(value);
  return { digest: sha256(stableStringify(value)) };
}

function addDrift(drifts, {
  surface,
  identity,
  environment,
  expected,
  observed,
  classification = 'UNAUTHORIZED_DRIFT',
  reason,
}) {
  drifts.push({
    drift_id: driftId(surface, identity, environment, expected, observed),
    surface,
    identity,
    environment,
    expected: safeEvidenceValue(expected),
    observed: safeEvidenceValue(observed),
    classification,
    reason,
  });
}

function compareExact(drifts, options) {
  if (stableStringify(options.expected) === stableStringify(options.observed)) return;
  addDrift(drifts, options);
}

function surfaceValueOrInsufficient(drifts, surfaces, name, environment) {
  const entry = surfaces.get(name);
  if (!entry || entry.status !== 'PASS') {
    addDrift(drifts, {
      surface: name,
      identity: name,
      environment,
      expected: 'EVIDENCE_REQUIRED',
      observed: entry?.error ?? 'NOT_OBSERVED',
      classification: 'INSUFFICIENT_EVIDENCE',
      reason: 'Required surface evidence is missing or unreadable.',
    });
    return null;
  }
  return entry.value;
}

function normalizeCsv(value) {
  if (Array.isArray(value)) return value.map(String).map((entry) => entry.trim()).filter(Boolean).sort();
  return String(value ?? '').split(',').map((entry) => entry.trim()).filter(Boolean).sort();
}

function expectedMigrationHistory(expected) {
  return expected.migration_manifest.rows.map((row) => row.version).filter((version) => version !== 'UNVERSIONED').sort();
}

function cronContractRows(rows) {
  return (rows ?? []).map((entry) => ({
    jobname: String(entry?.jobname ?? ''),
    schedule: String(entry?.schedule ?? ''),
    active: Boolean(entry?.active),
  })).sort((left, right) =>
    left.jobname.localeCompare(right.jobname, 'en')
    || left.schedule.localeCompare(right.schedule, 'en')
    || Number(left.active) - Number(right.active));
}

function functionMap(functions) {
  return new Map((functions ?? []).map((entry) => [entry.slug, entry]));
}

export function compareFunctionSets(
  expectedFunctions,
  observedFunctions,
  drifts,
  environment,
  policy = null,
) {
  const expectedMap = functionMap(expectedFunctions);
  const observedMap = functionMap(observedFunctions);
  const soloLocal = new Set(
    (policy?.solo_local ?? []).map((entry) => String(entry ?? '').trim()),
  );

  for (const slug of [...soloLocal].sort()) {
    if (observedMap.has(slug)) {
      addDrift(drifts, {
        surface: 'edge_functions',
        identity: slug,
        environment,
        expected: 'ABSENT',
        observed: 'PRESENT',
        reason: 'Edge Function is explicitly SOLO_LOCAL for this hosted environment.',
      });
    }
    expectedMap.delete(slug);
    observedMap.delete(slug);
  }

  for (const slug of [...new Set([...expectedMap.keys(), ...observedMap.keys()])].sort()) {
    const expected = expectedMap.get(slug);
    const observed = observedMap.get(slug);
    if (!expected || !observed) {
      addDrift(drifts, {
        surface: 'edge_functions',
        identity: slug,
        environment,
        expected: expected ? 'PRESENT' : 'ABSENT',
        observed: observed ? 'PRESENT' : 'ABSENT',
        reason: 'Edge Function presence differs from the explicit hosted environment contract.',
      });
      continue;
    }
    compareExact(drifts, {
      surface: 'edge_functions.verify_jwt',
      identity: slug,
      environment,
      expected: expected.verify_jwt,
      observed: observed.verify_jwt,
      reason: 'Edge Function verify_jwt differs from the candidate.',
    });
    if (!observed.files || !observed.source_digest) {
      addDrift(drifts, {
        surface: 'edge_functions.source',
        identity: slug,
        environment,
        expected: expected.source_digest,
        observed: 'BODY_FILES_UNAVAILABLE',
        classification: 'INSUFFICIENT_EVIDENCE',
        reason: 'Remote function body did not expose comparable files.',
      });
      continue;
    }
    compareExact(drifts, {
      surface: 'edge_functions.source',
      identity: slug,
      environment,
      expected: expected.source_digest,
      observed: observed.source_digest,
      reason: 'Edge Function source files differ from the candidate.',
    });
  }
}

export function validateAllowlist(entries, { now = new Date() } = {}) {
  if (!Array.isArray(entries)) fail('ALLOWLIST_MUST_BE_ARRAY');
  const seen = new Set();
  return entries.map((entry, index) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) fail('ALLOWLIST_ENTRY_INVALID', String(index));
    const required = ['drift_id', 'surface', 'identity', 'environment', 'classification', 'reason', 'risk', 'owner', 'approver', 'evidence', 'treatment'];
    for (const key of required) {
      if (!String(entry[key] ?? '').trim()) fail('ALLOWLIST_FIELD_MISSING', `${index}:${key}`);
    }
    if (seen.has(entry.drift_id)) fail('ALLOWLIST_DRIFT_ID_DUPLICATE', entry.drift_id);
    seen.add(entry.drift_id);
    if (!ALLOWLIST_CLASSIFICATIONS.has(entry.classification)) fail('ALLOWLIST_CLASSIFICATION_INVALID', entry.classification);
    for (const field of ['surface', 'identity', 'environment']) {
      if (/[*?]/u.test(String(entry[field]))) fail('ALLOWLIST_WILDCARD_FORBIDDEN', `${index}:${field}`);
    }
    if (entry.classification === 'TEMPORARY_EXCEPTION') {
      if (!entry.expires_at) fail('ALLOWLIST_EXPIRATION_REQUIRED', entry.drift_id);
      const expires = new Date(entry.expires_at);
      if (Number.isNaN(expires.getTime())) fail('ALLOWLIST_EXPIRATION_INVALID', entry.drift_id);
      if (expires.getTime() <= now.getTime()) fail('ALLOWLIST_EXPIRATION_EXPIRED', entry.drift_id);
    }
    return { ...entry };
  });
}

function loadAllowlist(root, relativePath) {
  if (!relativePath) return [];
  const normalized = normalizeRepoPath(relativePath);
  if (path.isAbsolute(relativePath) || normalized.startsWith('../') || normalized.includes('/../')) {
    fail('ALLOWLIST_PATH_MUST_BE_REPOSITORY_RELATIVE');
  }
  const absolute = path.join(root, ...normalized.split('/'));
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) fail('ALLOWLIST_FILE_MISSING', normalized);
  return validateAllowlist(JSON.parse(fs.readFileSync(absolute, 'utf8')));
}

export function applyAllowlist(drifts, allowlist) {
  const byId = new Map(allowlist.map((entry) => [entry.drift_id, entry]));
  return drifts.map((drift) => {
    const entry = byId.get(drift.drift_id);
    if (!entry) return drift;
    if (entry.surface !== drift.surface || entry.identity !== drift.identity || entry.environment !== drift.environment) {
      return drift;
    }
    return {
      ...drift,
      classification: entry.classification,
      allowance: {
        reason: entry.reason,
        risk: entry.risk,
        owner: entry.owner,
        approver: entry.approver,
        expires_at: entry.expires_at ?? null,
        evidence: entry.evidence,
        treatment: entry.treatment,
      },
    };
  });
}

function certificationFor(environment, drifts) {
  if (drifts.some((entry) => entry.classification === 'INSUFFICIENT_EVIDENCE')) return 'INSUFFICIENT_EVIDENCE';
  if (drifts.some((entry) => entry.classification === 'UNAUTHORIZED_DRIFT')) return 'UNAUTHORIZED_DRIFT';
  if (environment === 'local') return 'LOCAL_CERTIFIED';
  if (environment === 'staging') return 'STAGING_CERTIFIED';
  if (environment === 'production') return 'PRODUCTION_CERTIFIED';
  return 'INSUFFICIENT_EVIDENCE';
}

export function compareLocal({ expected, observed, allowlist = [] } = {}) {
  const drifts = [];
  if (!expected?.candidate?.clean) {
    addDrift(drifts, {
      surface: 'candidate.git_tree',
      identity: expected?.candidate?.commit_sha ?? 'UNKNOWN',
      environment: 'local',
      expected: 'CLEAN',
      observed: `DIRTY:${expected?.candidate?.dirty_path_count ?? 'UNKNOWN'}`,
      classification: 'INSUFFICIENT_EVIDENCE',
      reason: 'A certifiable candidate requires a clean Git tree.',
    });
  }
  compareExact(drifts, {
    surface: 'migration_manifest.count',
    identity: 'supabase/migrations',
    environment: 'local',
    expected: expected?.migration_manifest?.count,
    observed: observed?.harness?.migrations,
    reason: 'Local migration count differs from the canonical manifest.',
  });
  compareExact(drifts, {
    surface: 'postgres.major',
    identity: 'database',
    environment: 'local',
    expected: expected?.config?.contract?.postgres_major,
    observed: observed?.toolchain?.postgres_major,
    reason: 'Local PostgreSQL major differs from config.toml.',
  });
  const applied = applyAllowlist(drifts, allowlist);
  return {
    environment_role: 'local',
    expected_digest: expected?.expected_digest ?? null,
    observed_digest: observed?.observed_digest ?? null,
    drifts: applied,
    certification: certificationFor('local', applied),
  };
}

export function evaluateEdgeSecretRequirements({
  referencedSecretNames = [],
  requirements = null,
  observedSecretNames = [],
  environment = 'staging',
  identity = 'UNKNOWN',
} = {}) {
  const drifts = [];
  let normalized;

  try {
    normalized = normalizeEdgeEnvironmentRequirements(requirements);
  } catch {
    addDrift(drifts, {
      surface: 'edge_secrets.expected_contract',
      identity,
      environment,
      expected: 'VERSIONED_EDGE_ENVIRONMENT_REQUIREMENTS',
      observed: 'INVALID_OR_MISSING',
      classification: 'INSUFFICIENT_EVIDENCE',
      reason: 'The versioned Edge environment requirement contract is missing or invalid.',
    });
    return drifts;
  }

  const referenced = [...new Set(
    referencedSecretNames
      .map((entry) => String(entry ?? '').trim())
      .filter(Boolean),
  )].sort((left, right) => left.localeCompare(right, 'en'));

  const classified = [
    ...normalized.required_all,
    ...normalized.optional_or_defaulted,
    ...normalized.local_only,
    ...normalized.required_any_of.flatMap((entry) => entry.names),
  ].sort((left, right) => left.localeCompare(right, 'en'));

  if (stableStringify(referenced) !== stableStringify(classified)) {
    addDrift(drifts, {
      surface: 'edge_secrets.expected_contract',
      identity,
      environment,
      expected: classified,
      observed: referenced,
      classification: 'INSUFFICIENT_EVIDENCE',
      reason: 'Every non-default Edge environment name referenced by the candidate must be classified exactly once.',
    });
    return drifts;
  }

  const observed = new Set(
    observedSecretNames.map((entry) => String(entry ?? '').trim()).filter(Boolean),
  );

  for (const name of normalized.required_all) {
    if (!observed.has(name)) {
      addDrift(drifts, {
        surface: 'edge_secrets.required_name',
        identity: name,
        environment,
        expected: 'PRESENT',
        observed: 'ABSENT',
        reason: 'A required Edge environment name is missing remotely.',
      });
    }
  }

  for (const group of normalized.required_any_of) {
    if (!group.names.some((name) => observed.has(name))) {
      addDrift(drifts, {
        surface: 'edge_secrets.required_any_of',
        identity: group.requirement_id,
        environment,
        expected: group.names,
        observed: 'NONE_PRESENT',
        reason: 'None of the allowed Edge environment names for this requirement are configured remotely.',
      });
    }
  }

  return drifts;
}

export function compareRemote({ expected, localObserved = null, remoteObserved, allowlist = [], scope = 'full' } = {}) {
  const environment = remoteObserved?.environment_role ?? 'unknown';
  const remoteScope = String(scope ?? remoteObserved?.remote_scope ?? 'full').trim().toLowerCase();
  const drifts = [];
  const finalize = () => {
    const applied = applyAllowlist(drifts, allowlist);
    return {
      environment_role: environment,
      remote_scope: remoteScope,
      expected_digest: expected?.expected_digest ?? null,
      observed_digest: remoteObserved?.observed_digest ?? null,
      candidate_sha: expected?.candidate?.commit_sha ?? null,
      drifts: applied,
      certification: certificationFor(environment, applied),
    };
  };

  if (!ALLOWED_REMOTE_SCOPES.has(remoteScope)) {
    addDrift(drifts, {
      surface: 'environment.scope',
      identity: remoteScope || 'UNKNOWN',
      environment,
      expected: [...ALLOWED_REMOTE_SCOPES].sort(),
      observed: remoteScope || 'MISSING',
      classification: 'INSUFFICIENT_EVIDENCE',
      reason: 'Remote certification scope is missing or invalid.',
    });
    return finalize();
  }

  if (!expected?.candidate?.clean) {
    addDrift(drifts, {
      surface: 'candidate.git_tree',
      identity: expected?.candidate?.commit_sha ?? 'UNKNOWN',
      environment,
      expected: 'CLEAN',
      observed: `DIRTY:${expected?.candidate?.dirty_path_count ?? 'UNKNOWN'}`,
      classification: 'INSUFFICIENT_EVIDENCE',
      reason: 'Remote certification requires a clean immutable candidate.',
    });
  }
  const versionedEnvironmentContracts = expected?.hosted_resources?.environment_contracts ?? null;
  const hostedEnvironmentContract = versionedEnvironmentContracts
    ? versionedEnvironmentContracts[String(environment).toUpperCase()] ?? null
    : null;
  if (remoteScope === 'full' && versionedEnvironmentContracts && !hostedEnvironmentContract) {
    addDrift(drifts, {
      surface: 'hosted_environment.expected_contract',
      identity: environment,
      environment,
      expected: 'VERSIONED_HOSTED_ENVIRONMENT_CONTRACT',
      observed: 'MISSING',
      classification: 'INSUFFICIENT_EVIDENCE',
      reason: 'Full hosted certification requires an explicit versioned contract for this environment.',
    });
    return finalize();
  }

  if (remoteObserved?.identity_status !== 'PASS') {
    for (const issue of remoteObserved?.identity_issues ?? ['ENVIRONMENT_IDENTITY_MISSING']) {
      addDrift(drifts, {
        surface: 'environment.identity',
        identity: remoteObserved?.identity?.project_ref ?? 'UNKNOWN',
        environment,
        expected: 'EXPLICIT_IDENTITY',
        observed: issue,
        classification: 'INSUFFICIENT_EVIDENCE',
        reason: 'Environment identity is incomplete.',
      });
    }
    return finalize();
  }

  const surfaces = surfaceMap(remoteObserved);
  const project = surfaceValueOrInsufficient(drifts, surfaces, 'project', environment);
  if (project) {
    compareExact(drifts, {
      surface: 'environment.project_ref',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: remoteObserved.identity.project_ref,
      observed: project.ref,
      reason: 'Hosted project identity differs from the explicit environment binding.',
    });
    compareExact(drifts, {
      surface: 'postgres.major',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: String(expected.config.contract.postgres_major),
      observed: String(project.database.postgres_engine ?? '').split('.')[0],
      reason: 'Hosted PostgreSQL major differs from the candidate contract.',
    });
  }

  if (remoteScope === 'environment') return finalize();

  const migrations = surfaceValueOrInsufficient(drifts, surfaces, 'migrations', environment);
  if (migrations) {
    const expectedVersions = expectedMigrationHistory(expected);
    const remoteVersions = migrations.map((entry) => entry.version).sort();
    const productionHistoryPrefix = remoteScope === 'history' && environment === 'production';
    const expectedVersionsForScope = productionHistoryPrefix
      ? expectedVersions.slice(0, Math.max(1, remoteVersions.length))
      : expectedVersions;

    compareExact(drifts, {
      surface: 'migration_history.versions',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: expectedVersionsForScope,
      observed: remoteVersions,
      reason: productionHistoryPrefix
        ? 'Production migration history must be a non-empty canonical prefix of the versioned candidate universe.'
        : 'Hosted migration history differs from the versioned candidate universe.',
    });
  }

  if (remoteScope === 'history') return finalize();

  const hostedConfig = hostedEnvironmentContract?.config ?? expected.config.contract;
  const hostedFunctionPolicy = hostedEnvironmentContract?.edge_functions ?? null;

  const functions = surfaceValueOrInsufficient(drifts, surfaces, 'edge_functions', environment);
  const auth = surfaceValueOrInsufficient(drifts, surfaces, 'auth', environment);
  const storage = surfaceValueOrInsufficient(drifts, surfaces, 'storage', environment);
  const realtime = surfaceValueOrInsufficient(drifts, surfaces, 'realtime', environment);
  const postgrest = surfaceValueOrInsufficient(drifts, surfaces, 'postgrest', environment);
  const secrets = surfaceValueOrInsufficient(drifts, surfaces, 'secret_names', environment);
  const sqlFingerprint = surfaceValueOrInsufficient(drifts, surfaces, 'sql_fingerprint', environment);
  const extensionCapabilities = surfaceValueOrInsufficient(
    drifts, surfaces, 'extension_capabilities', environment,
  );
  const storageBuckets = surfaceValueOrInsufficient(drifts, surfaces, 'storage_buckets', environment);
  const versionedHostedCron = Array.isArray(expected?.hosted_resources?.cron_jobs)
    ? expected.hosted_resources.cron_jobs
    : null;
  const localCronApplicable = localObserved?.cron?.evidence === 'PASS';
  const hostedExtensions = extensionCapabilities
    ? extensionNames(extensionCapabilities)
    : new Set();
  const hostedPgCronPresent = hostedExtensions.has('pg_cron');
  const hostedCronRequired = Boolean(versionedHostedCron?.length);
  const cronJobs = hostedPgCronPresent
    ? surfaceValueOrInsufficient(drifts, surfaces, 'cron_jobs', environment)
    : null;

  if (extensionCapabilities) {
    for (const capability of requiredExtensionCapabilities(expected, localObserved)) {
      if (capability === 'pg_cron' || hostedExtensions.has(capability)) continue;
      addDrift(drifts, {
        surface: 'extensions.capability',
        identity: capability,
        environment,
        expected: 'PRESENT',
        observed: 'ABSENT',
        reason: 'A candidate SQL capability requires a hosted Postgres extension that is absent.',
      });
    }
  }

  if (extensionCapabilities && hostedCronRequired && !hostedPgCronPresent) {
    addDrift(drifts, {
      surface: 'cron.extension',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: 'PRESENT',
      observed: 'ABSENT',
      reason: 'The versioned hosted cron contract requires pg_cron in this environment.',
    });
  }

  if (sqlFingerprint && localObserved?.sql_fingerprint) {
    compareExact(drifts, {
      surface: 'database.sql_fingerprint',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: sha256(stableStringify(localObserved.sql_fingerprint)),
      observed: sha256(stableStringify(sqlFingerprint)),
      reason: 'Hosted SQL surface differs from the clean local candidate fingerprint.',
    });
  } else {
    addDrift(drifts, {
      surface: 'database.sql_fingerprint',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: 'LOCAL_CANDIDATE_FINGERPRINT',
      observed: 'UNAVAILABLE',
      classification: 'INSUFFICIENT_EVIDENCE',
      reason: 'Expected or observed SQL fingerprint is unavailable.',
    });
  }

  if (functions) {
    compareFunctionSets(
      expected.edge_functions,
      functions,
      drifts,
      environment,
      hostedFunctionPolicy,
    );
  }

  if (postgrest) {
    compareExact(drifts, {
      surface: 'data_api.schemas',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: normalizeCsv(hostedConfig.data_api.schemas),
      observed: normalizeCsv(postgrest.db_schema),
      reason: 'Hosted Data API schemas differ from the versioned hosted environment contract.',
    });
    compareExact(drifts, {
      surface: 'data_api.extra_search_path',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: normalizeCsv(hostedConfig.data_api.extra_search_path ?? []),
      observed: normalizeCsv(postgrest.db_extra_search_path),
      reason: 'Hosted Data API search_path differs from the versioned hosted environment contract.',
    });
    compareExact(drifts, {
      surface: 'data_api.max_rows',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: hostedConfig.data_api.max_rows,
      observed: Number(postgrest.max_rows),
      reason: 'Hosted Data API max_rows differs from the versioned hosted environment contract.',
    });
  }

  if (storage) {
    compareExact(drifts, {
      surface: 'storage.file_size_limit',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: hostedConfig.storage.file_size_limit_bytes,
      observed: Number(storage.file_size_limit),
      reason: 'Hosted Storage file size limit differs from the versioned hosted environment contract.',
    });
  }

  if (auth) {
    compareExact(drifts, {
      surface: 'auth.signup_enabled',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: hostedConfig.auth.signup_enabled,
      observed: auth.disable_signup === null ? null : !auth.disable_signup,
      reason: 'Hosted Auth signup policy differs from the versioned hosted environment contract.',
    });
    compareExact(drifts, {
      surface: 'auth.anonymous_sign_ins_enabled',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: hostedConfig.auth.anonymous_sign_ins_enabled,
      observed: auth.external_anonymous_users_enabled,
      reason: 'Hosted anonymous sign-in policy differs from the versioned hosted environment contract.',
    });
    compareExact(drifts, {
      surface: 'auth.jwt_expiry',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: hostedConfig.auth.jwt_expiry,
      observed: Number(auth.jwt_exp),
      reason: 'Hosted JWT expiry differs from the versioned hosted environment contract.',
    });
    compareExact(drifts, {
      surface: 'auth.site_url',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: hostedConfig.auth.site_url,
      observed: auth.site_url,
      reason: 'Hosted Auth site_url differs from the explicit hosted environment contract.',
    });
  }

  if (realtime) {
    const expectedSuspended = hostedEnvironmentContract
      ? hostedConfig.realtime.suspended
      : expected.config.contract.realtime.enabled ? false : null;
    if (expectedSuspended !== null) {
      compareExact(drifts, {
        surface: 'realtime.suspend',
        identity: remoteObserved.identity.project_ref,
        environment,
        expected: expectedSuspended,
        observed: Boolean(realtime.suspend),
        reason: 'Hosted Realtime suspension differs from the versioned hosted environment contract.',
      });
    }
  }

  if (storageBuckets && localObserved?.storage_buckets) {
    compareExact(drifts, {
      surface: 'storage.buckets',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: localObserved.storage_buckets,
      observed: storageBuckets,
      reason: 'Hosted Storage bucket contract differs from the clean local candidate.',
    });
  }

  if (hostedPgCronPresent && cronJobs) {
    const expectedCronJobs = versionedHostedCron
      ?? (localCronApplicable ? localObserved.cron.jobs : null);

    if (!expectedCronJobs) {
      addDrift(drifts, {
        surface: 'cron.jobs.expected_contract',
        identity: remoteObserved.identity.project_ref,
        environment,
        expected: 'VERSIONED_OR_LOCAL_AUTHORITATIVE_CRON_CONTRACT',
        observed: `HOSTED_CRON_JOBS:${cronJobs.length}`,
        classification: 'INSUFFICIENT_EVIDENCE',
        reason: 'Hosted pg_cron is applicable but no authoritative cron contract is available for comparison.',
      });
    } else {
      compareExact(drifts, {
        surface: 'cron.jobs',
        identity: remoteObserved.identity.project_ref,
        environment,
        expected: cronContractRows(expectedCronJobs),
        observed: cronContractRows(cronJobs),
        reason: 'Hosted cron job identities, schedules or active states differ from the authoritative contract.',
      });
    }
  }

  if (secrets) {
    drifts.push(...evaluateEdgeSecretRequirements({
      referencedSecretNames: expected.referenced_secret_names,
      requirements: hostedEnvironmentContract?.edge_environment_requirements
        ?? expected?.hosted_resources?.edge_environment_requirements,
      observedSecretNames: secrets,
      environment,
      identity: remoteObserved.identity.project_ref,
    }));
  }

  const expectedInternalJobSecretKeys = expected?.hosted_resources?.internal_job_secret_keys;
  const observedInternalJobSecretKeys = surfaceValueOrInsufficient(
    drifts,
    surfaces,
    'internal_job_secret_keys',
    environment,
  );

  if (!Array.isArray(expectedInternalJobSecretKeys)) {
    addDrift(drifts, {
      surface: 'internal_job_secrets.expected_contract',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: 'VERSIONED_INTERNAL_JOB_SECRET_KEY_CONTRACT',
      observed: 'MISSING',
      classification: 'INSUFFICIENT_EVIDENCE',
      reason: 'No authoritative configured internal job secret key contract is versioned.',
    });
  } else if (observedInternalJobSecretKeys) {
    compareExact(drifts, {
      surface: 'internal_job_secrets.configured_keys',
      identity: remoteObserved.identity.project_ref,
      environment,
      expected: [...expectedInternalJobSecretKeys].sort((left, right) => left.localeCompare(right, 'en')),
      observed: [...observedInternalJobSecretKeys].sort((left, right) => left.localeCompare(right, 'en')),
      reason: 'Configured internal job secret keys differ from the versioned hosted baseline; values are never compared.',
    });
  }

  return finalize();
}

function parseArgs(argv) {
  const args = {
    mode: String(argv[0] ?? '').trim().toLowerCase(),
    environmentRole: null,
    projectRef: null,
    owner: null,
    scope: 'full',
    allowlist: null,
    output: null,
    strict: false,
  };
  for (let index = 1; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--strict') args.strict = true;
    else if (['--environment-role', '--project-ref', '--owner', '--scope', '--allowlist', '--output'].includes(token)) {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail('ARGUMENT_VALUE_MISSING', token);
      const key = {
        '--environment-role': 'environmentRole',
        '--project-ref': 'projectRef',
        '--owner': 'owner',
        '--scope': 'scope',
        '--allowlist': 'allowlist',
        '--output': 'output',
      }[token];
      args[key] = value;
      index += 1;
    } else {
      fail('ARGUMENT_UNKNOWN', token);
    }
  }
  if (!['expected', 'local', 'remote'].includes(args.mode)) fail('MODE_INVALID', args.mode || 'EMPTY');
  if (!ALLOWED_REMOTE_SCOPES.has(String(args.scope ?? '').toLowerCase())) fail('REMOTE_SCOPE_INVALID', args.scope || 'EMPTY');
  args.scope = String(args.scope).toLowerCase();
  return args;
}

function resolveOutput(root, value) {
  if (!value) return null;
  if (path.isAbsolute(value)) fail('OUTPUT_PATH_MUST_BE_REPOSITORY_RELATIVE');
  const normalized = normalizeRepoPath(value);
  if (!normalized.startsWith(OUTPUT_PREFIX) || normalized.startsWith(`${OUTPUT_PREFIX}../`) || normalized.includes('/../')) {
    fail('OUTPUT_PATH_MUST_BE_DELIVERY', normalized);
  }
  return path.join(root, ...normalized.split('/'));
}

function writeBundle(root, relativeOutput, bundle) {
  const absolute = resolveOutput(root, relativeOutput);
  if (!absolute) return null;
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8');
  return normalizeRepoPath(path.relative(root, absolute));
}

function driftCounts(drifts) {
  const counts = {
    EXPECTED_OVERLAY: 0,
    TEMPORARY_EXCEPTION: 0,
    UNAUTHORIZED_DRIFT: 0,
    INSUFFICIENT_EVIDENCE: 0,
  };
  for (const drift of drifts ?? []) {
    if (Object.hasOwn(counts, drift.classification)) counts[drift.classification] += 1;
  }
  return counts;
}

// Observation, certification and process success are deliberately separate.
// A complete observation can correctly reject an environment. It cannot grant
// deployment permission or replace the strict hosted certification gate.
export function controllerOutcome({ mode, result, strict = false } = {}) {
  const classification = result?.certification;
  const expectedCertification = mode === 'expected'
    ? 'EXPECTED_BASELINE_BUILT'
    : mode === 'local'
      ? 'LOCAL_CERTIFIED'
      : mode === 'remote' && result?.environment_role === 'staging'
        ? 'STAGING_CERTIFIED'
        : mode === 'remote' && result?.environment_role === 'production'
          ? 'PRODUCTION_CERTIFIED'
          : null;
  const drifts = Array.isArray(result?.drifts) ? result.drifts : null;
  const knownClassifications = new Set([
    'UNAUTHORIZED_DRIFT', 'INSUFFICIENT_EVIDENCE',
    'EXPECTED_OVERLAY', 'TEMPORARY_EXCEPTION',
  ]);
  const malformed = !expectedCertification || !drifts
    || (mode === 'remote' && !ALLOWED_REMOTE_SCOPES.has(result?.remote_scope))
    || drifts.some((entry) => !knownClassifications.has(entry?.classification));
  const insufficient = drifts?.some((entry) => entry.classification === 'INSUFFICIENT_EVIDENCE');
  const unauthorized = drifts?.some((entry) => entry.classification === 'UNAUTHORIZED_DRIFT');
  const derivedCertification = insufficient
    ? 'INSUFFICIENT_EVIDENCE'
    : unauthorized ? 'UNAUTHORIZED_DRIFT' : expectedCertification;
  const coherent = !malformed && classification === derivedCertification;
  const certified = coherent && classification === expectedCertification;
  const observationComplete = mode === 'remote' && coherent
    && classification !== 'INSUFFICIENT_EVIDENCE';
  const exitCode = !coherent || (strict && !certified) ? 1 : 0;
  return {
    execution_status: exitCode === 0 ? 'PASS' : 'FAIL',
    observation_status: mode === 'remote'
      ? observationComplete ? 'PASS' : 'FAIL'
      : 'NOT_APPLICABLE',
    environment_certified: mode === 'expected'
      || (mode === 'remote' && result?.remote_scope !== 'full')
      ? 'NOT_APPLICABLE' : certified ? 'YES' : 'NO',
    exit_code: exitCode,
  };
}

export function printControllerResult({ mode, result, output = null, strict = false }) {
  const counts = driftCounts(result?.drifts ?? []);
  const outcome = controllerOutcome({ mode, result, strict });
  console.log(RESULT_START);
  console.log(`ESTADO: ${outcome.execution_status}`);
  console.log(`OBSERVATION_STATUS: ${outcome.observation_status}`);
  console.log(`ENVIRONMENT_CERTIFIED: ${outcome.environment_certified}`);
  console.log('OPERACION: SUPABASE_ENVIRONMENT_DRIFT');
  console.log(`MODE: ${safeAscii(mode).toUpperCase()}`);
  console.log(`ENVIRONMENT_ROLE: ${safeAscii(result?.environment_role ?? 'EXPECTED').toUpperCase()}`);
  console.log(`REMOTE_SCOPE: ${safeAscii(result?.remote_scope ?? 'N/A').toUpperCase()}`);
  console.log(`CANDIDATE_SHA: ${safeAscii(result?.candidate_sha ?? result?.candidate?.commit_sha ?? 'N/A')}`);
  console.log(`EXPECTED_DIGEST: ${safeAscii(result?.expected_digest ?? 'N/A')}`);
  console.log(`OBSERVED_DIGEST: ${safeAscii(result?.observed_digest ?? 'N/A')}`);
  console.log(`DRIFT_TOTAL: ${(result?.drifts ?? []).length}`);
  console.log(`EXPECTED_OVERLAY: ${counts.EXPECTED_OVERLAY}`);
  console.log(`TEMPORARY_EXCEPTION: ${counts.TEMPORARY_EXCEPTION}`);
  console.log(`UNAUTHORIZED_DRIFT: ${counts.UNAUTHORIZED_DRIFT}`);
  console.log(`INSUFFICIENT_EVIDENCE: ${counts.INSUFFICIENT_EVIDENCE}`);
  console.log(`CERTIFICATION: ${safeAscii(result?.certification ?? 'EXPECTED_BASELINE_BUILT')}`);
  for (const [index, drift] of (result?.drifts ?? []).entries()) {
    const position = index + 1;
    const observed = typeof drift?.observed === 'string'
      ? drift.observed
      : stableStringify(drift?.observed ?? null);
    console.log(`DRIFT_${position}_SURFACE: ${safeAscii(drift?.surface ?? 'UNKNOWN')}`);
    console.log(`DRIFT_${position}_IDENTITY: ${safeAscii(drift?.identity ?? 'UNKNOWN')}`);
    console.log(`DRIFT_${position}_CLASSIFICATION: ${safeAscii(drift?.classification ?? 'UNKNOWN')}`);
    console.log(`DRIFT_${position}_OBSERVED: ${safeAscii(observed)}`);
    console.log(`DRIFT_${position}_REASON: ${safeAscii(drift?.reason ?? 'UNKNOWN')}`);
  }
  console.log(`EVIDENCE_FILE: ${safeAscii(output ?? 'NOT_WRITTEN')}`);
  console.log('REMOTE_MUTATIONS: NO');
  console.log('SECRET_VALUES_IN_EVIDENCE: NO');
  console.log('ERROR: NONE');
  console.log(RESULT_END);
  if (outcome.exit_code !== 0) process.exitCode = outcome.exit_code;
}

function printFailure(mode, error) {
  console.log(RESULT_START);
  console.log('ESTADO: FAIL');
  console.log(`OBSERVATION_STATUS: ${mode === 'remote' ? 'FAIL' : 'NOT_APPLICABLE'}`);
  console.log(`ENVIRONMENT_CERTIFIED: ${mode === 'expected' ? 'NOT_APPLICABLE' : 'NO'}`);
  console.log('OPERACION: SUPABASE_ENVIRONMENT_DRIFT');
  console.log(`MODE: ${safeAscii(mode || 'UNKNOWN').toUpperCase()}`);
  console.log(`ERROR: ${safeAscii(error?.message ?? String(error)).replace(/\s+/gu, ' ').trim()}`);
  console.log('REMOTE_MUTATIONS: NO');
  console.log('SECRET_VALUES_IN_EVIDENCE: NO');
  console.log(RESULT_END);
  process.exitCode = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
}

export function validatePackageScripts(packageJson) {
  const scripts = packageJson?.scripts ?? {};
  const expected = {
    'supabase:drift:test': 'node --test scripts/supabase/environment-drift.test.mjs',
    'supabase:drift:expected': 'node scripts/supabase/environment-drift.mjs expected',
    'supabase:drift:local': 'node scripts/supabase/environment-drift.mjs local',
    'supabase:drift:remote': 'node scripts/supabase/environment-drift.mjs remote',
  };
  for (const [name, command] of Object.entries(expected)) {
    if (scripts[name] !== command) fail('PACKAGE_SCRIPT_MISMATCH', name);
  }
  return true;
}

async function main() {
  const root = repoRootFromModule();
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
    validatePackageScripts(JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')));
    const expected = buildExpectedBaseline({ root });
    const allowlist = loadAllowlist(root, args.allowlist);

    if (args.mode === 'expected') {
      const result = {
        ...expected,
        environment_role: 'expected',
        candidate_sha: expected.candidate.commit_sha,
        certification: 'EXPECTED_BASELINE_BUILT',
        drifts: [],
      };
      const output = writeBundle(root, args.output, result);
      printControllerResult({ mode: args.mode, result, output, strict: args.strict });
      return;
    }

    const needsLocalObservation = args.mode === 'local' || (args.mode === 'remote' && args.scope === 'full');
    const localObserved = needsLocalObservation ? observeLocalDatabase({ root, expected }) : null;
    if (args.mode === 'local') {
      const result = {
        ...compareLocal({ expected, observed: localObserved, allowlist }),
        candidate_sha: expected.candidate.commit_sha,
      };
      const bundle = { expected, observed: localObserved, result };
      const output = writeBundle(root, args.output, bundle);
      printControllerResult({ mode: args.mode, result, output, strict: args.strict });
      return;
    }

    const remoteObserved = await observeRemoteEnvironment({
      projectRef: args.projectRef,
      environmentRole: args.environmentRole,
      owner: args.owner,
      scope: args.scope,
      token: process.env.SUPABASE_ACCESS_TOKEN,
    });
    const result = compareRemote({ expected, localObserved, remoteObserved, allowlist, scope: args.scope });
    const bundle = { expected, local_expected_observation: localObserved, observed: remoteObserved, result };
    const output = writeBundle(root, args.output, bundle);
    printControllerResult({ mode: args.mode, result, output, strict: args.strict });
  } catch (error) {
    printFailure(args?.mode ?? process.argv[2] ?? 'UNKNOWN', error);
  }
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) await main();

export const __test = Object.freeze({
  FINGERPRINT_SQL,
  EXTENSION_CAPABILITIES_SQL,
  requiredExtensionCapabilities,
  STORAGE_BUCKETS_SQL,
  CRON_JOBS_SQL,
  MANAGED_SCHEMAS,
  PROCESS_OUTPUT_MAX_BYTES,
  ALLOWED_REMOTE_SCOPES,
});
