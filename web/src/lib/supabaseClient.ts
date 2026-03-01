import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-key'

// Custom fetch wrapper to swallow AbortErrors that cause disruptive overlays in Next.js Turbopack
const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
        return await fetch(input, init);
    } catch (err: any) {
        if (err?.name === 'AbortError' || err?.message?.includes('aborted')) {
            // Return a simulated, non-throwing 499 HTTP response to prevent Turbopack overlay crashes
            return new Response(JSON.stringify({
                error: "AbortError",
                message: "Request aborted internally (swallowed gracefully)"
            }), {
                status: 499,
                statusText: "Client Closed Request",
                headers: { 'Content-Type': 'application/json' }
            });
        }
        throw err;
    }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
        fetch: customFetch
    }
})
