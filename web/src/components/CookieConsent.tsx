'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowConsent(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShowConsent(false);
        // Here you would normally initialize analytics, pixels, etc.
    };

    const rejectCookies = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-gray-900/90 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-fade-in-up">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-white font-bold text-lg mb-2">🍪 Uso de Cookies</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Utilizamos cookies propias y de terceros para mejorar su experiencia, analizar el tráfico y personalizar contenido.
                        Puede aceptar todas las cookies o gestionar sus preferencias. Para más información, consulte nuestra{' '}
                        <a href="/privacidad" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">Política de Privacidad</a>.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 min-w-[300px]">
                    <button
                        onClick={rejectCookies}
                        className="px-6 py-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition text-sm font-semibold"
                    >
                        Solo esenciales
                    </button>
                    <button
                        onClick={acceptCookies}
                        className="px-6 py-2.5 rounded-full bg-teal-500 text-white hover:bg-teal-400 transition shadow-lg shadow-teal-500/20 text-sm font-bold flex-1"
                    >
                        Aceptar todas
                    </button>
                </div>

            </div>
        </div>
    );
}
