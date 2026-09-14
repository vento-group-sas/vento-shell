import assert from 'node:assert/strict';
import test from 'node:test';

import {
  classifyDoctorWorktreePath,
  deriveImplementationDoctorRequirements,
  evaluateImplementationDoctorProbes,
  implementationBranchName,
} from './implementation-doctor.mjs';

function gap018Instance(status = 'VERIFIED') {
  return {
    instance_id: 'SHELL-CI-020::GAP-PKG-018',
    task_id: 'SHELL-CI-020',
    status,
    authorized_changes: [
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'supabase/migrations/20260829200745_auth_db_019_identity_links.sql',
        change: 'EXECUTE_ONLY',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'supabase/tests/packages/GAP-PKG-018.sql',
        change: 'CREATE',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'tests/packages/GAP-PKG-018',
        change: 'CREATE',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-018.json',
        change: 'MODIFY',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'scripts/quality/supabase-db-harness.mjs',
        change: 'EXECUTE_ONLY',
      },
    ],
    validation_commands: [
      'npm run supabase:db:test:clean',
      'npm exec -- supabase test db supabase/tests/packages/GAP-PKG-018.sql',
      'npm test --silent',
    ],
  };
}

const foundation = {
  excluded_target_path_prefixes: [
    'supabase/tests/',
    'tests/',
    'docs/',
  ],
};

function healthyProbes(overrides = {}) {
  return {
    repository_root_ok: true,
    repository_basename_ok: true,
    origin_repository_ok: true,
    full_branch_refspec_ok: true,
    tools: {
      git: { ok: true },
      node: { ok: true },
      npm: { ok: true },
      gh: { ok: true },
    },
    github_auth_ok: true,
    branch_protection_readable: true,
    required_main_check_present: true,
    required_main_checks: ['VENTO Required Gate'],
    branch_protection_strict: true,
    current_branch: 'implementation/shell-ci-020/gap-pkg-018',
    local_head_sha: 'a'.repeat(40),
    remote_main_sha: 'b'.repeat(40),
    remote_branch_sha: 'a'.repeat(40),
    remote_branch_relation: 'EQUAL',
    main_ancestor_of_local_head: true,
    docker_server_ok: true,
    supabase_cli_ok: true,
    open_pr: null,
    ...overrides,
  };
}

test('deriva rama fisica exacta', () => {
  assert.equal(
    implementationBranchName('SHELL-CI-020::GAP-PKG-018'),
    'implementation/shell-ci-020/gap-pkg-018',
  );
});

test('GAP018 no requiere MRP015-050 por EXECUTE_ONLY + prefijos excluidos', () => {
  const requirements = deriveImplementationDoctorRequirements({
    instance: gap018Instance('VERIFIED'),
    foundation,
  });
  assert.equal(requirements.mrp015_050_required, false);
  assert.equal(requirements.physical_validation_pending, false);
  assert.equal(requirements.docker_server_required, false);
  assert.equal(requirements.supabase_cli_required, false);
});

test('instancia no VERIFIED con validacion Supabase exige Docker y Supabase CLI', () => {
  const requirements = deriveImplementationDoctorRequirements({
    instance: gap018Instance('IN_PROGRESS'),
    foundation,
  });
  assert.equal(requirements.physical_validation_pending, true);
  assert.equal(requirements.docker_server_required, true);
  assert.equal(requirements.supabase_cli_required, true);
});

test('required gate faltante bloquea antes de mutar', () => {
  const instance = gap018Instance();
  const requirements = deriveImplementationDoctorRequirements({ instance, foundation });
  const report = evaluateImplementationDoctorProbes({
    instance,
    requirements,
    probes: healthyProbes({
      required_main_check_present: false,
      required_main_checks: [],
    }),
  });
  assert.equal(report.status, 'BLOCKED');
  assert.match(report.blockers.join('|'), /REQUIRED_CHECK_MISSING:VENTO Required Gate/u);
});

test('refspec incompleto y autenticacion invalida bloquean', () => {
  const instance = gap018Instance();
  const requirements = deriveImplementationDoctorRequirements({ instance, foundation });
  const report = evaluateImplementationDoctorProbes({
    instance,
    requirements,
    probes: healthyProbes({
      full_branch_refspec_ok: false,
      github_auth_ok: false,
    }),
  });
  assert.equal(report.status, 'BLOCKED');
  assert.ok(report.blockers.includes('ORIGIN_REFSPEC_INCOMPLETE'));
  assert.ok(report.blockers.includes('GITHUB_AUTH_INVALID'));
});

test('main avanzado en VERIFIED no invalida evidencia: exige reintegracion', () => {
  const instance = gap018Instance();
  const requirements = deriveImplementationDoctorRequirements({ instance, foundation });
  const report = evaluateImplementationDoctorProbes({
    instance,
    requirements,
    probes: healthyProbes({
      main_ancestor_of_local_head: false,
      branch_protection_strict: true,
    }),
  });
  assert.equal(report.status, 'PASS');
  assert.equal(report.integration_required, true);
  assert.equal(report.next_action, 'REINTEGRATE_MAIN_BEFORE_CHECKS');
  assert.ok(report.advisories.includes('INTEGRATION_BASE_ADVANCED'));
  assert.ok(report.advisories.includes('STRICT_PROTECTION_REQUIRES_REINTEGRATION_BEFORE_MERGE'));
});

test('rama stale antes de START bloquea', () => {
  const instance = gap018Instance('AUTHORIZED');
  const requirements = deriveImplementationDoctorRequirements({ instance, foundation });
  const report = evaluateImplementationDoctorProbes({
    instance,
    requirements,
    probes: healthyProbes({
      main_ancestor_of_local_head: false,
    }),
  });
  assert.equal(report.status, 'BLOCKED');
  assert.ok(report.blockers.includes('IMPLEMENTATION_START_STALE_BRANCH'));
});

test('Docker ausente bloquea solo si quedan validaciones fisicas pendientes', () => {
  const active = gap018Instance('IN_PROGRESS');
  const activeRequirements = deriveImplementationDoctorRequirements({
    instance: active,
    foundation,
  });
  const blocked = evaluateImplementationDoctorProbes({
    instance: active,
    requirements: activeRequirements,
    probes: healthyProbes({
      docker_server_ok: false,
    }),
  });
  assert.equal(blocked.status, 'BLOCKED');
  assert.ok(blocked.blockers.includes('DOCKER_SERVER_UNAVAILABLE'));

  const verified = gap018Instance('VERIFIED');
  const verifiedRequirements = deriveImplementationDoctorRequirements({
    instance: verified,
    foundation,
  });
  const safe = evaluateImplementationDoctorProbes({
    instance: verified,
    requirements: verifiedRequirements,
    probes: healthyProbes({
      docker_server_ok: false,
      supabase_cli_ok: false,
    }),
  });
  assert.equal(safe.status, 'PASS');
});

test('worktree con execute-only o desconocido bloquea', () => {
  const instance = gap018Instance();
  const requirements = deriveImplementationDoctorRequirements({ instance, foundation });
  const report = evaluateImplementationDoctorProbes({
    instance,
    requirements,
    probes: healthyProbes(),
    worktreeClassifications: [
      {
        path: 'scripts/quality/supabase-db-harness.mjs',
        classification: 'EXECUTE_ONLY_MUTATION',
      },
      {
        path: 'src/app/page.tsx',
        classification: 'UNEXPECTED',
      },
    ],
  });
  assert.equal(report.status, 'BLOCKED');
  assert.match(report.blockers.join('|'), /WORKTREE_SCOPE_INVALID/u);
});

test('clasifica ledger, writable y execute-only del worktree', () => {
  const root = process.cwd();
  const instance = gap018Instance();
  assert.equal(
    classifyDoctorWorktreePath({
      root,
      instance,
      relativePath:
        'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-018.json',
    }),
    'OWN_LEDGER',
  );
  assert.equal(
    classifyDoctorWorktreePath({
      root,
      instance,
      relativePath: 'supabase/tests/packages/GAP-PKG-018.sql',
    }),
    'AUTHORIZED_WRITABLE',
  );
  assert.equal(
    classifyDoctorWorktreePath({
      root,
      instance,
      relativePath: 'scripts/quality/supabase-db-harness.mjs',
    }),
    'EXECUTE_ONLY_MUTATION',
  );
  assert.equal(
    classifyDoctorWorktreePath({
      root,
      instance,
      relativePath: 'src/app/page.tsx',
    }),
    'UNEXPECTED',
  );
});

test('PR abierto debe apuntar a la rama remota actual', () => {
  const instance = gap018Instance();
  const requirements = deriveImplementationDoctorRequirements({ instance, foundation });
  const report = evaluateImplementationDoctorProbes({
    instance,
    requirements,
    probes: healthyProbes({
      open_pr: {
        number: 503,
        head_sha: 'c'.repeat(40),
        mergeable: 'MERGEABLE',
        is_draft: false,
      },
    }),
  });
  assert.equal(report.status, 'BLOCKED');
  assert.ok(report.blockers.includes('OPEN_PR_HEAD_DOES_NOT_MATCH_REMOTE_BRANCH'));
});
