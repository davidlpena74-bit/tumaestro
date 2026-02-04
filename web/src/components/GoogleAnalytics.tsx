'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// Actualizado al ID de tu .env.local para evitar fallos si la prop de entorno no se inyecta
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-G8G47M0Q6W';

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        // Verificar consentimiento inicial
        const checkConsent = () => {
            const consent = localStorage.getItem('cookie-consent');
            if (consent === 'accepted') {
                setConsentGiven(true);
            }
        };

        checkConsent();

        window.addEventListener('storage', checkConsent);
        window.addEventListener('cookie-consent-updated', checkConsent);

        return () => {
            window.removeEventListener('storage', checkConsent);
            window.removeEventListener('cookie-consent-updated', checkConsent);
        };
    }, []);

    useEffect(() => {
        if (consentGiven && typeof window !== 'undefined') {
            // Aseguramos que dataLayer y gtag existan antes de llamar
            const win = window as any;
            win.dataLayer = win.dataLayer || [];
            if (!win.gtag) {
                win.gtag = function () {
                    win.dataLayer.push(arguments);
                };
            }

            const url = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
            
            // Registramos la vista de página
            win.gtag('config', GA_ID, {
                page_path: url,
            });
        }
    }, [pathname, searchParams, consentGiven]);

    if (!consentGiven) {
        return null;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                    `,
                }}
            />
        </>
    );
}
