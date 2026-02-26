import { Suspense } from 'react';
import { Metadata } from 'next';
import CapitalesUSAClient from './CapitalesUSAClient';

export const metadata: Metadata = {
    title: 'Capitales de los Estados de EE.UU. - Juego de Geografía | TuMaestro.es',
    description: 'Aprende las capitales de los 51 estados de EE.UU. con este juego interactivo.',
};

export default function USACapitalsPage() {
    return (
        <Suspense fallback={null}>
            <CapitalesUSAClient />
        </Suspense>
    );
}
