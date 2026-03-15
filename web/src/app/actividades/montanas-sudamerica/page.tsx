import { Suspense } from 'react';
import MontanasSudamericaClient from './MontanasSudamericaClient';

export const metadata = {
    title: 'Montañas de Sudamérica - Tu Maestro',
    description: 'Explora la gran cordillera de los Andes y otros sistemas montañosos en Sudamérica.',
};

export default function MontanasSudamericaPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
        </div>}>
            <MontanasSudamericaClient />
        </Suspense>
    );
}
