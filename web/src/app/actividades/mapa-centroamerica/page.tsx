import { Suspense } from 'react';
import { Metadata } from 'next';
import MapaCentroamericaClient from './MapaCentroamericaClient';

export const metadata: Metadata = {
    title: 'Países de Centroamérica - Juego de Geografía | TuMaestro.es',
    description: 'Aprende los países del istmo centroamericano con este mapa interactivo.',
};

export default function CentralAmericaMapPage() {
    return (
        <Suspense fallback={null}>
            <MapaCentroamericaClient />
        </Suspense>
    );
}
