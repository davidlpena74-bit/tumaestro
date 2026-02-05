'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { CircleNotch } from '@phosphor-icons/react';

export default function AuthCallbackPage() {
    const router = useRouter();
    const [status, setStatus] = useState('Autenticando...');

    useEffect(() => {
        // El cliente de Supabase procesa automáticamente el hash de la URL (#access_token=...)
        // al inicializarse. Solo necesitamos escuchar el cambio de estado.
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || session) {
                setStatus('¡Sesión iniciada! Redirigiendo...');
                // Pequeño delay para asegurar que el estado se propaga o para UX
                setTimeout(() => {
                    router.push('/'); 
                }, 500);
            } else if (event === 'SIGNED_OUT') {
                // Si por alguna razón falló o no hay sesión, mandamos al login
                 setStatus('No se pudo iniciar sesión. Redirigiendo al login...');
                 setTimeout(() => router.push('/login'), 2000);
            }
        });

        // Fallback: Si en 5 segundos no pasa nada, redirigir
        const timeout = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => {
            subscription.unsubscribe();
            clearTimeout(timeout);
        };
    }, [router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
            <CircleNotch size={48} className="animate-spin text-teal-500 mb-4" />
            <h1 className="text-xl font-bold">{status}</h1>
            <p className="text-slate-400 mt-2 text-sm">Por favor espera un momento</p>
        </div>
    );
}
