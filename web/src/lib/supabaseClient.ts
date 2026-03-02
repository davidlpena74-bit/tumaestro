import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-key'

// Custom fetch wrapper to swallow AbortErrors that cause disruptive overlays in Next.js Turbopack
const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
        return await fetch(input, init);
    } catch (err: any) {
        const errStr = err?.message || (typeof err === 'string' ? err : '');
        const isAbort =
            err?.name === 'AbortError' ||
            errStr.includes('aborted') ||
            errStr.includes('signal is aborted') ||
            errStr.includes('aborted without reason');

        if (isAbort) {
            // Return a simulated, non-throwing 499 HTTP response to prevent Turbopack overlay crashes
            return new Response(JSON.stringify({
                error: "AbortError",
                message: "Request aborted internally (swallowed gracefully)",
                isSwallowed: true
            }), {
                status: 200, // Using 200 but with empty/error body to be even safer
                statusText: "OK",
                headers: { 'Content-Type': 'application/json' }
            });
        }
        throw err;
    }
};

const client = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
        fetch: customFetch
    },
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

// Ultimate shield: Wrap auth methods that frequently trigger AbortErrors during HMR/Navigation
const originalGetSession = client.auth.getSession.bind(client.auth);
const originalGetUser = client.auth.getUser.bind(client.auth);

client.auth.getSession = async () => {
    try {
        return await originalGetSession();
    } catch (err: any) {
        const errStr = err?.message || (typeof err === 'string' ? err : '');
        const isAbort =
            err?.name === 'AbortError' ||
            errStr.includes('aborted') ||
            errStr.includes('signal is aborted') ||
            errStr.includes('aborted without reason');

        if (isAbort) {
            console.debug('SupabaseClient: Swallowed auth.getSession AbortError');
            return { data: { session: null }, error: null };
        }
        throw err;
    }
};

client.auth.getUser = async (token?: string) => {
    try {
        return await originalGetUser(token);
    } catch (err: any) {
        const errStr = err?.message || (typeof err === 'string' ? err : '');
        const isAbort =
            err?.name === 'AbortError' ||
            errStr.includes('aborted') ||
            errStr.includes('signal is aborted') ||
            errStr.includes('aborted without reason');

        if (isAbort) {
            console.debug('SupabaseClient: Swallowed auth.getUser AbortError');
            return { data: { user: null }, error: null };
        }
        throw err;
    }
};

export const supabase = client;
