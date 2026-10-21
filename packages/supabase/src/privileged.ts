import { createClient as createSupabaseClient } from '@supabase/supabase-js';

import {
    assertPrivilegedSupabaseKey,
    assertSupabaseUrl,
} from './runtime.js';

export interface PrivilegedClientConfig {
    readonly url: string;
    readonly serviceRoleKey: string;
}

export function createPrivilegedClient(config: PrivilegedClientConfig) {
    const url = assertSupabaseUrl(config.url);
    const serviceRoleKey = assertPrivilegedSupabaseKey(config.serviceRoleKey);

    return createSupabaseClient(url, serviceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    });
}