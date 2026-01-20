'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-D9YEL7YQ1W';

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [debugStatus, setDebugStatus] = useState<string>('Iniciando GA...');

    useEffect(() => {
        // FORCE LOAD: Ignoramos el consentimiento para debug
        // FORCE EVENT: Enviamos evento de página
        if (typeof window !== 'undefined' && (window as any).gtag) {
            setDebugStatus(`Enviando PageView: ${pathname}`);
            (window as any).gtag('config', GA_ID, {
                page_path: pathname + searchParams.toString(),
                debug_mode: true, // FORZADO SIEMPRE
            });
        }
    }, [pathname, searchParams]);

    return (
        <>
            {/* Indicador visual de Debug para el móvil */}
            <div style={{
                position: 'fixed',
                bottom: '10px',
                left: '10px',
                zIndex: 9999,
                background: 'rgba(0,0,0,0.8)',
                color: '#0f0',
                padding: '4px 8px',
                fontSize: '10px',
                pointerEvents: 'none',
                borderRadius: '4px'
            }}>
                GA: {debugStatus}
            </div>

            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                onLoad={() => setDebugStatus('Script Cargado OK')}
                onError={(e) => setDebugStatus('ERROR DE CARGA (Bloqueado)')}
            />
            <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configuración inicial FORZADA
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              debug_mode: true, 
            });
            console.log('GA Force Initialized');
          `,
                }}
            />
        </>
    );
}
