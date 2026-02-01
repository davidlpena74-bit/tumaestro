'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { CircleNotch } from '@phosphor-icons/react';

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        // Handle the OAuth callback
        const handleAuthCallback = async () => {
            // Check for existing session or handle potential hash fragment
            const { data: { session }, error } = await supabase.auth.getSession();

            if (session) {
                // If we have a session, redirect to home
                router.replace('/');
            } else {
                // Wait for the auth state change which usually fires after processing the hash
                const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                        if (session) {
                            router.replace('/');
                        }
                    }
                });

                // If after a short timeout we still have nothing (and no hash), redirect to login
                // But generally with #access_token present, the client should pick it up.
            }
        };

        handleAuthCallback();
    }, [router]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[120px]" />

            <div className="z-10 flex flex-col items-center gap-4 p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
                <CircleNotch size={48} className="animate-spin text-slate-800" />
                <p className="text-slate-600 font-bold animate-pulse">Autenticando...</p>
            </div>
        </div>
    );
}
