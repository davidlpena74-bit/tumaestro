import { Metadata } from 'next';
import EuropeCapitalsMatchClient from './EuropeCapitalsMatchClient';

export const metadata: Metadata = {
    title: 'Puzzle: Capitales de Europa - Juego Interactivo | TuMaestro.es',
    description: 'Completa el mapa de Europa arrastrando cada capital a su país. Un reto educativo divertido para todas las edades.',
};

import { Suspense } from 'react';

export default function EuropeCapitalsMatchPage() {
    return (
        <Suspense fallback={null}>
            <EuropeCapitalsMatchClient />
        </Suspense>
    );
}
