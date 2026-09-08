import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  CANONICAL_SHARED_PACKAGES,
  asSha256Identity,
  parseSemver,
  validateReleaseContract,
} from './shared-package-release-gate.mjs';
import {
  spawnUtf8 as qualitySpawnUtf8,
  writePrettyJson as qualityWritePrettyJson,
} from './quality-primitives.mjs';

export const CHANGELOG_GATE_INSTANCE_ID = 'SHELL-CI-004::GLOBAL';
export const CHANGELOG_CONTRACT_SCHEMA_VERSION = 1;
export const CHANGELOG_EVIDENCE_SCHEMA_VERSION = 1;
export const IMPLEMENTATION_FILENAME = 'shared-package-changelog-gate.mjs';
export const IMPLEMENTATION_RELATIVE_PATH = `scripts/quality/${IMPLEMENTATION_FILENAME}`;

const CHANGE_KINDS = Object.freeze(['ADDED', 'CHANGED', 'FIXED', 'DEPRECATED', 'REMOVED', 'SECURITY']);
const CHANGE_KIND_SET = new Set(CHANGE_KINDS);
const SEMVER_IMPACTS = Object.freeze(['NO_RELEASE', 'PATCH', 'MINOR', 'MAJOR']);
const SEMVER_IMPACT_SET = new Set(SEMVER_IMPACTS);
const RELEASE_CHANNEL_TYPES = new Set(['STABLE', 'PRERELEASE']);
const EXECUTION_MODES = new Set(['SYNTHETIC', 'REAL']);
const SECURITY_VISIBILITIES = new Set(['PUBLIC', 'RESTRICTED', 'NOT_APPLICABLE']);
const COMMIT_PATTERN = /^[0-9a-f]{40}$/u;
const SHA256_IDENTITY_PATTERN = /^sha256:[0-9a-f]{64}$/u;
const DEP_PATTERN = /^DEP-(?:CONTRACTS|OS-CONTEXT|SUPABASE|UI-WEB)-[0-9]{3,}$/u;
const PRERELEASE_PATTERN = /^(?:alpha|beta|rc)\.[0-9]+$/u;
const GENERIC_SUMMARIES = new Set(['updates', 'update', 'changes', 'change', 'improvements', 'improvement', 'misc', 'mejoras', 'actualizaciones', 'cambios']);
const SENSITIVE_KEY_PATTERN = /(?:^|[_-])(?:password|secret|token|credential|cookie|api[_-]?key|private[_-]?key)(?:$|[_-])/iu;
const SENSITIVE_TEXT_PATTERNS = Object.freeze([
  /\bgh[pousr]_[A-Za-z0-9_]{24,}\b/u,
  /\bAKIA[0-9A-Z]{16}\b/u,
  /\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/u,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u,
  /\b(?:password|secret|token|api[_-]?key|private[_-]?key)\s*[:=]\s*["']?[^\s"']{8,}/iu,
]);
const SECTION_ORDER = Object.freeze([
  'Breaking changes',
  'Added',
  'Changed',
  'Fixed',
  'Deprecated',
  'Removed',
  'Security',
  'Migration',
]);
const KIND_TO_SECTION = Object.freeze({
  ADDED: 'Added',
  CHANGED: 'Changed',
  FIXED: 'Fixed',
  DEPRECATED: 'Deprecated',
  REMOVED: 'Removed',
  SECURITY: 'Security',
});
const IMPACT_RANK = Object.freeze({ NO_RELEASE: 0, PATCH: 1, MINOR: 2, MAJOR: 3 });
const CHANGELOG_CONTRACT_IDENTITY = asSha256Identity([
  'SHELL-CI-004::GLOBAL',
  'schema=1',
  'source=STRUCTURED_CHANGESET',
  'sections=Breaking changes,Added,Changed,Fixed,Deprecated,Removed,Security,Migration',
  'encoding=UTF-8',
  'eol=LF',
  'identity=sha256',
  'history=immutable-after-release',
].join(';'));

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function unique(values) {
  return [...new Set(values)];
}

function compareText(left, right) {
  const a = String(left);
  const b = String(right);
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function normalizeText(value) {
  return String(value ?? '').replace(/\r\n?/gu, '\n').trim();
}

function canonicalize(value) {
  if (typeof value === 'string') return value.replace(/\r\n?/gu, '\n');
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isPlainObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort(compareText)
      .map((key) => [key, canonicalize(value[key])]),
  );
}

export function stableCanonicalStringify(value) {
  return JSON.stringify(canonicalize(value));
}

export function normalizeLf(value) {
  return String(value ?? '').replace(/\r\n?/gu, '\n');
}

function identity(value) {
  return asSha256Identity(Buffer.isBuffer(value) ? value : String(value));
}

function sha256IdentityOfCanonical(value) {
  return identity(stableCanonicalStringify(value));
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function implementationIdentity() {
  return identity(fs.readFileSync(fileURLToPath(import.meta.url)));
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return unique(value.map(normalizeText).filter(nonEmptyString)).sort(compareText);
}

function normalizedRecord(record) {
  return {
    change_record_id: normalizeText(record?.change_record_id),
    package_name: normalizeText(record?.package_name),
    change_kind: normalizeText(record?.change_kind).toUpperCase(),
    summary: normalizeText(record?.summary),
    semver_impact: normalizeText(record?.semver_impact).toUpperCase(),
    public_surfaces: normalizeStringArray(record?.public_surfaces),
    source_refs: normalizeStringArray(record?.source_refs),
    breaking_change: record?.breaking_change === true,
    migration_required: record?.migration_required === true,
    migration_reference: nonEmptyString(record?.migration_reference) ? normalizeText(record.migration_reference) : null,
    deprecation_ids: normalizeStringArray(record?.deprecation_ids),
    security_visibility: normalizeText(record?.security_visibility || 'NOT_APPLICABLE').toUpperCase(),
    treq_refs: normalizeStringArray(record?.treq_refs),
    internal_change_reason: nonEmptyString(record?.internal_change_reason) ? normalizeText(record.internal_change_reason) : null,
  };
}

function normalizedRecords(records) {
  return (Array.isArray(records) ? records : [])
    .map(normalizedRecord)
    .sort((left, right) => {
      const section = compareText(KIND_TO_SECTION[left.change_kind] ?? left.change_kind, KIND_TO_SECTION[right.change_kind] ?? right.change_kind);
      return section || compareText(left.change_record_id, right.change_record_id);
    });
}

function semanticRecordFingerprint(record) {
  return sha256IdentityOfCanonical({
    package_name: record.package_name,
    change_kind: record.change_kind,
    summary: record.summary,
    semver_impact: record.semver_impact,
    public_surfaces: record.public_surfaces,
    source_refs: record.source_refs,
    breaking_change: record.breaking_change,
    migration_required: record.migration_required,
    migration_reference: record.migration_reference,
    deprecation_ids: record.deprecation_ids,
    security_visibility: record.security_visibility,
    internal_change_reason: record.internal_change_reason,
  });
}

function sensitiveFindings(value, pointer = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((child, index) => sensitiveFindings(child, `${pointer}[${index}]`, findings));
    return findings;
  }
  if (isPlainObject(value)) {
    for (const [key, child] of Object.entries(value)) {
      const childPointer = `${pointer}.${key}`;
      if (SENSITIVE_KEY_PATTERN.test(key) && child !== null && child !== undefined && String(child).length > 0) {
        findings.push(childPointer);
      }
      sensitiveFindings(child, childPointer, findings);
    }
    return findings;
  }
  if (typeof value === 'string' && SENSITIVE_TEXT_PATTERNS.some((pattern) => pattern.test(value))) findings.push(pointer);
  return findings;
}

function validateIdentity(value, code) {
  return SHA256_IDENTITY_PATTERN.test(String(value ?? '')) ? [] : [code];
}

function validateBase(contract) {
  const errors = [];
  const hasVersion = nonEmptyString(contract?.base_release_version);
  const hasPackage = nonEmptyString(contract?.base_release_package_name);
  const hasIdentity = nonEmptyString(contract?.base_release_identity);
  const hasArtifact = nonEmptyString(contract?.base_artifact_content_identity);
  if (!hasVersion) {
    if (contract?.base_release_version !== null) errors.push('BASE_RELEASE_VERSION_INVALID');
    if (contract?.base_release_package_name !== null) errors.push('BASE_RELEASE_PACKAGE_MUST_BE_NULL');
    if (contract?.base_release_identity !== null) errors.push('BASE_RELEASE_IDENTITY_MUST_BE_NULL');
    if (contract?.base_artifact_content_identity !== null) errors.push('BASE_ARTIFACT_IDENTITY_MUST_BE_NULL');
    return errors;
  }
  if (!parseSemver(contract.base_release_version)) errors.push('BASE_RELEASE_VERSION_INVALID');
  if (!hasPackage || contract.base_release_package_name !== contract.package_name) errors.push('BASE_RELEASE_PACKAGE_MISMATCH');
  if (!hasIdentity) errors.push('BASE_RELEASE_IDENTITY_MISSING');
  else errors.push(...validateIdentity(contract.base_release_identity, 'BASE_RELEASE_IDENTITY_INVALID'));
  if (!hasArtifact) errors.push('BASE_ARTIFACT_IDENTITY_MISSING');
  else errors.push(...validateIdentity(contract.base_artifact_content_identity, 'BASE_ARTIFACT_IDENTITY_INVALID'));
  return errors;
}

function validateRecord(record, contract) {
  const errors = [];
  if (!nonEmptyString(record.change_record_id)) errors.push('CHANGE_RECORD_ID_MISSING');
  if (record.package_name !== contract.package_name) errors.push(`CHANGE_RECORD_PACKAGE_MISMATCH:${record.change_record_id || 'UNKNOWN'}`);
  if (!CHANGE_KIND_SET.has(record.change_kind)) errors.push(`CHANGE_KIND_INVALID:${record.change_record_id || 'UNKNOWN'}`);
  if (!nonEmptyString(record.summary) || GENERIC_SUMMARIES.has(record.summary.toLocaleLowerCase('en'))) {
    errors.push(`CHANGE_SUMMARY_INSUFFICIENT:${record.change_record_id || 'UNKNOWN'}`);
  }
  if (!SEMVER_IMPACT_SET.has(record.semver_impact)) errors.push(`SEMVER_IMPACT_INVALID:${record.change_record_id || 'UNKNOWN'}`);
  if (!Array.isArray(record.public_surfaces)) errors.push(`PUBLIC_SURFACES_INVALID:${record.change_record_id || 'UNKNOWN'}`);
  if (!Array.isArray(record.source_refs) || record.source_refs.length === 0) errors.push(`SOURCE_REFS_MISSING:${record.change_record_id || 'UNKNOWN'}`);
  if (!SECURITY_VISIBILITIES.has(record.security_visibility)) errors.push(`SECURITY_VISIBILITY_INVALID:${record.change_record_id || 'UNKNOWN'}`);
  if (record.change_kind === 'SECURITY' && record.security_visibility === 'NOT_APPLICABLE') {
    errors.push(`SECURITY_VISIBILITY_REQUIRED:${record.change_record_id || 'UNKNOWN'}`);
  }
  if (record.change_kind !== 'SECURITY' && record.security_visibility !== 'NOT_APPLICABLE') {
    errors.push(`SECURITY_VISIBILITY_UNEXPECTED:${record.change_record_id || 'UNKNOWN'}`);
  }
  if (record.semver_impact !== 'NO_RELEASE' && record.public_surfaces.length === 0 && !nonEmptyString(record.internal_change_reason)) {
    errors.push(`PUBLIC_SURFACE_OR_INTERNAL_REASON_REQUIRED:${record.change_record_id || 'UNKNOWN'}`);
  }
  if (record.breaking_change) {
    if (record.semver_impact !== 'MAJOR') errors.push(`BREAKING_CHANGE_REQUIRES_MAJOR:${record.change_record_id || 'UNKNOWN'}`);
    if (!record.migration_required) errors.push(`BREAKING_CHANGE_REQUIRES_MIGRATION:${record.change_record_id || 'UNKNOWN'}`);
  }
  if (record.migration_required && !nonEmptyString(record.migration_reference)) {
    errors.push(`MIGRATION_REFERENCE_REQUIRED:${record.change_record_id || 'UNKNOWN'}`);
  }
  if (!record.migration_required && record.migration_reference !== null) {
    errors.push(`MIGRATION_REFERENCE_UNEXPECTED:${record.change_record_id || 'UNKNOWN'}`);
  }
  if (record.change_kind === 'DEPRECATED') {
    if (!['MINOR', 'MAJOR'].includes(record.semver_impact)) errors.push(`DEPRECATION_REQUIRES_MINOR_OR_MAJOR:${record.change_record_id || 'UNKNOWN'}`);
    if (record.deprecation_ids.length === 0) errors.push(`DEPRECATION_ID_REQUIRED:${record.change_record_id || 'UNKNOWN'}`);
    if (!record.migration_required || !nonEmptyString(record.migration_reference)) errors.push(`DEPRECATION_MIGRATION_REQUIRED:${record.change_record_id || 'UNKNOWN'}`);
  }
  if (record.change_kind === 'REMOVED') {
    if (record.semver_impact !== 'MAJOR') errors.push(`REMOVAL_REQUIRES_MAJOR:${record.change_record_id || 'UNKNOWN'}`);
    if (record.deprecation_ids.length === 0) errors.push(`REMOVAL_DEPRECATION_ID_REQUIRED:${record.change_record_id || 'UNKNOWN'}`);
  }
  for (const depId of record.deprecation_ids) {
    if (!DEP_PATTERN.test(depId)) errors.push(`DEPRECATION_ID_INVALID:${depId}`);
  }
  if (record.semver_impact === 'NO_RELEASE' && (record.breaking_change || record.migration_required || record.change_kind === 'DEPRECATED' || record.change_kind === 'REMOVED')) {
    errors.push(`NO_RELEASE_CONTRADICTS_PUBLIC_OBLIGATION:${record.change_record_id || 'UNKNOWN'}`);
  }
  return errors;
}

function highestImpact(records) {
  return records.reduce((highest, record) => (
    IMPACT_RANK[record.semver_impact] > IMPACT_RANK[highest] ? record.semver_impact : highest
  ), 'NO_RELEASE');
}

function expectedCoreVersion(baseVersion, impact) {
  const base = parseSemver(baseVersion);
  if (!base) return null;
  if (impact === 'PATCH') return `${base.major}.${base.minor}.${base.patch + 1}`;
  if (impact === 'MINOR') return `${base.major}.${base.minor + 1}.0`;
  if (impact === 'MAJOR') return `${base.major + 1}.0.0`;
  return `${base.major}.${base.minor}.${base.patch}`;
}

function semverCore(version) {
  const parsed = parseSemver(version);
  return parsed ? `${parsed.major}.${parsed.minor}.${parsed.patch}` : null;
}

function validateSemverCoherence(contract, records) {
  const errors = [];
  const parsed = parseSemver(contract.release_version);
  if (!parsed) return ['RELEASE_VERSION_INVALID'];
  if (parsed.build) errors.push('BUILD_METADATA_NOT_CANONICAL');
  if (contract.release_channel_type === 'STABLE' && parsed.prerelease) errors.push('STABLE_RELEASE_HAS_PRERELEASE');
  if (contract.release_channel_type === 'PRERELEASE') {
    if (!parsed.prerelease || !PRERELEASE_PATTERN.test(parsed.prerelease)) errors.push('PRERELEASE_CHANNEL_INVALID');
  }
  const impact = highestImpact(records.filter((record) => record.semver_impact !== 'NO_RELEASE'));
  if (contract.distribution_change === false) {
    if (impact !== 'NO_RELEASE') errors.push('NO_RELEASE_HAS_DISTRIBUTABLE_IMPACT');
    if (contract.base_release_version && semverCore(contract.release_version) !== semverCore(contract.base_release_version)) {
      errors.push('NO_RELEASE_VERSION_CHANGED');
    }
    return errors;
  }
  if (impact === 'NO_RELEASE') return ['DISTRIBUTION_CHANGE_WITHOUT_SEMVER_IMPACT'];
  if (contract.base_release_version === null) {
    if (semverCore(contract.release_version) !== '1.0.0') errors.push('FIRST_RELEASE_CORE_MUST_BE_1_0_0');
    return errors;
  }
  const expected = expectedCoreVersion(contract.base_release_version, impact);
  if (semverCore(contract.release_version) !== expected) {
    errors.push(`RELEASE_VERSION_DOES_NOT_MATCH_IMPACT:${impact}:expected=${expected}`);
  }
  return errors;
}

export function validateChangelogContract(contract, { manifestSource, manifest, duplicateImplementations = [] } = {}) {
  const errors = [];
  if (!isPlainObject(contract)) return ['CONTRACT_NOT_OBJECT'];
  if (contract.schema_version !== CHANGELOG_CONTRACT_SCHEMA_VERSION) errors.push('CONTRACT_SCHEMA_VERSION_UNSUPPORTED');
  if (contract.semantic_source !== 'STRUCTURED_CHANGESET') errors.push('STRUCTURED_CHANGESET_REQUIRED');
  if (!CANONICAL_SHARED_PACKAGES.includes(contract.package_name)) errors.push('PACKAGE_NOT_CANONICAL');
  const releaseSemver = parseSemver(contract.release_version);
  if (!releaseSemver) errors.push('RELEASE_VERSION_INVALID');
  if (!COMMIT_PATTERN.test(String(contract.source_commit ?? ''))) errors.push('SOURCE_COMMIT_INVALID');
  if (!RELEASE_CHANNEL_TYPES.has(contract.release_channel_type)) errors.push('RELEASE_CHANNEL_TYPE_INVALID');
  if (!EXECUTION_MODES.has(contract.execution_mode)) errors.push('EXECUTION_MODE_INVALID');
  if (typeof contract.distribution_change !== 'boolean') errors.push('DISTRIBUTION_CHANGE_INVALID');
  errors.push(...validateIdentity(contract.artifact_content_identity, 'ARTIFACT_CONTENT_IDENTITY_INVALID'));
  errors.push(...validateBase(contract));
  if (!Array.isArray(contract.distributable_change_ids)) errors.push('DISTRIBUTABLE_CHANGE_IDS_INVALID');
  if (!Array.isArray(contract.change_records)) errors.push('CHANGE_RECORDS_INVALID');
  if (manifest) {
    if (manifest.name !== contract.package_name) errors.push('MANIFEST_PACKAGE_MISMATCH');
    if (manifest.version !== contract.release_version) errors.push('MANIFEST_VERSION_MISMATCH');
  }
  if (typeof manifestSource === 'string') {
    const expectedManifestIdentity = identity(normalizeLf(manifestSource));
    if (contract.package_manifest_identity !== expectedManifestIdentity) errors.push('PACKAGE_MANIFEST_IDENTITY_MISMATCH');
  } else if (!SHA256_IDENTITY_PATTERN.test(String(contract.package_manifest_identity ?? ''))) {
    errors.push('PACKAGE_MANIFEST_IDENTITY_INVALID');
  }
  if (duplicateImplementations.length > 0) errors.push(`DUPLICATE_GATE_IMPLEMENTATION:${duplicateImplementations.join(',')}`);

  const records = normalizedRecords(contract.change_records);
  const ids = records.map((record) => record.change_record_id);
  if (new Set(ids).size !== ids.length) errors.push('CHANGE_RECORD_ID_DUPLICATED');
  const fingerprints = records.map(semanticRecordFingerprint);
  if (new Set(fingerprints).size !== fingerprints.length) errors.push('SEMANTIC_CHANGE_RECORD_DUPLICATED');
  for (const record of records) errors.push(...validateRecord(record, contract));

  const distributableIds = records
    .filter((record) => record.semver_impact !== 'NO_RELEASE')
    .map((record) => record.change_record_id)
    .sort(compareText);
  const declaredIds = normalizeStringArray(contract.distributable_change_ids);
  if (stableCanonicalStringify(distributableIds) !== stableCanonicalStringify(declaredIds)) {
    errors.push('DISTRIBUTABLE_CHANGE_COVERAGE_MISMATCH');
  }
  if (contract.distribution_change === true && distributableIds.length === 0) errors.push('DISTRIBUTION_CHANGE_REQUIRES_RECORDS');
  if (contract.distribution_change === false && distributableIds.length > 0) errors.push('NO_RELEASE_HAS_DISTRIBUTABLE_RECORDS');
  if (contract.base_release_version !== null) {
    const artifactChanged = contract.artifact_content_identity !== contract.base_artifact_content_identity;
    if (contract.distribution_change === true && !artifactChanged) errors.push('DISTRIBUTION_CHANGE_WITH_IDENTICAL_ARTIFACT');
    if (contract.distribution_change === false && artifactChanged) errors.push('NO_RELEASE_WITH_CHANGED_ARTIFACT');
  }
  errors.push(...validateSemverCoherence(contract, records));

  const sensitive = sensitiveFindings(contract);
  if (sensitive.length > 0) errors.push(`SENSITIVE_CONTENT_DETECTED:${unique(sensitive).sort(compareText).join(',')}`);
  return unique(errors);
}

function renderRecord(record, section) {
  let summary = record.summary;
  if (section === 'Security' && record.security_visibility === 'RESTRICTED') summary = `${summary} (technical details restricted)`;
  const deps = record.deprecation_ids.length > 0 ? ` (${record.deprecation_ids.join(', ')})` : '';
  if (section === 'Migration') return `- ${summary} - Migration: ${record.migration_reference} [${record.change_record_id}]`;
  return `- ${summary}${deps} [${record.change_record_id}]`;
}

function recordsForSection(records, section) {
  if (section === 'Breaking changes') return records.filter((record) => record.breaking_change);
  if (section === 'Migration') return records.filter((record) => record.migration_required);
  const kind = Object.entries(KIND_TO_SECTION).find(([, candidate]) => candidate === section)?.[0];
  return records.filter((record) => record.change_kind === kind);
}

export function renderChangelogEntry(packageName, version, records) {
  const normalized = normalizedRecords(records);
  const lines = [`## ${version}`];
  for (const section of SECTION_ORDER) {
    const selected = recordsForSection(normalized, section);
    if (selected.length === 0) continue;
    lines.push('', `### ${section}`);
    for (const record of selected) lines.push(renderRecord(record, section));
  }
  return `${lines.join('\n')}\n`;
}

export function renderReleaseNotes(packageName, version, releaseChannelType, records) {
  const entry = renderChangelogEntry(packageName, version, records);
  const body = entry.replace(/^## [^\n]+\n/u, '').replace(/^\n/u, '');
  const lines = [`# ${packageName} ${version}`];
  if (releaseChannelType === 'PRERELEASE') lines.push('', '> Prerelease: this version is not a stable API release.');
  if (body.trim()) lines.push('', body.trimEnd());
  return `${lines.join('\n')}\n`;
}

function materialIdentityPayload(prepared) {
  return {
    package_name: prepared.package_name,
    release_version: prepared.release_version,
    source_commit: prepared.source_commit,
    package_manifest_identity: prepared.package_manifest_identity,
    base_release_version: prepared.base_release_version,
    base_release_identity: prepared.base_release_identity,
    artifact_content_identity: prepared.artifact_content_identity,
    change_set_identity: prepared.change_set_identity,
    rendered_changelog_entry_identity: prepared.rendered_changelog_entry_identity,
    release_notes_identity: prepared.release_notes_identity,
    changelog_contract_identity: prepared.changelog_contract_identity,
  };
}

export function prepareChangelog({ manifestSource, manifest, contract, duplicateImplementations = [] }) {
  const reasons = validateChangelogContract(contract, { manifestSource, manifest, duplicateImplementations });
  const records = normalizedRecords(contract?.change_records);
  if (reasons.length > 0) return { outcome: 'BLOCKED', reasons, prepared: null };
  if (contract.distribution_change === false) {
    return {
      outcome: 'NOT_APPLICABLE',
      reasons: ['NO_DISTRIBUTABLE_CHANGE'],
      prepared: {
        package_name: contract.package_name,
        release_version: contract.release_version,
        source_commit: contract.source_commit,
        distribution_change: false,
        change_set_identity: sha256IdentityOfCanonical(records),
        changelog_contract_identity: CHANGELOG_CONTRACT_IDENTITY,
      },
    };
  }
  const renderedChangelogEntry = renderChangelogEntry(contract.package_name, contract.release_version, records);
  const releaseNotes = renderReleaseNotes(contract.package_name, contract.release_version, contract.release_channel_type, records);
  const prepared = {
    schema_version: CHANGELOG_CONTRACT_SCHEMA_VERSION,
    gate_instance: CHANGELOG_GATE_INSTANCE_ID,
    package_name: contract.package_name,
    release_version: contract.release_version,
    source_commit: contract.source_commit,
    package_manifest_identity: contract.package_manifest_identity,
    base_release_package_name: contract.base_release_package_name,
    base_release_version: contract.base_release_version,
    base_release_identity: contract.base_release_identity,
    base_artifact_content_identity: contract.base_artifact_content_identity,
    artifact_content_identity: contract.artifact_content_identity,
    distribution_change: true,
    release_channel_type: contract.release_channel_type,
    execution_mode: contract.execution_mode,
    change_records: records,
    distributable_change_ids: normalizeStringArray(contract.distributable_change_ids),
    change_set_identity: sha256IdentityOfCanonical(records),
    changelog_contract_identity: CHANGELOG_CONTRACT_IDENTITY,
    rendered_changelog_entry: renderedChangelogEntry,
    rendered_changelog_entry_identity: identity(renderedChangelogEntry),
    release_notes: releaseNotes,
    release_notes_identity: identity(releaseNotes),
  };
  prepared.changelog_identity = sha256IdentityOfCanonical(materialIdentityPayload(prepared));
  return { outcome: 'PASS', reasons: [], prepared };
}

export function validatePreparedMaterial(prepared) {
  const errors = [];
  if (!isPlainObject(prepared)) return ['PREPARED_NOT_OBJECT'];
  if (prepared.schema_version !== CHANGELOG_CONTRACT_SCHEMA_VERSION) errors.push('PREPARED_SCHEMA_VERSION_INVALID');
  if (prepared.gate_instance !== CHANGELOG_GATE_INSTANCE_ID) errors.push('PREPARED_GATE_INSTANCE_INVALID');
  if (!CANONICAL_SHARED_PACKAGES.includes(prepared.package_name)) errors.push('PREPARED_PACKAGE_INVALID');
  if (!parseSemver(prepared.release_version)) errors.push('PREPARED_VERSION_INVALID');
  if (!COMMIT_PATTERN.test(String(prepared.source_commit ?? ''))) errors.push('PREPARED_COMMIT_INVALID');
  if (prepared.changelog_contract_identity !== CHANGELOG_CONTRACT_IDENTITY) errors.push('CHANGELOG_CONTRACT_IDENTITY_CHANGED');
  const normalized = normalizedRecords(prepared.change_records);
  if (prepared.change_set_identity !== sha256IdentityOfCanonical(normalized)) errors.push('CHANGE_SET_IDENTITY_MISMATCH');
  const expectedEntry = renderChangelogEntry(prepared.package_name, prepared.release_version, normalized);
  const expectedNotes = renderReleaseNotes(prepared.package_name, prepared.release_version, prepared.release_channel_type, normalized);
  if (prepared.rendered_changelog_entry !== expectedEntry) errors.push('RENDERED_CHANGELOG_ENTRY_MISMATCH');
  if (prepared.rendered_changelog_entry_identity !== identity(expectedEntry)) errors.push('RENDERED_CHANGELOG_ENTRY_IDENTITY_MISMATCH');
  if (prepared.release_notes !== expectedNotes) errors.push('RELEASE_NOTES_MISMATCH');
  if (prepared.release_notes_identity !== identity(expectedNotes)) errors.push('RELEASE_NOTES_IDENTITY_MISMATCH');
  const expectedChangelogIdentity = sha256IdentityOfCanonical(materialIdentityPayload({
    ...prepared,
    change_set_identity: sha256IdentityOfCanonical(normalized),
    rendered_changelog_entry_identity: identity(expectedEntry),
    release_notes_identity: identity(expectedNotes),
  }));
  if (prepared.changelog_identity !== expectedChangelogIdentity) errors.push('CHANGELOG_IDENTITY_MISMATCH');
  return unique(errors);
}

export function releaseContractChangelogFields(prepared) {
  const errors = validatePreparedMaterial(prepared);
  if (errors.length > 0) throw new Error(`Prepared changelog is invalid: ${errors.join(',')}`);
  return {
    changelog_required: true,
    changelog_identity: prepared.changelog_identity,
  };
}

function validateCi003FinalizationInputs({ prepared, releaseContractSource, releaseContract, releaseEvidence, manifest }) {
  const errors = validatePreparedMaterial(prepared);
  if (!isPlainObject(releaseContract)) errors.push('RELEASE_CONTRACT_NOT_OBJECT');
  else {
    errors.push(...validateReleaseContract(releaseContract, { manifest }));
    if (releaseContract.package_name !== prepared.package_name) errors.push('RELEASE_CONTRACT_PACKAGE_MISMATCH');
    if (releaseContract.release_version !== prepared.release_version) errors.push('RELEASE_CONTRACT_VERSION_MISMATCH');
    if (releaseContract.source_commit !== prepared.source_commit) errors.push('RELEASE_CONTRACT_COMMIT_MISMATCH');
    if (releaseContract.changelog_required !== true) errors.push('RELEASE_CONTRACT_CHANGELOG_NOT_REQUIRED');
    if (releaseContract.changelog_identity !== prepared.changelog_identity) errors.push('RELEASE_CONTRACT_CHANGELOG_IDENTITY_MISMATCH');
  }
  if (!isPlainObject(releaseEvidence)) errors.push('CI003_EVIDENCE_NOT_OBJECT');
  else {
    if (releaseEvidence.gate_instance !== 'SHELL-CI-003::GLOBAL') errors.push('CI003_EVIDENCE_GATE_INVALID');
    if (releaseEvidence.release_status !== 'PASS') errors.push('CI003_EVIDENCE_NOT_PASS');
    if (releaseEvidence.invalidation_reason) errors.push('CI003_EVIDENCE_STALE');
    if (releaseEvidence.package_name !== prepared.package_name) errors.push('CI003_EVIDENCE_PACKAGE_MISMATCH');
    if (releaseEvidence.release_version !== prepared.release_version) errors.push('CI003_EVIDENCE_VERSION_MISMATCH');
    if (releaseEvidence.source_commit !== prepared.source_commit) errors.push('CI003_EVIDENCE_COMMIT_MISMATCH');
    if (!nonEmptyString(releaseContractSource)) errors.push('RELEASE_CONTRACT_SOURCE_MISSING');
    else if (releaseEvidence.release_contract_identity !== identity(releaseContractSource)) errors.push('CI003_RELEASE_CONTRACT_IDENTITY_MISMATCH');
  }
  if (!isPlainObject(manifest)) errors.push('MANIFEST_NOT_OBJECT');
  else {
    if (manifest.name !== prepared.package_name) errors.push('FINALIZE_MANIFEST_PACKAGE_MISMATCH');
    if (manifest.version !== prepared.release_version) errors.push('FINALIZE_MANIFEST_VERSION_MISMATCH');
  }
  return unique(errors);
}

function changelogHeader(packageName) {
  return `# Changelog \u2014 ${packageName}`;
}

function versionEntryRange(history, version) {
  const normalized = normalizeLf(history);
  const pattern = new RegExp(`^## ${escapeRegex(version)}\\s*$`, 'mu');
  const match = pattern.exec(normalized);
  if (!match || match.index === undefined) return null;
  const start = match.index;
  const remainder = normalized.slice(start + match[0].length);
  const nextMatch = /^##\s+\S.*$/mu.exec(remainder);
  const end = nextMatch && nextMatch.index !== undefined
    ? start + match[0].length + nextMatch.index
    : normalized.length;
  return { start, end };
}

function normalizeHistoryForComparison(value) {
  return `${normalizeLf(value).trimEnd()}\n`;
}

export function mergeChangelogHistory({ packageName, version, entry, historySource }) {
  const expectedHeader = changelogHeader(packageName);
  const normalizedEntry = normalizeHistoryForComparison(entry);
  const existing = normalizeLf(historySource ?? '');
  if (!existing.trim()) return { outcome: 'PASS', idempotent: false, history: `${expectedHeader}\n\n${normalizedEntry}` };
  const firstLine = existing.split('\n')[0].trim();
  if (firstLine !== expectedHeader) return { outcome: 'BLOCKED', reasons: ['HISTORY_PACKAGE_HEADER_MISMATCH'], history: null };
  const range = versionEntryRange(existing, version);
  if (range) {
    const currentEntry = normalizeHistoryForComparison(existing.slice(range.start, range.end));
    if (currentEntry === normalizedEntry) return { outcome: 'PASS', idempotent: true, history: normalizeHistoryForComparison(existing) };
    return { outcome: 'BLOCKED', reasons: ['HISTORY_VERSION_CONTENT_CONFLICT'], history: null };
  }
  const afterHeader = existing.slice(existing.indexOf('\n') + 1).replace(/^\n*/u, '').trimEnd();
  const next = afterHeader
    ? `${expectedHeader}\n\n${normalizedEntry}\n${afterHeader}\n`
    : `${expectedHeader}\n\n${normalizedEntry}`;
  return { outcome: 'PASS', idempotent: false, history: next };
}

export function finalizeChangelog({ prepared, releaseContractSource, releaseContract, releaseEvidence, manifest, historySource }) {
  const reasons = validateCi003FinalizationInputs({ prepared, releaseContractSource, releaseContract, releaseEvidence, manifest });
  if (reasons.length > 0) return { outcome: 'BLOCKED', reasons, idempotent: false, history: null };
  const merged = mergeChangelogHistory({
    packageName: prepared.package_name,
    version: prepared.release_version,
    entry: prepared.rendered_changelog_entry,
    historySource,
  });
  if (merged.outcome !== 'PASS') return { ...merged, prepared };
  return {
    outcome: 'PASS',
    reasons: [],
    idempotent: merged.idempotent,
    history: merged.history,
    history_identity: identity(merged.history),
    prepared,
  };
}

export function planCoordinatedChangelogs(results) {
  const errors = [];
  const selected = [];
  for (const result of Array.isArray(results) ? results : []) {
    if (result?.outcome === 'NOT_APPLICABLE') continue;
    if (result?.outcome !== 'PASS' || !result?.prepared) {
      errors.push('COORDINATED_MEMBER_NOT_PASS');
      continue;
    }
    selected.push({
      package_name: result.prepared.package_name,
      release_version: result.prepared.release_version,
      changelog_identity: result.prepared.changelog_identity,
    });
  }
  const packages = selected.map((entry) => entry.package_name);
  if (new Set(packages).size !== packages.length) errors.push('COORDINATED_PACKAGE_DUPLICATED');
  return {
    outcome: errors.length > 0 ? 'BLOCKED' : 'PASS',
    reasons: unique(errors),
    releases: selected.sort((left, right) => compareText(left.package_name, right.package_name)),
  };
}

function sanitizeObject(value) {
  if (Array.isArray(value)) return value.map(sanitizeObject);
  if (!isPlainObject(value)) return value;
  const result = {};
  for (const [key, child] of Object.entries(value)) {
    result[key] = SENSITIVE_KEY_PATTERN.test(key) ? '[REDACTED]' : sanitizeObject(child);
  }
  return result;
}

function packageSlug(packageName) {
  if (!CANONICAL_SHARED_PACKAGES.includes(packageName)) throw new Error(`Unknown canonical package: ${packageName}`);
  return packageName.slice(1).replaceAll('/', '__');
}

function writeTextAtomic(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${crypto.randomUUID()}.tmp`;
  fs.writeFileSync(tempPath, normalizeHistoryForComparison(value), 'utf8');
  fs.renameSync(tempPath, filePath);
}

function evidenceDirectory(evidenceRoot, packageName, version) {
  return path.join(evidenceRoot, packageSlug(packageName), version);
}

function writeEvidence(evidenceRoot, evidence) {
  const directory = evidenceDirectory(evidenceRoot, evidence.package_name, evidence.release_version);
  const filePath = path.join(
    directory,
    `${evidence.changelog_run_identity}-${evidence.phase.toLowerCase()}.json`,
  );
  return qualityWritePrettyJson(filePath, sanitizeObject(evidence));
}

function run(command, args, options = {}) {
  return qualitySpawnUtf8(command, args, options);
}

function resolveRepositoryRoot(startPath) {
  const result = run('git', ['rev-parse', '--show-toplevel'], { cwd: startPath });
  if (result.error || result.status !== 0 || !result.stdout.trim()) throw new Error('Cannot resolve Git repository root.');
  return path.resolve(result.stdout.trim());
}

function walkForFilename(directory, filename, results) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.delivery') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walkForFilename(absolute, filename, results);
    else if (entry.isFile() && entry.name === filename) results.push(absolute);
  }
}

export function findDuplicateChangelogGateImplementations(repositoryRoot) {
  const results = [];
  walkForFilename(path.join(repositoryRoot, 'packages'), IMPLEMENTATION_FILENAME, results);
  return results.map((filePath) => path.relative(repositoryRoot, filePath).replaceAll('\\', '/')).sort(compareText);
}

function readJson(filePath, label) {
  let source;
  try {
    source = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Cannot read ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
  try {
    return { source, value: JSON.parse(source) };
  } catch (error) {
    throw new Error(`Invalid JSON in ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function createPrepareEvidence(result, startedAt, completedAt) {
  const prepared = result.prepared;
  return sanitizeObject({
    schema_version: CHANGELOG_EVIDENCE_SCHEMA_VERSION,
    gate_instance: CHANGELOG_GATE_INSTANCE_ID,
    changelog_run_identity: crypto.randomUUID(),
    phase: 'PREPARE',
    started_at: startedAt,
    completed_at: completedAt,
    status: result.outcome,
    reasons: result.reasons,
    package_name: prepared?.package_name ?? null,
    release_version: prepared?.release_version ?? null,
    source_commit: prepared?.source_commit ?? null,
    base_release_identity: prepared?.base_release_identity ?? null,
    change_set_identity: prepared?.change_set_identity ?? null,
    rendered_changelog_entry_identity: prepared?.rendered_changelog_entry_identity ?? null,
    release_notes_identity: prepared?.release_notes_identity ?? null,
    changelog_identity: prepared?.changelog_identity ?? null,
    changelog_contract_identity: prepared?.changelog_contract_identity ?? CHANGELOG_CONTRACT_IDENTITY,
    gate_implementation_identity: implementationIdentity(),
    invalidation_reason: null,
    prepared,
  });
}

function createFinalizeEvidence(result, releaseEvidence, startedAt, completedAt) {
  const prepared = result.prepared;
  return sanitizeObject({
    schema_version: CHANGELOG_EVIDENCE_SCHEMA_VERSION,
    gate_instance: CHANGELOG_GATE_INSTANCE_ID,
    changelog_run_identity: crypto.randomUUID(),
    phase: 'FINALIZE',
    started_at: startedAt,
    completed_at: completedAt,
    status: result.outcome,
    reasons: result.reasons,
    package_name: prepared?.package_name ?? releaseEvidence?.package_name ?? null,
    release_version: prepared?.release_version ?? releaseEvidence?.release_version ?? null,
    source_commit: prepared?.source_commit ?? releaseEvidence?.source_commit ?? null,
    base_release_identity: prepared?.base_release_identity ?? null,
    change_set_identity: prepared?.change_set_identity ?? null,
    rendered_changelog_entry_identity: prepared?.rendered_changelog_entry_identity ?? null,
    release_notes_identity: prepared?.release_notes_identity ?? null,
    changelog_identity: prepared?.changelog_identity ?? null,
    history_identity: result.history_identity ?? null,
    ci003_release_run_identity: releaseEvidence?.release_run_identity ?? null,
    ci003_release_contract_identity: releaseEvidence?.release_contract_identity ?? null,
    changelog_contract_identity: prepared?.changelog_contract_identity ?? CHANGELOG_CONTRACT_IDENTITY,
    gate_implementation_identity: implementationIdentity(),
    idempotent: result.idempotent === true,
    invalidation_reason: null,
  });
}

export function runPrepare({ packageRoot, candidatePath, evidenceRoot = '.delivery/shared-package-changelogs' }) {
  const absolutePackageRoot = path.resolve(packageRoot);
  const repositoryRoot = resolveRepositoryRoot(absolutePackageRoot);
  const { source: manifestSource, value: manifest } = readJson(path.join(absolutePackageRoot, 'package.json'), 'package manifest');
  const { value: contract } = readJson(path.resolve(candidatePath), 'changelog candidate');
  const duplicates = findDuplicateChangelogGateImplementations(repositoryRoot);
  const startedAt = new Date().toISOString();
  const result = prepareChangelog({ manifestSource, manifest, contract, duplicateImplementations: duplicates });
  const completedAt = new Date().toISOString();
  const evidence = createPrepareEvidence(result, startedAt, completedAt);
  const evidencePath = writeEvidence(path.resolve(evidenceRoot), evidence);
  return { result, evidence, evidencePath };
}

function assertHistoryWriteAllowed(prepared, allowHistoryWrite) {
  if (!allowHistoryWrite) throw new Error('HISTORY_WRITE_NOT_EXPLICITLY_ALLOWED');
  const expected = `${prepared.package_name}@${prepared.release_version}`;
  if (process.env.VENTO_CHANGELOG_WRITE_CONFIRMATION !== expected) {
    throw new Error(`HISTORY_WRITE_CONFIRMATION_MISSING:expected=${expected}`);
  }
}

export function runFinalize({
  packageRoot,
  prepareEvidencePath,
  releaseContractPath,
  releaseEvidencePath,
  historyPath,
  evidenceRoot = '.delivery/shared-package-changelogs',
  allowHistoryWrite = false,
}) {
  const absolutePackageRoot = path.resolve(packageRoot);
  const manifest = readJson(path.join(absolutePackageRoot, 'package.json'), 'package manifest').value;
  const prepareEvidence = readJson(path.resolve(prepareEvidencePath), 'CI004 PREPARE evidence').value;
  const prepared = prepareEvidence?.prepared;
  const { source: releaseContractSource, value: releaseContract } = readJson(path.resolve(releaseContractPath), 'CI003 release contract');
  const releaseEvidence = readJson(path.resolve(releaseEvidencePath), 'CI003 release evidence').value;
  const absoluteHistoryPath = path.resolve(historyPath);
  const historySource = fs.existsSync(absoluteHistoryPath) ? fs.readFileSync(absoluteHistoryPath, 'utf8') : '';
  const startedAt = new Date().toISOString();
  const result = finalizeChangelog({ prepared, releaseContractSource, releaseContract, releaseEvidence, manifest, historySource });
  if (result.outcome === 'PASS' && !result.idempotent) {
    assertHistoryWriteAllowed(prepared, allowHistoryWrite);
    writeTextAtomic(absoluteHistoryPath, result.history);
  }
  const completedAt = new Date().toISOString();
  const evidence = createFinalizeEvidence(result, releaseEvidence, startedAt, completedAt);
  const evidencePath = writeEvidence(path.resolve(evidenceRoot), evidence);
  return { result, evidence, evidencePath };
}

function parseArgs(argv) {
  const args = {
    mode: null,
    packageRoot: null,
    candidatePath: null,
    prepareEvidencePath: null,
    releaseContractPath: null,
    releaseEvidencePath: null,
    historyPath: null,
    evidenceRoot: '.delivery/shared-package-changelogs',
    allowHistoryWrite: false,
    json: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--json') args.json = true;
    else if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--allow-history-write') args.allowHistoryWrite = true;
    else if (['--mode', '--package-root', '--candidate', '--prepare-evidence', '--release-contract', '--release-evidence', '--history', '--evidence-root'].includes(token)) {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${token}.`);
      if (token === '--mode') args.mode = value;
      else if (token === '--package-root') args.packageRoot = value;
      else if (token === '--candidate') args.candidatePath = value;
      else if (token === '--prepare-evidence') args.prepareEvidencePath = value;
      else if (token === '--release-contract') args.releaseContractPath = value;
      else if (token === '--release-evidence') args.releaseEvidencePath = value;
      else if (token === '--history') args.historyPath = value;
      else args.evidenceRoot = value;
      index += 1;
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printUsage() {
  console.log(`Usage:\n  node ${IMPLEMENTATION_RELATIVE_PATH} --mode prepare --package-root <dir> --candidate <json> [--evidence-root <dir>] [--json]\n  node ${IMPLEMENTATION_RELATIVE_PATH} --mode finalize --package-root <dir> --prepare-evidence <json> --release-contract <json> --release-evidence <json> --history <CHANGELOG.md> --allow-history-write [--evidence-root <dir>] [--json]\n\nPREPARE never writes package history. FINALIZE writes a real CHANGELOG only with --allow-history-write and VENTO_CHANGELOG_WRITE_CONFIRMATION=<package>@<version>. Evidence is written under .delivery by default.`);
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) return printUsage();
  if (!['prepare', 'finalize'].includes(args.mode)) throw new Error('--mode must be prepare or finalize.');
  if (!args.packageRoot) throw new Error('--package-root is required.');
  let output;
  if (args.mode === 'prepare') {
    if (!args.candidatePath) throw new Error('--candidate is required in prepare mode.');
    output = runPrepare({
      packageRoot: args.packageRoot,
      candidatePath: args.candidatePath,
      evidenceRoot: args.evidenceRoot,
    });
  } else {
    for (const [label, value] of [
      ['--prepare-evidence', args.prepareEvidencePath],
      ['--release-contract', args.releaseContractPath],
      ['--release-evidence', args.releaseEvidencePath],
      ['--history', args.historyPath],
    ]) {
      if (!value) throw new Error(`${label} is required in finalize mode.`);
    }
    output = runFinalize({
      packageRoot: args.packageRoot,
      prepareEvidencePath: args.prepareEvidencePath,
      releaseContractPath: args.releaseContractPath,
      releaseEvidencePath: args.releaseEvidencePath,
      historyPath: args.historyPath,
      evidenceRoot: args.evidenceRoot,
      allowHistoryWrite: args.allowHistoryWrite,
    });
  }
  const status = output.evidence.status;
  console.log(args.json ? JSON.stringify(output.evidence, null, 2) : `${status}: ${output.evidence.package_name}@${output.evidence.release_version} changelog ${output.evidence.phase}.`);
  if (!['PASS', 'NOT_APPLICABLE'].includes(status)) process.exitCode = 1;
  return output;
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
