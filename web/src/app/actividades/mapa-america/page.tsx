import { Suspense } from 'react';
import { Metadata } from 'next';
import MapaAmericaClient from './MapaAmericaClient';

export const metadata: Metadata = {
    title: 'Mapa de América - Juego de Geografía | TuMaestro.es',
    description: 'Juego interactivo para aprender los países de América. Pon a prueba tus conocimientos de geografía ubicando naciones de Norte, Centro y Sudamérica.',
};

export default function AmericaMapPage() {
    return (
        <Suspense fallback={null}>
            <MapaAmericaClient />
        </Suspense>
    );
}
