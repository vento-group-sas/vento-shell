import test from "node:test";
import assert from "node:assert/strict";

import {
  getEffectiveContext,
  hasEffectivePermission,
  startContextSimulation,
  stopContextSimulation,
} from "../dist/legacy/index.js";

const SIMULATION_ID = "123e4567-e89b-42d3-a456-426614174000";

function fakeRpc(reply) {
  const calls = [];
  return {
    calls,
    client: {
      async rpc(name, args) {
        calls.push({ name, args });
        return typeof reply === "function" ? reply(name, args) : reply;
      },
    },
  };
}

test("unit: getEffectiveContext accepts one context object", async () => {
  const context = { app_code: "VISO", source: "real", can_operate: true };
  const { client } = fakeRpc({ data: context, error: null });
  assert.equal(await getEffectiveContext(client, "VISO"), context);
});

test("unit: getEffectiveContext unwraps the first row", async () => {
  const context = { app_code: "NEXO", source: "simulation" };
  const { client } = fakeRpc({ data: [context], error: null });
  assert.equal(await getEffectiveContext(client, "NEXO"), context);
});

test("unit: getEffectiveContext converts an empty response to null", async () => {
  for (const data of [[], null]) {
    const { client } = fakeRpc({ data, error: null });
    assert.equal(await getEffectiveContext(client, "VISO"), null);
  }
});

test("unit: hasEffectivePermission accepts only a genuine boolean true", async () => {
  const yes = fakeRpc({ data: true, error: null });
  const no = fakeRpc({ data: false, error: null });
  assert.equal(await hasEffectivePermission(yes.client, "orders.read", "VISO"), true);
  assert.equal(await hasEffectivePermission(no.client, "orders.read", "VISO"), false);
});

test("unit: startContextSimulation forwards documented defaults", async () => {
  const { client, calls } = fakeRpc({ data: SIMULATION_ID, error: null });
  assert.equal(await startContextSimulation(client, { siteId: "site-one" }), SIMULATION_ID);
  assert.deepEqual(calls, [{
    name: "start_context_simulation_v1",
    args: {
      p_site_id: "site-one",
      p_area_id: null,
      p_operational_role: null,
      p_administrative_role: null,
      p_duration_minutes: 240,
      p_metadata: {},
    },
  }]);
});

test("unit: stopContextSimulation preserves true and false results", async () => {
  for (const expected of [true, false]) {
    const { client } = fakeRpc({ data: expected, error: null });
    assert.equal(await stopContextSimulation(client), expected);
  }
});

test("contractual: the runtime entrypoint exposes all four callable RPC methods", () => {
  assert.equal(typeof getEffectiveContext, "function");
  assert.equal(typeof hasEffectivePermission, "function");
  assert.equal(typeof startContextSimulation, "function");
  assert.equal(typeof stopContextSimulation, "function");
});

test("contractual: effective context RPC receives the requested application code", async () => {
  const { client, calls } = fakeRpc({ data: null, error: null });
  await getEffectiveContext(client, "VISO");
  assert.deepEqual(calls, [{ name: "get_effective_context_v1", args: { p_app_code: "VISO" } }]);
});

test("contractual: permission RPC sends the exact permission and app scope", async () => {
  const { client, calls } = fakeRpc({ data: false, error: null });
  await hasEffectivePermission(client, "inventory.manage", "NEXO");
  assert.deepEqual(calls, [{
    name: "has_effective_permission_v1",
    args: { p_permission_code: "inventory.manage", p_app_code: "NEXO" },
  }]);
});

test("contractual: permission RPC uses null for omitted app scope", async () => {
  const { client, calls } = fakeRpc({ data: false, error: null });
  await hasEffectivePermission(client, "inventory.manage");
  assert.deepEqual(calls[0].args, { p_permission_code: "inventory.manage", p_app_code: null });
});

test("contractual: simulation RPC preserves explicitly authorized arguments", async () => {
  const metadata = { reason: "qa", source: "owner" };
  const { client, calls } = fakeRpc({ data: SIMULATION_ID, error: null });
  await startContextSimulation(client, {
    siteId: "site-two", areaId: "area-two", operationalRole: "operator",
    administrativeRole: "manager", durationMinutes: 30, metadata,
  });
  assert.deepEqual(calls[0], {
    name: "start_context_simulation_v1",
    args: {
      p_site_id: "site-two", p_area_id: "area-two",
      p_operational_role: "operator", p_administrative_role: "manager",
      p_duration_minutes: 30, p_metadata: metadata,
    },
  });
});

test("contractual: stop simulation RPC carries no invented arguments", async () => {
  const { client, calls } = fakeRpc({ data: true, error: null });
  await stopContextSimulation(client);
  assert.deepEqual(calls, [{ name: "stop_context_simulation_v1", args: undefined }]);
});

test("security: permissions deny truthy strings and objects from a malformed response", async () => {
  for (const data of ["false", "true", "1", {}, [], 1]) {
    const { client } = fakeRpc({ data, error: null });
    assert.equal(await hasEffectivePermission(client, "staff.write"), false);
  }
});

test("security: permissions deny null and missing data", async () => {
  for (const reply of [{ data: null, error: null }, { error: null }]) {
    const { client } = fakeRpc(reply);
    assert.equal(await hasEffectivePermission(client, "staff.write"), false);
  }
});

test("security: stop simulation does not report success for malformed data", async () => {
  for (const data of ["false", "true", {}, [], 1, null, undefined]) {
    const { client } = fakeRpc({ data, error: null });
    assert.equal(await stopContextSimulation(client), false);
  }
});

test("security: start simulation fails closed without a valid UUID", async () => {
  for (const data of [null, undefined, {}, [], "", "null", "not-a-uuid"]) {
    const { client } = fakeRpc({ data, error: null });
    await assert.rejects(
      startContextSimulation(client, { siteId: "site-one" }),
      /VENTO_OS_CONTEXT:SIMULATION_ID_INVALID/u,
    );
  }
});

test("security: rejected simulation is never converted into a successful ID", async () => {
  const failure = new Error("unauthorized context simulation");
  const { client } = fakeRpc({ data: null, error: failure });
  await assert.rejects(startContextSimulation(client, { siteId: "site-one" }), failure);
});

test("security: denied permissions preserve the RPC error", async () => {
  const failure = new Error("permission rpc refused");
  const { client } = fakeRpc({ data: true, error: failure });
  await assert.rejects(hasEffectivePermission(client, "staff.write"), failure);
});

test("security: effective context preserves authorization errors", async () => {
  const failure = new Error("context rpc refused");
  const { client } = fakeRpc({ data: { can_operate: true }, error: failure });
  await assert.rejects(getEffectiveContext(client, "VISO"), failure);
});

test("security: stop simulation preserves authorization errors", async () => {
  const failure = new Error("stop rpc refused");
  const { client } = fakeRpc({ data: true, error: failure });
  await assert.rejects(stopContextSimulation(client), failure);
});

test("security: two application requests retain isolated app-code arguments", async () => {
  const { client, calls } = fakeRpc((_name, args) => ({
    data: { app_code: args.p_app_code, can_operate: args.p_app_code === "VISO" },
    error: null,
  }));
  const viso = await getEffectiveContext(client, "VISO");
  const nexo = await getEffectiveContext(client, "NEXO");
  assert.equal(viso.app_code, "VISO");
  assert.equal(nexo.app_code, "NEXO");
  assert.equal(nexo.can_operate, false);
  assert.deepEqual(calls.map((call) => call.args.p_app_code), ["VISO", "NEXO"]);
});
