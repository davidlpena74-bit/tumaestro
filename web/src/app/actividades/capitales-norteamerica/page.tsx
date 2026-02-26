import { Suspense } from 'react';
import { Metadata } from 'next';
import CapitalesNorteamericaClient from './CapitalesNorteamericaClient';

export const metadata: Metadata = {
    title: 'Capitales de Norteamérica - Juego de Geografía | TuMaestro.es',
    description: 'Ubica las capitales de los países de América del Norte y el Caribe con este mapa interactivo.',
};

export default function NorthAmericaCapitalsPage() {
    return (
        <Suspense fallback={null}>
            <CapitalesNorteamericaClient />
        </Suspense>
    );
}
