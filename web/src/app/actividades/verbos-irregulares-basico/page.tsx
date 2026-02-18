import { Metadata } from 'next';
import { Suspense } from 'react';
import VerbosIrregularesBasicoClient from './VerbosIrregularesBasicoClient';

export const metadata: Metadata = {
    title: 'Verbos Irregulares BÁSICO | Tu Maestro',
    description: 'Aprende los 25 verbos irregulares más comunes con este reto de escritura.'
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerbosIrregularesBasicoClient />
        </Suspense>
    );
}
