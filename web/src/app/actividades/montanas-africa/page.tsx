import { Suspense } from 'react';
import { Metadata } from 'next';
import MontanasAfricaClient from './MontanasAfricaClient';

export const metadata: Metadata = {
    title: 'Sistemas Montañosos de África - Juego | TuMaestro.es',
    description: 'Aprende las principales cordilleras y montañas de África en este mapa interactivo.',
};

export default function MontanasAfricaPage() {
    return (
        <Suspense fallback={null}>
            <MontanasAfricaClient />
        </Suspense>
    );
}
