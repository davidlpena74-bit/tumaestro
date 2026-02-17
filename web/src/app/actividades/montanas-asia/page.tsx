
import { Suspense } from 'react';
import { Metadata } from 'next';
import MontanasAsiaClient from './MontanasAsiaClient';

export const metadata: Metadata = {
    title: 'Sistemas Montañosos de Asia - Juego | TuMaestro.es',
    description: 'Descubre las grandes cordilleras de Asia, incluyendo el Himalaya y los Montes Urales.',
};

export default function MontanasAsiaPage() {
    return (
        <Suspense fallback={null}>
            <MontanasAsiaClient />
        </Suspense>
    );
}
