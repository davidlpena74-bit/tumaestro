import { Metadata } from 'next';
import { Suspense } from 'react';
import VerbosIrregularesClient from './VerbosIrregularesClient';

export const metadata: Metadata = {
    title: 'Verbos Irregulares en Inglés | Aprende Gratis con Pronunciación',
    description: 'Practica la escritura y pronunciación de los verbos irregulares más importantes del inglés con nuestro juego interactivo. Varios niveles de dificultad desde básico hasta master.',
    keywords: ['verbos irregulares ingles', 'aprender ingles gratis', 'ejercicios verbos irregulares', 'pronunciacion ingles', 'verbos irregulares audio', 'juegos para aprender ingles'],
    alternates: {
        canonical: '/actividades/verbos-irregulares',
    }
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerbosIrregularesClient />
        </Suspense>
    );
}
