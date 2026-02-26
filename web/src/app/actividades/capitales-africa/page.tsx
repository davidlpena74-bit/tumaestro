import { Suspense } from 'react';
import { Metadata } from 'next';
import CapitalesAfricaClient from './CapitalesAfricaClient';

export const metadata: Metadata = {
    title: 'Capitales de África - Juego de Geografía | TuMaestro.es',
    description: 'Aprende las capitales de los países de África con este mapa interactivo.',
};

export default function AfricaCapitalsPage() {
    return (
        <Suspense fallback={null}>
            <CapitalesAfricaClient />
        </Suspense>
    );
}
