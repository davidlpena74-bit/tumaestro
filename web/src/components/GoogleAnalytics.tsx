'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// Define the GA ID
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-D9YEL7YQ1W';

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        // Check local storage for consent
        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'accepted') {
            setConsentGiven(true);
        }

        // Listen for storage events in case consent is updated in another component
        const handleStorageChange = () => {
            if (localStorage.getItem('cookie-consent') === 'accepted') {
                setConsentGiven(true);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        // Custom event for same-window updates
        window.addEventListener('cookie-consent-updated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cookie-consent-updated', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            // Send page view on route change
            const url = pathname + searchParams.toString();
            (window as any).gtag('config', GA_ID, {
                page_path: url,
            });
        }
    }, [pathname, searchParams]);

    // If we want to strictly block loading until consent, we can condition the script.
    // However, Consent Mode v2 prefers loading the script with "denied" consent by default.
    // For simplicity and strict GDPR compliance without complex setup, we will just 
    // load the script ONLY when consent is given OR if we assume implicit consent isn't allowed.
    // Given the user wants it to "work", we'll implement the standard approach:
    // Load script, but you can wrap it in consent check if desired. 
    //
    // BUT usually "Not working" means "Not navigating". 
    // The previous implementation WAS loading the script, so simple tracking should have worked.
    // The missing piece for Next.js is the pageview trigger on navigation.

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    // Default consent to denied if not already accepted
                    // gtag('consent', 'default', {
                    //     'analytics_storage': 'denied'
                    // });

                    gtag('config', '${GA_ID}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}
