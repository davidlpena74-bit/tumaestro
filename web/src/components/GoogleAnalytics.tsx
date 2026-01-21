'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-DMBKGQVTEE';

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        // Check local storage for consent
        const checkConsent = () => {
            const consent = localStorage.getItem('cookie-consent');
            if (consent === 'accepted') {
                setConsentGiven(true);
            }
        };

        checkConsent();

        // Listen for storage events in case consent is updated in another component
        window.addEventListener('storage', checkConsent);
        // Custom event for same-window updates
        window.addEventListener('cookie-consent-updated', checkConsent);

        return () => {
            window.removeEventListener('storage', checkConsent);
            window.removeEventListener('cookie-consent-updated', checkConsent);
        };
    }, []);

    useEffect(() => {
        // Si hay consentimiento, trackeamos la navegación
        if (consentGiven && typeof window !== 'undefined' && (window as any).gtag) {
            const url = pathname + searchParams.toString();
            (window as any).gtag('config', GA_ID, {
                page_path: url,
            });
        }
    }, [pathname, searchParams, consentGiven]);

    // Si no hay consentimiento, no renderizamos NADA (GDPR Compliance)
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
            
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}
