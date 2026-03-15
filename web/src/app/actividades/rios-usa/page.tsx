import { Suspense } from 'react';
import RiosUSAClient from './RiosUSAClient';

export const metadata = {
    title: 'Ríos y Lagos de EE.UU. - Tu Maestro',
    description: 'Aprende los principales ríos y lagos de los Estados Unidos en este mapa interactivo.',
};

export default function RiosUSAPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>}>
            <RiosUSAClient />
        </Suspense>
    );
}
