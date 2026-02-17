
import { Suspense } from 'react';
import { Metadata } from 'next';
import MaresAmericaClient from './MaresAmericaClient';

export const metadata: Metadata = {
    title: 'Mares y Océanos de América - Juego | TuMaestro.es',
    description: 'Ubica los océanos y mares que bañan las costas del continente americano.',
};

export default function MaresAmericaPage() {
    return (
        <Suspense fallback={null}>
            <MaresAmericaClient />
        </Suspense>
    );
}
