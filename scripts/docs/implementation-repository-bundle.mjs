import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import {
  SHELL_REPOSITORY,
  implementationAuthorizedChanges,
  implementationPathMatchesScope,
  normalizeImplementationPath,
  prepareAuthorizedMaterializationDirectories,
} from './implementation-path-policy.mjs';
import { parsePorcelainPaths } from './task-branch-lifecycle.mjs';

export const IMPLEMENTATION_REPOSITORY_BUNDLE_MODEL_ID = 'VENTO-IMPLEMENTATION-REPOSITORY-BUNDLE-V1';
export const IMPLEMENTATION_REPOSITORY_BUNDLE_EVIDENCE_TYPE = 'IMPLEMENTATION_REPOSITORY_BUNDLE_V1';
export const IMPLEMENTATION_REPOSITORY_BUNDLE_PUBLISH_EVIDENCE_TYPE = 'IMPLEMENTATION_REPOSITORY_BUNDLE_PUBLISH_V1';
const DEFAULT_BRANCH = 'main';
const SHA_PATTERN = /^[0-9a-f]{40}$/u;
const CHECK_ATTEMPTS = 720;
const CHECK_INTERVAL_MS = 5000;
const REQUIRED_GATE = 'VENTO Required Gate';
function fail(message, code = 1) { const error = new Error(message); error.exitCode = code; throw error; }
function run(command, args, { cwd = process.cwd(), allowFailure = false } = {}) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', windowsHide: true, stdio: ['ignore','pipe','pipe'], maxBuffer: 64 * 1024 * 1024 });
  if (result.error) { if (allowFailure) return { status:1, stdout:'', stderr:result.error.message }; fail(`${command} no disponible: ${result.error.message}`); }
  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = String(result.stdout ?? '').trimEnd(); const stderr = String(result.stderr ?? '').trimEnd();
  if (status !== 0 && !allowFailure) fail(stderr || stdout || `${command} ${args.join(' ')} fallo.`, status);
  return { status, stdout, stderr };
}
function git(root,args,options={}) { return run('git',args,{...options,cwd:root}); }
function gh(root,args,options={}) { return run('gh',args,{...options,cwd:root}); }
function sleep(ms){ const d=Number(ms); if(Number.isFinite(d)&&d>0) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,d); }
function uniqueSorted(values){ return [...new Set((values??[]).map(v=>String(v??'').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'en')); }
function repositoryName(repository){ const p=String(repository??'').trim().split('/'); if(p.length!==2||p.some(x=>!x)) fail(`IMPLEMENTATION_REPOSITORY_INVALID:${repository||'EMPTY'}`); return p[1]; }
function normalizedRemoteRepository(remote){ const value=String(remote??'').trim().replace(/\\/gu,'/').replace(/\.git$/u,''); const m=/github\.com[/:]([^/]+)\/([^/]+)$/iu.exec(value); return m?`${m[1]}/${m[2]}`:null; }
function branchName(instanceId){ const [taskId,key]=String(instanceId??'').trim().split('::'); if(!taskId||!key) fail('IMPLEMENTATION_INSTANCE_ID_INVALID'); return `implementation/${taskId.toLowerCase()}/${key.toLowerCase()}`; }
function repositoryRootFor(shellRoot,repository){ return repository===SHELL_REPOSITORY ? path.resolve(shellRoot) : path.resolve(path.dirname(path.resolve(shellRoot)),repositoryName(repository)); }
function verifyRepositoryCheckout(root,repository){
  if(!fs.existsSync(root)||!fs.statSync(root).isDirectory()) fail(`IMPLEMENTATION_REPOSITORY_CHECKOUT_MISSING:${repository}:${root}`);
  const top=git(root,['rev-parse','--show-toplevel'],{allowFailure:true});
  if(top.status!==0||path.resolve(top.stdout.trim())!==path.resolve(root)) fail(`IMPLEMENTATION_REPOSITORY_CHECKOUT_INVALID:${repository}:${root}`);
  const remote=git(root,['remote','get-url','origin'],{allowFailure:true}); const identity=remote.status===0?normalizedRemoteRepository(remote.stdout):null;
  if(identity!==repository) fail(`IMPLEMENTATION_REPOSITORY_ORIGIN_MISMATCH:${repository}:${identity??'NONE'}`); return true;
}
export function buildImplementationRepositoryPlan({shellRoot=process.cwd(),instance,verifyCheckouts=true}={}){
  if(!instance||typeof instance!=='object'||Array.isArray(instance)) fail('IMPLEMENTATION_REPOSITORY_INSTANCE_INVALID');
  const repositories=uniqueSorted(instance.target_repositories??[]); if(repositories.length===0) fail('IMPLEMENTATION_REPOSITORY_TARGETS_EMPTY');
  if(!repositories.includes(SHELL_REPOSITORY)) fail(`IMPLEMENTATION_REPOSITORY_ORCHESTRATOR_MISSING:${SHELL_REPOSITORY}`);
  const all=implementationAuthorizedChanges(instance,{repository:null}); const authorizedRepos=uniqueSorted(all.map(e=>e.repo));
  const missing=repositories.filter(r=>!authorizedRepos.includes(r)); const extra=authorizedRepos.filter(r=>!repositories.includes(r));
  if(missing.length||extra.length) fail(`IMPLEMENTATION_REPOSITORY_AUTHORIZATION_MISMATCH:missing=${missing.join(',')||'NONE'};extra=${extra.join(',')||'NONE'}`);
  const branch=branchName(instance.instance_id); const entries=repositories.map(repository=>{ const root=repositoryRootFor(shellRoot,repository); if(verifyCheckouts) verifyRepositoryCheckout(root,repository); return Object.freeze({repository,root,branch,orchestrator:repository===SHELL_REPOSITORY,authorized_changes:Object.freeze(implementationAuthorizedChanges(instance,{repository}))}); });
  if(new Set(entries.map(e=>path.resolve(e.root).toLowerCase())).size!==entries.length) fail('IMPLEMENTATION_REPOSITORY_CHECKOUTS_NOT_INDEPENDENT');
  return Object.freeze({model_id:IMPLEMENTATION_REPOSITORY_BUNDLE_MODEL_ID,instance_id:instance.instance_id,branch,repositories:Object.freeze(entries),repository_count:entries.length,multi_repo:entries.length>1});
}
export function repositoryBundleEvidence(instance,type){ return [...(instance?.evidence??[])].reverse().find(e=>e&&typeof e==='object'&&!Array.isArray(e)&&e.type===type)??null; }
function currentBranch(root){ return git(root,['branch','--show-current']).stdout.trim(); }
function currentHead(root){ return git(root,['rev-parse','HEAD']).stdout.trim().toLowerCase(); }
function branchExists(root,branch){ return git(root,['show-ref','--verify','--quiet',`refs/heads/${branch}`],{allowFailure:true}).status===0; }
function remoteBranchExists(root,branch){ return git(root,['ls-remote','--exit-code','--heads','origin',`refs/heads/${branch}`],{allowFailure:true}).status===0; }
function worktreePaths(root){ return parsePorcelainPaths(git(root,['status','--porcelain=v1','--untracked-files=all']).stdout); }
function branchChangedPaths(root){ return git(root,['diff','--name-only','--diff-filter=ACMRD',`origin/${DEFAULT_BRANCH}...HEAD`]).stdout.split(/\r?\n/u).map(normalizeImplementationPath).filter(Boolean); }
export function ensureExternalRepositoryBranches({plan}={}){
  if(!plan||plan.model_id!==IMPLEMENTATION_REPOSITORY_BUNDLE_MODEL_ID) fail('IMPLEMENTATION_REPOSITORY_PLAN_INVALID'); const results=[];
  for(const entry of plan.repositories.filter(x=>!x.orchestrator)){ const {root,branch,repository}=entry; verifyRepositoryCheckout(root,repository); git(root,['fetch','origin',DEFAULT_BRANCH,'--quiet']); const current=currentBranch(root);
    if(current===DEFAULT_BRANCH){ if(worktreePaths(root).length) fail(`IMPLEMENTATION_REPOSITORY_MAIN_DIRTY:${repository}`); git(root,['pull','--ff-only','origin',DEFAULT_BRANCH]); if(remoteBranchExists(root,branch)){ git(root,['fetch','origin',branch,'--quiet']); if(branchExists(root,branch)){ git(root,['switch',branch]); git(root,['branch','--set-upstream-to',`origin/${branch}`,branch]); } else git(root,['switch','-c',branch,'--track',`origin/${branch}`]); } else if(branchExists(root,branch)) git(root,['switch',branch]); else git(root,['switch','-c',branch]); }
    else if(current!==branch) fail(`IMPLEMENTATION_REPOSITORY_BRANCH_CONFLICT:${repository}:${current||'DETACHED'}`);
    if(worktreePaths(root).length===0){ const contained=git(root,['merge-base','--is-ancestor',`origin/${DEFAULT_BRANCH}`,'HEAD'],{allowFailure:true}); if(contained.status!==0){ const merge=git(root,['merge','--no-edit',`origin/${DEFAULT_BRANCH}`],{allowFailure:true}); if(merge.status!==0) fail(`IMPLEMENTATION_REPOSITORY_MAIN_RECONCILIATION_FAILED:${repository}`); } }
    results.push(Object.freeze({repository,branch,head:currentHead(root),worktree_clean:worktreePaths(root).length===0})); }
  return Object.freeze(results);
}
export function prepareRepositoryBundleDirectories({plan,instance}={}){ return Object.freeze(plan.repositories.map(entry=>{ const p=prepareAuthorizedMaterializationDirectories({root:entry.root,instance,repository:entry.repository}); return Object.freeze({repository:entry.repository,prepared:p.prepared,created:p.created}); })); }
export function collectRepositoryBundleChanges({plan}={}){ return Object.freeze(plan.repositories.map(entry=>Object.freeze({repository:entry.repository,root:entry.root,branch:entry.branch,head:currentHead(entry.root),paths:Object.freeze([...new Set([...branchChangedPaths(entry.root),...worktreePaths(entry.root).map(normalizeImplementationPath)])].filter(Boolean).sort())}))); }
function ownLedgerPath(instance){ const [taskId,key]=String(instance?.instance_id??'').trim().split('::'); return taskId&&key?`docs/plan-canonico/modular/implementation-instances/${taskId}__${key}.json`:null; }
export function assessRepositoryBundleMaterialization({instance,changes}={}){ const observed=new Map((changes??[]).map(e=>[e.repository,new Set((e.paths??[]).map(normalizeImplementationPath).filter(Boolean))])); const ledger=ownLedgerPath(instance); const expected=implementationAuthorizedChanges(instance,{repository:null}).filter(e=>e.change!=='EXECUTE_ONLY'&&e.path!==ledger).map(e=>({repo:e.repo,path:e.path})); const missing=expected.filter(e=>![...(observed.get(e.repo)??new Set())].some(p=>implementationPathMatchesScope(e.path,p))); return Object.freeze({ready:missing.length===0,expected_count:expected.length,missing:Object.freeze(missing.map(e=>`${e.repo}:${e.path}`).sort())}); }
export function assertRepositoryBundleScope({instance,changes}={}){ for(const state of changes??[]){ if(state.repository===SHELL_REPOSITORY) continue; const authorized=implementationAuthorizedChanges(instance,{repository:state.repository}); for(const changedPath of state.paths??[]){ const match=authorized.find(e=>implementationPathMatchesScope(e.path,changedPath)); if(!match) fail(`IMPLEMENTATION_REPOSITORY_PATH_OUT_OF_SCOPE:${state.repository}:${changedPath}`); if(match.change==='EXECUTE_ONLY') fail(`IMPLEMENTATION_REPOSITORY_EXECUTE_ONLY_WRITE:${state.repository}:${changedPath}`); } } return true; }
function commitDirty(root,message){ const dirty=worktreePaths(root); if(!dirty.length) return false; git(root,['add','--',...dirty]); git(root,['diff','--cached','--check']); const staged=git(root,['diff','--cached','--name-only','--diff-filter=ACMRD']).stdout.trim(); if(!staged) return false; git(root,['commit','-m',message]); return true; }
export function checkpointExternalRepositoryBundle({plan,instance}={}){ const changes=collectRepositoryBundleChanges({plan}); assertRepositoryBundleScope({instance,changes}); const results=[]; for(const entry of plan.repositories.filter(x=>!x.orchestrator)){ const created=commitDirty(entry.root,`implementation(${instance.instance_id}): materialize ${entry.repository}`); git(entry.root,['fetch','origin',DEFAULT_BRANCH,'--quiet']); const contained=git(entry.root,['merge-base','--is-ancestor',`origin/${DEFAULT_BRANCH}`,'HEAD'],{allowFailure:true}); if(contained.status!==0){ const merge=git(entry.root,['merge','--no-edit',`origin/${DEFAULT_BRANCH}`],{allowFailure:true}); if(merge.status!==0) fail(`IMPLEMENTATION_REPOSITORY_REBASELINE_FAILED:${entry.repository}`); } results.push(Object.freeze({repository:entry.repository,committed:created,candidate_commit:currentHead(entry.root),changed_paths:Object.freeze(branchChangedPaths(entry.root))})); } return Object.freeze(results); }
export function pushExternalRepositoryBundle({plan}={}){ const results=[]; for(const entry of plan.repositories.filter(x=>!x.orchestrator)){ const branch=entry.branch; if(remoteBranchExists(entry.root,branch)){ git(entry.root,['fetch','origin',branch,'--quiet']); const remoteAhead=Number(git(entry.root,['rev-list','--count',`HEAD..origin/${branch}`]).stdout.trim()); if(remoteAhead>0) fail(`IMPLEMENTATION_REPOSITORY_REMOTE_AHEAD:${entry.repository}:${branch}`); } git(entry.root,['push','-u','origin',branch]); git(entry.root,['fetch','origin',branch,'--quiet']); const local=currentHead(entry.root); const remote=git(entry.root,['rev-parse',`origin/${branch}`]).stdout.trim().toLowerCase(); if(local!==remote) fail(`IMPLEMENTATION_REPOSITORY_PUSH_MISMATCH:${entry.repository}`); results.push(Object.freeze({repository:entry.repository,candidate_commit:local})); } return Object.freeze(results); }
function normalizedCandidateCommit(value,label='IMPLEMENTATION_REPOSITORY_CANDIDATE'){ const candidate=String(value??'').trim().toLowerCase(); if(!SHA_PATTERN.test(candidate)) fail(`${label}_SHA_INVALID:${candidate||'EMPTY'}`); return candidate; }
function candidateBaseCommit(root,candidateCommit){ const candidate=normalizedCandidateCommit(candidateCommit); git(root,['fetch','origin',DEFAULT_BRANCH,'--quiet']); return git(root,['merge-base',`origin/${DEFAULT_BRANCH}`,candidate]).stdout.trim().toLowerCase(); }
function candidateChangedPaths(root,candidateCommit){ const candidate=normalizedCandidateCommit(candidateCommit); return git(root,['diff','--name-only','--diff-filter=ACMRD',`origin/${DEFAULT_BRANCH}...${candidate}`]).stdout.split(/\r?\n/u).map(normalizeImplementationPath).filter(Boolean); }
function expectedRepositoryCandidate(entry,orchestratorCandidateCommit=null){ if(entry.orchestrator&&orchestratorCandidateCommit){ const candidate=normalizedCandidateCommit(orchestratorCandidateCommit,'IMPLEMENTATION_REPOSITORY_ORCHESTRATOR_CANDIDATE'); const lifecycleHead=currentHead(entry.root); if(git(entry.root,['merge-base','--is-ancestor',candidate,lifecycleHead],{allowFailure:true}).status!==0) fail(`IMPLEMENTATION_REPOSITORY_ORCHESTRATOR_CANDIDATE_NOT_ANCESTOR:${candidate}:${lifecycleHead}`); return candidate; } return currentHead(entry.root); }
function assertRepositoryBundleCandidateShape(plan,evidence){ if(!evidence||evidence.type!==IMPLEMENTATION_REPOSITORY_BUNDLE_EVIDENCE_TYPE||evidence.model_id!==IMPLEMENTATION_REPOSITORY_BUNDLE_MODEL_ID||evidence.instance_id!==plan.instance_id) fail('IMPLEMENTATION_REPOSITORY_CANDIDATE_EVIDENCE_INVALID'); const expected=plan.repositories.map(e=>e.repository).sort(); const rows=Array.isArray(evidence.repositories)?evidence.repositories:[]; const actual=rows.map(e=>String(e?.repository??'')).sort(); if(JSON.stringify(expected)!==JSON.stringify(actual)) fail('IMPLEMENTATION_REPOSITORY_CANDIDATE_SET_MISMATCH'); if(new Set(actual).size!==actual.length) fail('IMPLEMENTATION_REPOSITORY_CANDIDATE_REPOSITORY_DUPLICATE'); for(const row of rows){ if(!SHA_PATTERN.test(String(row?.candidate_commit??''))) fail(`IMPLEMENTATION_REPOSITORY_CANDIDATE_SHA_INVALID:${row?.repository??'UNKNOWN'}`); } return rows; }
export function buildRepositoryBundleCandidateEvidence({plan,orchestratorCandidateCommit=null}={}){ const repositories=plan.repositories.map(entry=>{ const candidate=expectedRepositoryCandidate(entry,orchestratorCandidateCommit); return Object.freeze({repository:entry.repository,branch:entry.branch,base_commit:candidateBaseCommit(entry.root,candidate),candidate_commit:candidate,changed_paths:Object.freeze(candidateChangedPaths(entry.root,candidate))}); }); return Object.freeze({type:IMPLEMENTATION_REPOSITORY_BUNDLE_EVIDENCE_TYPE,model_id:IMPLEMENTATION_REPOSITORY_BUNDLE_MODEL_ID,instance_id:plan.instance_id,repository_count:repositories.length,repositories:Object.freeze(repositories)}); }
export function validateRepositoryBundleCandidateEvidence({plan,evidence,orchestratorCandidateCommit=null}={}){ const rows=assertRepositoryBundleCandidateShape(plan,evidence); for(const row of rows){ const pe=plan.repositories.find(e=>e.repository===row.repository); if(!pe) fail(`IMPLEMENTATION_REPOSITORY_CANDIDATE_REPO_UNKNOWN:${row.repository}`); const expected=expectedRepositoryCandidate(pe,orchestratorCandidateCommit); if(expected!==row.candidate_commit) fail(`IMPLEMENTATION_REPOSITORY_CANDIDATE_STALE:${row.repository}`); } return true; }
export function reconcileRepositoryBundleCandidateEvidence({plan,evidence,orchestratorCandidateCommit}={}){ const rows=assertRepositoryBundleCandidateShape(plan,evidence); const physical=normalizedCandidateCommit(orchestratorCandidateCommit,'IMPLEMENTATION_REPOSITORY_ORCHESTRATOR_CANDIDATE'); let updated=false; const repositories=rows.map(row=>{ const pe=plan.repositories.find(e=>e.repository===row.repository); if(!pe) fail(`IMPLEMENTATION_REPOSITORY_CANDIDATE_REPO_UNKNOWN:${row.repository}`); if(!pe.orchestrator){ const external=currentHead(pe.root); if(external!==row.candidate_commit) fail(`IMPLEMENTATION_REPOSITORY_CANDIDATE_STALE:${row.repository}`); return Object.freeze({...row,changed_paths:Object.freeze([...(row.changed_paths??[])])}); } expectedRepositoryCandidate(pe,physical); if(row.candidate_commit===physical) return Object.freeze({...row,changed_paths:Object.freeze([...(row.changed_paths??[])])}); if(git(pe.root,['merge-base','--is-ancestor',row.candidate_commit,physical],{allowFailure:true}).status!==0) fail(`IMPLEMENTATION_REPOSITORY_ORCHESTRATOR_RECONCILIATION_UNSAFE:${row.candidate_commit}->${physical}`); updated=true; return Object.freeze({...row,base_commit:candidateBaseCommit(pe.root,physical),candidate_commit:physical,changed_paths:Object.freeze(candidateChangedPaths(pe.root,physical))}); }); const next=Object.freeze({...evidence,repository_count:repositories.length,repositories:Object.freeze(repositories)}); validateRepositoryBundleCandidateEvidence({plan,evidence:next,orchestratorCandidateCommit:physical}); return Object.freeze({updated,evidence:next,orchestrator_candidate_commit:physical}); }
function parseJson(source,label){ try{return JSON.parse(String(source??'').trim()||'null');}catch{fail(`${label}: JSON_INVALID`);} }

function normalizedPrBody(value){ return String(value??'').replace(/\r\n/gu,'\n').trimEnd(); }

export function buildImplementationRepositoryPrBody({instanceId,repository,headSha}={}){
  const id=String(instanceId??'').trim();
  const repo=String(repository??'').trim();
  const head=normalizedCandidateCommit(headSha,'IMPLEMENTATION_REPOSITORY_PR_HEAD');
  if(!id) fail('IMPLEMENTATION_REPOSITORY_PR_INSTANCE_INVALID');
  if(!repo) fail('IMPLEMENTATION_REPOSITORY_PR_REPOSITORY_INVALID');
  return [
    'VENTO-TREQ-AFFECTED: NONE',
    `VENTO-TREQ-ZERO-REASON: ${id} publica un delta fisico multi-repo ya gobernado por requisitos TREQ y no modifica el registro 04A.`,
    '',
    '## Implementacion multi-repo',
    '',
    id,
    '',
    `Repositorio: ${repo}`,
    `Candidate: ${head}`,
  ].join('\n');
}

export function assessImplementationRepositoryPrState({state,expectedBody,headSha,branch}={}){
  if(!state||typeof state!=='object'||Array.isArray(state)) return Object.freeze({status:'INVALID',reason:'PR_STATE_INVALID'});
  const expectedHead=normalizedCandidateCommit(headSha,'IMPLEMENTATION_REPOSITORY_PR_HEAD');
  if(state.state!=='OPEN') return Object.freeze({status:'INVALID',reason:'PR_NOT_OPEN'});
  if(state.isDraft===true) return Object.freeze({status:'INVALID',reason:'PR_DRAFT'});
  if(state.baseRefName!==DEFAULT_BRANCH) return Object.freeze({status:'INVALID',reason:'PR_BASE_INVALID'});
  if(branch&&state.headRefName!==branch) return Object.freeze({status:'INVALID',reason:'PR_BRANCH_INVALID'});
  if(String(state.headRefOid??'').trim().toLowerCase()!==expectedHead) return Object.freeze({status:'INVALID',reason:'PR_HEAD_INVALID'});
  if(normalizedPrBody(state.body)===normalizedPrBody(expectedBody)) return Object.freeze({status:'PASS',reason:'PR_BODY_CURRENT'});
  return Object.freeze({status:'UPDATE_BODY',reason:'PR_BODY_STALE'});
}

function checkRunId(link){
  const match=/\/actions\/runs\/([0-9]+)/u.exec(String(link??''));
  if(!match) return null;
  const value=Number(match[1]);
  return Number.isSafeInteger(value)?value:null;
}

function latestImplementationRepositoryChecks(rows){
  const latest=new Map();
  for(const [index,row] of (Array.isArray(rows)?rows:[]).entries()){
    const name=String(row?.name??'').trim();
    if(!name) continue;
    const runId=checkRunId(row?.link);
    const rank=runId??index;
    const current=latest.get(name);
    if(!current||rank>=current.rank) latest.set(name,{rank,row});
  }
  return [...latest.values()].map(entry=>entry.row);
}

export function classifyImplementationRepositoryChecks(rows){
  const latest=latestImplementationRepositoryChecks(rows);
  if(latest.length===0) return Object.freeze({state:'WAIT',reason:'NO_CHECKS',count:0});
  const required=latest.find(row=>String(row?.name??'').trim()===REQUIRED_GATE)??null;
  const failed=latest.filter(row=>['fail','cancel'].includes(String(row?.bucket??'').toLowerCase()));
  if(failed.length>0){
    return Object.freeze({
      state:'FAIL',
      reason:`FAILED_CHECKS:${failed.map(row=>String(row?.name??'UNKNOWN')).sort().join(',')}`,
      count:latest.length,
    });
  }
  if(!required) return Object.freeze({state:'WAIT',reason:'REQUIRED_GATE_MISSING',count:latest.length});
  const requiredBucket=String(required?.bucket??'').toLowerCase();
  if(requiredBucket==='skipping') return Object.freeze({state:'FAIL',reason:'REQUIRED_GATE_SKIPPED',count:latest.length});
  const pending=latest.filter(row=>!['pass','skipping'].includes(String(row?.bucket??'').toLowerCase()));
  if(requiredBucket!=='pass'||pending.length>0){
    return Object.freeze({
      state:'WAIT',
      reason:requiredBucket!=='pass'?'REQUIRED_GATE_PENDING':'CHECKS_PENDING',
      count:latest.length,
    });
  }
  return Object.freeze({state:'PASS',reason:'REQUIRED_GATE_PASS',count:latest.length});
}

function readOpenPrState(entry,prNumber){
  return parseJson(
    gh(entry.root,['pr','view',String(prNumber),'--json','number,state,isDraft,headRefName,headRefOid,baseRefName,body']).stdout,
    'gh pr view',
  );
}

function mergedPrForBranch(entry){
  const result=gh(entry.root,[
    'pr','list','--head',entry.branch,'--base',DEFAULT_BRANCH,'--state','closed',
    '--json','number,state,headRefName,headRefOid,baseRefName,mergedAt,mergeCommit','--limit','20',
  ],{allowFailure:true});
  if(result.status!==0) return null;
  const rows=parseJson(result.stdout,'gh pr list merged')??[];
  if(!Array.isArray(rows)) return null;
  return rows.find(row=>row?.mergedAt&&row?.baseRefName===DEFAULT_BRANCH&&row?.headRefName===entry.branch)??null;
}

function verifyMergedPrOnMain(entry,row){
  const candidate=String(row?.headRefOid??'').trim().toLowerCase();
  const mergeCommit=String(row?.mergeCommit?.oid??'').trim().toLowerCase();
  if(!Number.isSafeInteger(Number(row?.number))||Number(row.number)<=0||!SHA_PATTERN.test(candidate)||!SHA_PATTERN.test(mergeCommit)){
    fail(`IMPLEMENTATION_REPOSITORY_MERGED_PR_INVALID:${entry.repository}`);
  }
  git(entry.root,['fetch','origin',DEFAULT_BRANCH,'--quiet']);
  if(git(entry.root,['merge-base','--is-ancestor',mergeCommit,`origin/${DEFAULT_BRANCH}`],{allowFailure:true}).status!==0){
    fail(`IMPLEMENTATION_REPOSITORY_MERGE_NOT_ON_MAIN:${entry.repository}:${mergeCommit}`);
  }
  return Object.freeze({
    repository:entry.repository,
    candidate_commit:candidate,
    pr:Number(row.number),
    merge_commit:mergeCommit,
    merged_at:row.mergedAt,
    status:'MERGED',
  });
}

function synchronizeMergedRepository(entry){
  if(worktreePaths(entry.root).length) fail(`IMPLEMENTATION_REPOSITORY_MAIN_DIRTY_BEFORE_SYNC:${entry.repository}`);
  git(entry.root,['fetch','origin',DEFAULT_BRANCH,'--quiet']);
  const current=currentBranch(entry.root);
  if(current===entry.branch){
    git(entry.root,['switch',DEFAULT_BRANCH]);
  }else if(current!==DEFAULT_BRANCH){
    fail(`IMPLEMENTATION_REPOSITORY_POST_MERGE_BRANCH_INVALID:${entry.repository}:${current||'DETACHED'}`);
  }
  git(entry.root,['pull','--ff-only','origin',DEFAULT_BRANCH]);
  if(remoteBranchExists(entry.root,entry.branch)) git(entry.root,['push','origin','--delete',entry.branch],{allowFailure:true});
  if(branchExists(entry.root,entry.branch)) git(entry.root,['branch','-d',entry.branch],{allowFailure:true});
  if(worktreePaths(entry.root).length) fail(`IMPLEMENTATION_REPOSITORY_MAIN_DIRTY_AFTER_MERGE:${entry.repository}`);
}

function findOrCreatePr(entry,instanceId,headSha){
  const expectedBody=buildImplementationRepositoryPrBody({
    instanceId,
    repository:entry.repository,
    headSha,
  });
  const rows=parseJson(gh(entry.root,[
    'pr','list','--head',entry.branch,'--state','open',
    '--json','number,headRefOid,baseRefName','--limit','20',
  ]).stdout,'gh pr list')??[];
  if(!Array.isArray(rows)) fail(`IMPLEMENTATION_REPOSITORY_PR_LIST_INVALID:${entry.repository}`);
  if(rows.length>1) fail(`IMPLEMENTATION_REPOSITORY_PR_AMBIGUOUS:${entry.repository}`);
  let prNumber=null;
  if(rows.length===1){
    prNumber=Number(rows[0].number);
    const state=readOpenPrState(entry,prNumber);
    const assessment=assessImplementationRepositoryPrState({
      state,
      expectedBody,
      headSha,
      branch:entry.branch,
    });
    if(assessment.status==='INVALID'){
      fail(`IMPLEMENTATION_REPOSITORY_PR_IDENTITY_INVALID:${entry.repository}:#${prNumber}:${assessment.reason}`);
    }
    if(assessment.status==='UPDATE_BODY'){
      gh(entry.root,['pr','edit',String(prNumber),'--body',expectedBody]);
      const updated=readOpenPrState(entry,prNumber);
      const confirmed=assessImplementationRepositoryPrState({
        state:updated,
        expectedBody,
        headSha,
        branch:entry.branch,
      });
      if(confirmed.status!=='PASS'){
        fail(`IMPLEMENTATION_REPOSITORY_PR_BODY_REPAIR_FAILED:${entry.repository}:#${prNumber}:${confirmed.reason}`);
      }
    }
    return prNumber;
  }
  gh(entry.root,[
    'pr','create','--base',DEFAULT_BRANCH,'--head',entry.branch,
    '--title',`implementation(${instanceId}): ${entry.repository}`,
    '--body',expectedBody,
  ]);
  const created=parseJson(gh(entry.root,[
    'pr','list','--head',entry.branch,'--state','open',
    '--json','number,headRefOid,baseRefName','--limit','20',
  ]).stdout,'gh pr list post-create')??[];
  if(!Array.isArray(created)||created.length!==1) fail(`IMPLEMENTATION_REPOSITORY_PR_NOT_RESOLVED:${entry.repository}`);
  prNumber=Number(created[0].number);
  const state=readOpenPrState(entry,prNumber);
  const confirmed=assessImplementationRepositoryPrState({
    state,
    expectedBody,
    headSha,
    branch:entry.branch,
  });
  if(confirmed.status!=='PASS'){
    fail(`IMPLEMENTATION_REPOSITORY_PR_CREATE_INVALID:${entry.repository}:#${prNumber}:${confirmed.reason}`);
  }
  return prNumber;
}

function waitChecks(entry,prNumber,headSha,instanceId){
  for(let attempt=1;attempt<=CHECK_ATTEMPTS;attempt+=1){
    const state=readOpenPrState(entry,prNumber);
    const identity=assessImplementationRepositoryPrState({
      state,
      expectedBody:buildImplementationRepositoryPrBody({
        instanceId,
        repository:entry.repository,
        headSha,
      }),
      headSha,
      branch:entry.branch,
    });
    if(identity.status==='INVALID') fail(`IMPLEMENTATION_REPOSITORY_PR_IDENTITY_INVALID:${entry.repository}:#${prNumber}:${identity.reason}`);
    const checks=gh(entry.root,['pr','checks',String(prNumber),'--json','name,state,bucket,link'],{allowFailure:true});
    let rows=[];
    try{ rows=parseJson(checks.stdout||'[]','gh pr checks')??[]; }catch{ rows=[]; }
    const classification=classifyImplementationRepositoryChecks(rows);
    if(classification.state==='FAIL') fail(`IMPLEMENTATION_REPOSITORY_CHECKS_FAILED:${entry.repository}:#${prNumber}:${classification.reason}`);
    if(classification.state==='PASS') return classification.count;
    if(attempt<CHECK_ATTEMPTS) sleep(CHECK_INTERVAL_MS);
  }
  fail(`IMPLEMENTATION_REPOSITORY_CHECKS_TIMEOUT:${entry.repository}:#${prNumber}`);
}

function waitMerged(entry,prNumber,headSha){
  for(let attempt=1;attempt<=60;attempt+=1){
    const state=parseJson(
      gh(entry.root,['pr','view',String(prNumber),'--json','number,state,mergedAt,mergeCommit,headRefName,headRefOid,baseRefName']).stdout,
      'gh pr view merged',
    );
    if(state?.headRefOid!==headSha) fail(`IMPLEMENTATION_REPOSITORY_PR_HEAD_CHANGED:${entry.repository}:#${prNumber}`);
    if(state?.state==='MERGED') return verifyMergedPrOnMain(entry,{...state,number:prNumber});
    if(state?.state==='CLOSED') fail(`IMPLEMENTATION_REPOSITORY_PR_CLOSED_WITHOUT_MERGE:${entry.repository}`);
    sleep(2000);
  }
  fail(`IMPLEMENTATION_REPOSITORY_MERGE_TIMEOUT:${entry.repository}`);
}

export function publishExternalRepositoryBundle({plan}={}){
  const published=[];
  for(const entry of plan.repositories.filter(candidate=>!candidate.orchestrator)){
    verifyRepositoryCheckout(entry.root,entry.repository);
    const alreadyMerged=mergedPrForBranch(entry);
    if(alreadyMerged){
      const recovered=verifyMergedPrOnMain(entry,alreadyMerged);
      synchronizeMergedRepository(entry);
      published.push(Object.freeze({...recovered,checks:0,resume:'ALREADY_MERGED'}));
      continue;
    }
    if(currentBranch(entry.root)!==entry.branch) fail(`IMPLEMENTATION_REPOSITORY_FINISH_BRANCH_INVALID:${entry.repository}`);
    if(worktreePaths(entry.root).length) fail(`IMPLEMENTATION_REPOSITORY_FINISH_DIRTY:${entry.repository}`);
    git(entry.root,['fetch','origin',DEFAULT_BRANCH,'--quiet']);
    const contained=git(entry.root,['merge-base','--is-ancestor',`origin/${DEFAULT_BRANCH}`,'HEAD'],{allowFailure:true});
    if(contained.status!==0){
      const merge=git(entry.root,['merge','--no-edit',`origin/${DEFAULT_BRANCH}`],{allowFailure:true});
      if(merge.status!==0) fail(`IMPLEMENTATION_REPOSITORY_FINISH_RECONCILIATION_FAILED:${entry.repository}`);
      git(entry.root,['push','-u','origin',entry.branch]);
    }
    const headSha=currentHead(entry.root);
    const prNumber=findOrCreatePr(entry,plan.instance_id,headSha);
    const checks=waitChecks(entry,prNumber,headSha,plan.instance_id);
    gh(entry.root,['pr','merge',String(prNumber),'--merge','--match-head-commit',headSha]);
    const merged=waitMerged(entry,prNumber,headSha);
    synchronizeMergedRepository(entry);
    published.push(Object.freeze({...merged,checks,resume:'MERGED_THIS_RUN'}));
  }
  return Object.freeze({
    type:IMPLEMENTATION_REPOSITORY_BUNDLE_PUBLISH_EVIDENCE_TYPE,
    model_id:IMPLEMENTATION_REPOSITORY_BUNDLE_MODEL_ID,
    instance_id:plan.instance_id,
    published_at:new Date().toISOString(),
    repositories:Object.freeze(published),
  });
}
export function validatePublishedRepositoryBundleEvidence({instance,evidence,plan=null}={}){ const external=uniqueSorted(instance?.target_repositories??[]).filter(r=>r!==SHELL_REPOSITORY); if(!external.length) return true; if(!evidence||evidence.type!==IMPLEMENTATION_REPOSITORY_BUNDLE_PUBLISH_EVIDENCE_TYPE||evidence.instance_id!==instance.instance_id) fail('IMPLEMENTATION_REPOSITORY_PUBLISH_EVIDENCE_MISSING'); const actual=(evidence.repositories??[]).map(e=>e.repository).sort(); if(JSON.stringify(external)!==JSON.stringify(actual)) fail('IMPLEMENTATION_REPOSITORY_PUBLISH_SET_MISMATCH'); for(const row of evidence.repositories){ if(row.status!=='MERGED'||!SHA_PATTERN.test(String(row.candidate_commit??''))||!SHA_PATTERN.test(String(row.merge_commit??''))||!Number.isSafeInteger(Number(row.pr))||Number(row.pr)<=0) fail(`IMPLEMENTATION_REPOSITORY_PUBLISH_EVIDENCE_INVALID:${row.repository}`); if(plan){ const pe=plan.repositories.find(e=>e.repository===row.repository); if(!pe) fail(`IMPLEMENTATION_REPOSITORY_PUBLISH_REPO_UNKNOWN:${row.repository}`); git(pe.root,['fetch','origin',DEFAULT_BRANCH,'--quiet']); if(git(pe.root,['merge-base','--is-ancestor',row.merge_commit,`origin/${DEFAULT_BRANCH}`],{allowFailure:true}).status!==0) fail(`IMPLEMENTATION_REPOSITORY_PUBLISH_NOT_ON_MAIN:${row.repository}`); } } return true; }
