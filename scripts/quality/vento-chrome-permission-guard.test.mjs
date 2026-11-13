import assert from "node:assert/strict";
import test from "node:test";
import { createPermissionSessionGuard } from "../../templates/app-shell-standard/src/components/vento/standard/permission-session-guard.ts";

const tick = () => new Promise((resolve) => setImmediate(resolve));

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function fixture(initialUser = "user-a") {
  let user = initialUser;
  let listener = null;
  const requests = [];
  const states = [];
  const adapters = {
    async getAuthenticatedUserId() { return user; },
    subscribeToAuthChanges(callback) {
      listener = callback;
      return () => { listener = null; };
    },
    hasPermission(code, siteId) {
      const pending = deferred();
      requests.push({ code, siteId, pending });
      return pending.promise;
    },
  };
  const guard = createPermissionSessionGuard(adapters, ["nexo.access", "nexo.inventory.stock"], (state) => states.push(state));
  return {
    guard, requests, states,
    setUser(next) { user = next; },
    emit(event) { listener?.(event); },
    get subscribed() { return listener !== null; },
    resolve(siteId, allowed) {
      const pending = requests.filter((x) => x.siteId === siteId && !x.done);
      for (const req of pending) { req.done = true; req.pending.resolve(allowed); }
    },
  };
}

test("fail closed until verified identity AND all RPC results; SITE A to SITE B ignores late A", async () => {
  const f = fixture();
  f.guard.setScope({ siteId: "site-a", roleKey: "manager" });
  f.guard.start();
  assert.equal(f.guard.getState().ready, false);
  await tick();
  assert.equal(f.requests.filter((x) => x.siteId === "site-a").length, 2);
  f.guard.setScope({ siteId: "site-b", roleKey: "manager" });
  assert.equal(f.guard.getState().ready, false);
  assert.deepEqual(f.guard.getState().map, {});
  await tick();
  f.resolve("site-a", true);
  await tick();
  assert.equal(f.guard.getState().ready, false);
  f.resolve("site-b", false);
  await tick();
  assert.equal(f.guard.getState().ready, true);
  assert.equal(f.guard.getState().siteId, "site-b");
  assert.equal(f.guard.getState().map["nexo.inventory.stock"], false);
  f.guard.dispose();
});

test("switching authenticated users in the same site hides old links before new RPC", async () => {
  const f = fixture("user-a");
  f.guard.setScope({ siteId: "site-a", roleKey: "staff" });
  f.guard.start();
  await tick();
  f.resolve("site-a", true);
  await tick();
  assert.equal(f.guard.getState().userId, "user-a");
  assert.equal(f.guard.getState().map["nexo.access"], true);

  f.setUser("user-b");
  f.emit("SIGNED_IN");
  assert.equal(f.guard.getState().ready, false);
  assert.deepEqual(f.guard.getState().map, {});
  await tick();
  assert.equal(f.guard.getState().userId, "user-b");
  assert.equal(f.guard.getState().ready, false);
  f.resolve("site-a", false);
  await tick();
  assert.equal(f.guard.getState().ready, true);
  assert.equal(f.guard.getState().map["nexo.access"], false);
  f.guard.dispose();
});

test("stale verification and RPC cannot overwrite new identity", async () => {
  const auth = [];
  let listener;
  const permission = [];
  const guard = createPermissionSessionGuard({
    getAuthenticatedUserId() { const d = deferred(); auth.push(d); return d.promise; },
    subscribeToAuthChanges(callback) { listener = callback; return () => { listener = null; }; },
    hasPermission(code, siteId) { const d = deferred(); permission.push(d); return d.promise; },
  }, ["nexo.access"], () => {});
  guard.setScope({ siteId: "site-a", roleKey: "staff" });
  guard.start();
  await tick();
  assert.equal(auth.length, 1);
  listener("SIGNED_IN");
  await tick();
  assert.equal(auth.length, 2);
  auth[0].resolve("user-old");
  await tick();
  assert.equal(permission.length, 0);
  auth[1].resolve("user-new");
  await tick();
  assert.equal(permission.length, 1);
  permission[0].resolve(false);
  await tick();
  assert.equal(guard.getState().userId, "user-new");
  assert.equal(guard.getState().map["nexo.access"], false);
  guard.dispose();
});

test("role change at same site invalidates permissions and starts a new check", async () => {
  const f = fixture();
  f.guard.setScope({ siteId: "site-a", roleKey: "owner" });
  f.guard.start();
  await tick();
  f.resolve("site-a", true);
  await tick();
  assert.equal(f.guard.getState().ready, true);
  f.guard.setScope({ siteId: "site-a", roleKey: "cashier" });
  assert.equal(f.guard.getState().ready, false);
  await tick();
  f.resolve("site-a", false);
  await tick();
  assert.equal(f.guard.getState().roleKey, "cashier");
  assert.equal(f.guard.getState().map["nexo.access"], false);
  f.guard.dispose();
});

test("logout, missing user and RPC rejection always deny; INITIAL_SESSION does not cause refresh", async () => {
  const f = fixture("user-a");
  f.guard.setScope({ siteId: "site-a", roleKey: null });
  f.guard.start();
  await tick();
  f.resolve("site-a", true);
  await tick();
  assert.equal(f.guard.getState().ready, true);
  const before = f.requests.length;
  f.emit("INITIAL_SESSION");
  await tick();
  assert.equal(f.requests.length, before);

  f.setUser(null);
  f.emit("SIGNED_OUT");
  assert.equal(f.guard.getState().ready, false);
  await tick();
  assert.equal(f.guard.getState().ready, false);
  assert.equal(f.guard.getState().userId, null);
  assert.equal(f.requests.length, before);

  f.setUser("user-b");
  f.emit("SIGNED_IN");
  await tick();
  const extra = f.requests.slice(before);
  extra[0].pending.reject(new Error("RPC denied"));
  extra[1].pending.resolve(false);
  await tick();
  assert.equal(f.guard.getState().ready, true);
  assert.equal(f.guard.getState().map["nexo.access"], false);
  f.guard.dispose();
});

test("dispose unsubscribes and ignores delayed results", async () => {
  const f = fixture();
  f.guard.setScope({ siteId: "site-a", roleKey: null });
  f.guard.start();
  await tick();
  const count = f.states.length;
  f.guard.dispose();
  assert.equal(f.subscribed, false);
  f.resolve("site-a", true);
  await tick();
  assert.equal(f.states.length, count);
});
