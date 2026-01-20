'use client';

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define the GA ID
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-D9YEL7YQ1W';

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
        // Manually trigger pageview if needed, but @next/third-parties handles basic tracking.
        // However, we want to ensure config is sent upon PageView in Next.js App Router.
        // The GoogleAnalytics component from @next/third-parties AUTOMATICALLY handles pathname changes.
        // We just need to render it.
    }, [pathname, searchParams]);

    // Render nothing if consent is not given.
    if (!consentGiven) {
        return null;
    }

    return <NextGoogleAnalytics gaId={GA_ID} />;
}
