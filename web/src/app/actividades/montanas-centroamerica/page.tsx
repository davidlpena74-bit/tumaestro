import { Suspense } from 'react';
import MontanasCentroamericaClient from './MontanasCentroamericaClient';

export const metadata = {
    title: 'Montañas de Centroamérica - Tu Maestro',
    description: 'Explora el relieve y los sistemas montañosos del istmo centroamericano.',
};

export default function MontanasCentroamericaPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
        </div>}>
            <MontanasCentroamericaClient />
        </Suspense>
    );
}
