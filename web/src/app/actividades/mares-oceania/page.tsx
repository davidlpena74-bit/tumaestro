
import { Suspense } from 'react';
import { Metadata } from 'next';
import MaresOceaniaClient from './MaresOceaniaClient';

export const metadata: Metadata = {
    title: 'Mares y Océanos de Oceanía - Juego | TuMaestro.es',
    description: 'Explora los mares y océanos que rodean las islas de Oceanía.',
};

export default function MaresOceaniaPage() {
    return (
        <Suspense fallback={null}>
            <MaresOceaniaClient />
        </Suspense>
    );
}
