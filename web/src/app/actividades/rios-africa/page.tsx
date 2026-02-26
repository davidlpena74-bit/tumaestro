import { Suspense } from 'react';
import { Metadata } from 'next';
import RiosAfricaClient from './RiosAfricaClient';

export const metadata: Metadata = {
    title: 'Ríos de África - Juego de Hidrografía Interactiva | TuMaestro.es',
    description: 'Aprende los ríos más importantes de África: el Nilo, el Congo, el Níger y muchos más. ¡Ponte a prueba en nuestro mapa interactivo gratuito!',
};

export default function RiosAfricaPage() {
    return (
        <Suspense fallback={null}>
            <RiosAfricaClient />
        </Suspense>
    );
}
