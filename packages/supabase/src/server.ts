import {
    createServerClient as createSupabaseServerClient,
    type CookieOptions,
} from '@supabase/ssr';

import {
    assertPublicSupabaseConfig,
    resolveCanonicalCookieOptions,
    type CookiePolicy,
    type CookieWriteMode,
} from './runtime.js';

export interface ServerReadableCookie {
    readonly name: string;
    readonly value: string;
}

export interface ServerWritableCookie extends ServerReadableCookie {
    readonly options: CookieOptions;
}

export interface ServerCookieAdapter {
    getAll(): Promise<readonly ServerReadableCookie[]> | readonly ServerReadableCookie[];
    setAll(cookies: readonly ServerWritableCookie[]): Promise<void> | void;
}

export interface ServerClientConfig {
    readonly url: string;
    readonly publicKey: string;
    readonly cookies: ServerCookieAdapter;
    readonly currentHost: string;
    readonly isSecureRequest: boolean;
    readonly cookiePolicy: CookiePolicy;
    readonly cookieWriteMode: CookieWriteMode;
}

export class ReadOnlyCookieWriteError extends Error {
    readonly code = 'VENTO_SUPABASE_COOKIE_WRITE_READ_ONLY' as const;
    readonly source = 'ADAPTER' as const;

    constructor() {
        super('Supabase session cookie write attempted in READ_ONLY mode');
        this.name = 'ReadOnlyCookieWriteError';
    }
}

function assertCookieAdapter(adapter: ServerCookieAdapter): void {
    if (adapter === null || typeof adapter !== 'object') throw new Error('cookies adapter is required');
    if (typeof adapter.getAll !== 'function') throw new Error('cookies.getAll must be a function');
    if (typeof adapter.setAll !== 'function') throw new Error('cookies.setAll must be a function');
}

function assertCookieWriteMode(mode: CookieWriteMode): void {
    if (mode !== 'READ_WRITE' && mode !== 'READ_ONLY') {
        throw new Error('cookieWriteMode must be READ_WRITE or READ_ONLY');
    }
}

export function createServerClient(config: ServerClientConfig) {
    const { url, publicKey } = assertPublicSupabaseConfig(config);
    assertCookieAdapter(config.cookies);
    assertCookieWriteMode(config.cookieWriteMode);
    const cookieOptions = resolveCanonicalCookieOptions({
        currentHost: config.currentHost,
        isSecureContext: config.isSecureRequest,
        cookiePolicy: config.cookiePolicy,
    });

    return createSupabaseServerClient(url, publicKey, {
        cookieOptions,
        cookies: {
            getAll: async () => {
                const cookies = await config.cookies.getAll();
                return cookies.map(({ name, value }) => ({ name, value }));
            },
            setAll: async (cookies) => {
                if (config.cookieWriteMode === 'READ_ONLY') throw new ReadOnlyCookieWriteError();
                await config.cookies.setAll(cookies);
            },
        },
    });
}