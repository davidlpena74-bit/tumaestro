import { Suspense } from 'react';
import { Metadata } from 'next';
import CapitalesSudamericaClient from './CapitalesSudamericaClient';

export const metadata: Metadata = {
    title: 'Capitales de Sudamérica - Juego de Geografía | TuMaestro.es',
    description: 'Aprende las capitales de los países de América del Sur con este mapa interactivo.',
};

export default function SouthAmericaCapitalsPage() {
    return (
        <Suspense fallback={null}>
            <CapitalesSudamericaClient />
        </Suspense>
    );
}
