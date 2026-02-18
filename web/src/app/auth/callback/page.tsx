'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { CircleNotch } from '@phosphor-icons/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useToast } from '@/context/ToastContext';

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('Autenticando...');
    const { info, success } = useToast();
    const handledRef = useRef(false);

    useEffect(() => {
        const role = searchParams.get('role');

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if ((event === 'SIGNED_IN' || session) && !handledRef.current) {
                handledRef.current = true;
                setStatus('¡Sesión iniciada! Redirigiendo...');

                // If a role was passed in the URL, ensure it's set in the profile IF it's a new user
                if (session?.user && role) {
                    try {
                        // Determine if it is a new user (created_at vs last_sign_in_at)
                        // Note: During the very first sign in, they are identical or very close
                        const createdAt = new Date(session.user.created_at).getTime();
                        const lastSignInAt = new Date(session.user.last_sign_in_at || 0).getTime();
                        const isNewUser = Math.abs(lastSignInAt - createdAt) < 5000; // 5 seconds margin

                        if (!isNewUser) {
                            // Existing user: Inform them and PROTECT their role
                            info('Ya tenías una cuenta. ¡Bienvenido de nuevo!');
                        } else {
                            // New user: Initial role setup
                            await supabase
                                .from('profiles')
                                .update({ role: role })
                                .eq('id', session.user.id);

                            // Also update metadata if possible for consistency
                            await supabase.auth.updateUser({
                                data: { role: role }
                            });
                            success('¡Registro completado! Bienvenido a Tu Maestro.');
                        }
                    } catch (err) {
                        console.error('Error handling Google role:', err);
                    }
                }

                setTimeout(() => {
                    router.push('/');
                }, 500);
            } else if (event === 'SIGNED_OUT') {
                setStatus('No se pudo iniciar sesión. Redirigiendo al login...');
                setTimeout(() => router.push('/login'), 2000);
            }
        });

        const timeout = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => {
            subscription.unsubscribe();
            clearTimeout(timeout);
        };
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-xl text-white">
            <CircleNotch size={48} className="animate-spin text-teal-500 mb-4" />
            <h1 className="text-xl font-bold">{status}</h1>
            <p className="text-slate-400 mt-2 text-sm">Por favor espera un momento</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-xl text-white">
                <CircleNotch size={48} className="animate-spin text-teal-500 mb-4" />
                <h1 className="text-xl font-bold">Cargando...</h1>
            </div>
        }>
            <CallbackContent />
        </Suspense>
    );
}
