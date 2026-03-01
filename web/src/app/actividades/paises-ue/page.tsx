import { Suspense } from 'react';
import { Metadata } from 'next';
import PaisesUEClient from './PaisesUEClient';

export const metadata: Metadata = {
    title: 'Países de la Unión Europea - Juego de Geografía | TuMaestro.es',
    description: 'Aprende los países miembros de la Unión Europea con este mapa interactivo.',
};

export default function PaisesUEPage() {
    return (
        <Suspense fallback={null}>
            <PaisesUEClient />
        </Suspense>
    );
}
