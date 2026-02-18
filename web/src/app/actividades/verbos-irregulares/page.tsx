import { Metadata } from 'next';
import { Suspense } from 'react';
import VerbosIrregularesClient from './VerbosIrregularesClient';

export const metadata: Metadata = {
    title: 'Verbos Irregulares | Tu Maestro',
    description: 'Practica la escritura de los 50 verbos irregulares más comunes en inglés.'
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerbosIrregularesClient />
        </Suspense>
    );
}
