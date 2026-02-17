import { Suspense } from 'react';
import { Metadata } from 'next';
import MapaSudamericaClient from './MapaSudamericaClient';

export const metadata: Metadata = {
    title: 'Mapa de Sudamérica - Juego de Geografía | TuMaestro.es',
    description: 'Aprende los países de América del Sur con este mapa interactivo. Desktop y móvil.',
};

export default function SouthAmericaGamePage() {
    return (
        <Suspense fallback={null}>
            <MapaSudamericaClient />
        </Suspense>
    );
}
