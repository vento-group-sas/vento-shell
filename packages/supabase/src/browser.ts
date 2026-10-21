import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';

import {
    assertPublicSupabaseConfig,
    resolveCanonicalCookieOptions,
    type CookiePolicy,
} from './runtime.js';

export interface BrowserClientConfig {
    readonly url: string;
    readonly publicKey: string;
    readonly currentHost?: string;
    readonly isSecureContext: boolean;
    readonly cookiePolicy: CookiePolicy;
}

export function createBrowserClient(config: BrowserClientConfig) {
    const { url, publicKey } = assertPublicSupabaseConfig(config);
    const cookieOptions = resolveCanonicalCookieOptions({
        currentHost: config.currentHost,
        isSecureContext: config.isSecureContext,
        cookiePolicy: config.cookiePolicy,
    });

    return createSupabaseBrowserClient(url, publicKey, {
        cookieOptions,
        isSingleton: false,
    });
}