import { Suspense } from 'react';
import { Metadata } from 'next';
import CapitalesEuropaClient from './CapitalesEuropaClient';

export const metadata: Metadata = {
    title: 'Capitales de Europa - Juego de Geografía Interactiva | TuMaestro.es',
    description: '¿Conoces todas las capitales de Europa? Pon a prueba tu rapidez en este mapa interactivo y localiza cada país por su capital.',
};

export default function EuropeCapitalsMapPage() {
    return (
        <Suspense fallback={null}>
            <CapitalesEuropaClient />
        </Suspense>
    );
}
