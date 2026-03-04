import { Suspense } from 'react';
import { Metadata } from 'next';
import CapitalesAsiaClient from './CapitalesAsiaClient';

export const metadata: Metadata = {
    title: 'Capitales de Asia | TuMaestro.es',
    description: 'Aprende las capitales de todos los países de Asia con este juego interactivo de mapas.',
};

export default function CapitalesAsiaPage() {
    return (
        <Suspense fallback={null}>
            <CapitalesAsiaClient />
        </Suspense>
    );
}
