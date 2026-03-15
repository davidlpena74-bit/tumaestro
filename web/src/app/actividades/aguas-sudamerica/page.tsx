import { Suspense } from 'react';
import AguasSudamericaClient from './AguasSudamericaClient';

export const metadata = {
    title: 'Aguas de Sudamérica - Tu Maestro',
    description: 'Localiza los grandes ríos, lagos y mares del continente sudamericano.',
};

export default function AguasSudamericaPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>}>
            <AguasSudamericaClient />
        </Suspense>
    );
}
