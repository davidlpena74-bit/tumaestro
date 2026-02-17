
import { Suspense } from 'react';
import { Metadata } from 'next';
import MaresEuropaClient from './MaresEuropaClient';

export const metadata: Metadata = {
    title: 'Mares y Océanos de Europa - Juego | TuMaestro.es',
    description: 'Ubica los principales mares, golfos y océanos que rodean el continente europeo.',
};

export default function MaresEuropaPage() {
    return (
        <Suspense fallback={null}>
            <MaresEuropaClient />
        </Suspense>
    );
}
