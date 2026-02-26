import { Suspense } from 'react';
import { Metadata } from 'next';
import MaresAfricaClient from './MaresAfricaClient';

export const metadata: Metadata = {
    title: 'Mares y Océanos de África - Juego | TuMaestro.es',
    description: 'Ubica los principales mares, golfos y océanos que rodean el continente africano.',
};

export default function MaresAfricaPage() {
    return (
        <Suspense fallback={null}>
            <MaresAfricaClient />
        </Suspense>
    );
}
