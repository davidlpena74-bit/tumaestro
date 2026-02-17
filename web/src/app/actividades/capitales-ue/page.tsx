import { Suspense } from 'react';
import { Metadata } from 'next';
import CapitalesUeClient from './CapitalesUeClient';

export const metadata: Metadata = {
    title: 'Capitales de la Unión Europea - Juego Interactivo | TuMaestro.es',
    description: 'Aprende las capitales de los países miembros de la Unión Europea con este mapa interactivo. ¡Domina la geografía política de Europa!',
};

export default function EUCapitalsMapPage() {
    return (
        <Suspense fallback={null}>
            <CapitalesUeClient />
        </Suspense>
    );
}
