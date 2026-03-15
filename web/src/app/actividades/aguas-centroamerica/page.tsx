import { Suspense } from 'react';
import AguasCentroamericaClient from './AguasCentroamericaClient';

export const metadata = {
    title: 'Aguas de Centroamérica - Tu Maestro',
    description: 'Encuentra los principales ríos, lagos y mares de la región centroamericana.',
};

export default function AguasCentroamericaPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>}>
            <AguasCentroamericaClient />
        </Suspense>
    );
}
