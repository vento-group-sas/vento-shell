export type PermissionScope = {
  siteId: string | null;
  roleKey: string | null;
};

export type PermissionState = PermissionScope & {
  userId: string | null;
  ready: boolean;
  map: Readonly<Record<string, boolean>>;
};

export type PermissionAdapters = {
  getAuthenticatedUserId: () => Promise<string | null>;
  subscribeToAuthChanges: (callback: (event: string) => void) => () => void;
  hasPermission: (code: string, siteId: string) => Promise<boolean>;
};

export function emptyPermissionState(): PermissionState {
  return { siteId: null, roleKey: null, userId: null, ready: false, map: {} };
}

/**
 * Client-side navigation is a convenience, never an authorization boundary.
 * Auth identity is verified with getUser; business reads remain protected by RLS.
 */
export function createPermissionSessionGuard(
  adapters: PermissionAdapters,
  codes: readonly string[],
  onState: (state: PermissionState) => void,
) {
  let started = false;
  let disposed = false;
  let unsubscribe = () => {};
  let authGeneration = 0;
  let permissionGeneration = 0;
  let authVerified = false;
  let userId: string | null = null;
  let scope: PermissionScope = { siteId: null, roleKey: null };
  let state = emptyPermissionState();

  const publish = (next: PermissionState) => {
    if (disposed) return;
    state = next;
    onState(next);
  };

  const refreshPermissions = () => {
    const generation = ++permissionGeneration;
    const requestedUser = userId;
    const { siteId, roleKey } = scope;
    publish({ siteId, roleKey, userId: requestedUser, ready: false, map: {} });

    if (!authVerified || !requestedUser || !siteId) return;

    void Promise.all(
      codes.map((code) =>
        Promise.resolve()
          .then(() => adapters.hasPermission(code, siteId))
          .then((allowed) => allowed === true, () => false),
      ),
    ).then((values) => {
      if (
        disposed ||
        generation !== permissionGeneration ||
        requestedUser !== userId ||
        siteId !== scope.siteId ||
        roleKey !== scope.roleKey
      ) return;

      const map: Record<string, boolean> = {};
      codes.forEach((code, index) => {
        map[code] = values[index] === true;
      });
      publish({ siteId, roleKey, userId: requestedUser, ready: true, map });
    });
  };

  const verifyIdentity = () => {
    const generation = ++authGeneration;
    authVerified = false;
    userId = null;
    refreshPermissions();

    void Promise.resolve()
      .then(() => adapters.getAuthenticatedUserId())
      .then((nextId) => {
        if (disposed || generation !== authGeneration) return;
        userId = nextId;
        authVerified = true;
        refreshPermissions();
      })
      .catch(() => {
        if (disposed || generation !== authGeneration) return;
        userId = null;
        authVerified = true;
        refreshPermissions();
      });
  };

  return {
    start() {
      if (started || disposed) return;
      started = true;
      unsubscribe = adapters.subscribeToAuthChanges((event) => {
        if (event === "INITIAL_SESSION" || disposed) return;
        const generation = ++authGeneration;
        authVerified = false;
        userId = null;
        refreshPermissions();

        // Supabase recommends avoiding async Auth calls inside the callback.
        queueMicrotask(() => {
          if (!disposed && generation === authGeneration) verifyIdentity();
        });
      });
      verifyIdentity();
    },

    setScope(next: PermissionScope) {
      if (disposed) return;
      if (next.siteId === scope.siteId && next.roleKey === scope.roleKey) return;
      scope = next;
      refreshPermissions();
    },

    getState(): PermissionState {
      return state;
    },

    dispose() {
      if (disposed) return;
      disposed = true;
      authGeneration++;
      permissionGeneration++;
      unsubscribe();
    },
  };
}
