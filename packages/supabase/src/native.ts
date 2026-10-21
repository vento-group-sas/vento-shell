import { createClient as createSupabaseClient } from '@supabase/supabase-js';

import {
    assertNativeSessionStorage,
    assertPublicSupabaseConfig,
    type NativeSessionStorage,
} from './runtime.js';

export interface NativeClientConfig {
    readonly url: string;
    readonly publicKey: string;
    readonly storage: NativeSessionStorage;
}

export function createNativeClient(config: NativeClientConfig) {
    const { url, publicKey } = assertPublicSupabaseConfig(config);
    const storage = assertNativeSessionStorage(config.storage);

    return createSupabaseClient(url, publicKey, {
        auth: {
            storage,
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false,
        },
    });
}