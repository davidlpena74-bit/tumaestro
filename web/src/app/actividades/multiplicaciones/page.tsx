import { Suspense } from 'react';
import { Metadata } from 'next';
import MultiplicationPageClient from '@/components/MultiplicationPageClient';

export const metadata: Metadata = {
    title: 'Multiplicación Visual: Aprende con Líneas | TuMaestro.es',
    description: 'Aprende a multiplicar de forma mágica y visual usando el método de las líneas. Ideal para niños que quieren ver cómo funcionan las matemáticas.',
    keywords: ['juego de multiplicaciones', 'matemáticas visuales', 'aprender a multiplicar', 'método japonés multiplicación', 'juegos educativos gratis'],
    alternates: {
        canonical: 'https://tumaestro.es/actividades/multiplicaciones',
    },
};

export default function MultiplicationPage() {
    return (
        <Suspense fallback={null}>
            <MultiplicationPageClient />
        </Suspense>
    );
}
