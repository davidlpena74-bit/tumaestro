'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-G8G47M0Q6W';

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
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
        if (consentGiven && typeof window !== 'undefined' && (window as any).gtag) {
            const url = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
            (window as any).gtag('config', GA_ID, {
                page_path: url,
                // No enviamos User-ID aquí para que GA4 no fuerce la identidad de logeado
            });
        }
    }, [pathname, searchParams, consentGiven]);

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
                        // Inicialización por defecto sin esperar al estado de React
                        if (localStorage.getItem('cookie-consent') === 'accepted') {
                            gtag('config', '${GA_ID}', {
                                page_path: window.location.pathname + window.location.search
                            });
                        }
                    `,
                }}
            />
        </>
    );
}
