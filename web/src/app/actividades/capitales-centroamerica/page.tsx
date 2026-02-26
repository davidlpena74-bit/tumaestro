import { Suspense } from 'react';
import { Metadata } from 'next';
import CapitalesCentroamericaClient from './CapitalesCentroamericaClient';

export const metadata: Metadata = {
    title: 'Capitales de Centroamérica - Juego de Geografía | TuMaestro.es',
    description: 'Relaciona cada país centroamericano con su capital en este juego de mapa.',
};

export default function CentralAmericaCapitalsPage() {
    return (
        <Suspense fallback={null}>
            <CapitalesCentroamericaClient />
        </Suspense>
    );
}
