import { Metadata } from 'next';
import { Suspense } from 'react';
import VerbosIrregularesMasterPronunciacionClient from './VerbosIrregularesMasterPronunciacionClient';

export const metadata: Metadata = {
    title: 'Verbos Irregulares MASTER | Tu Maestro',
    description: 'El reto supremo de voz: 150 verbos para sonar como un nativo.'
};

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando juego...</div>}>
            <VerbosIrregularesMasterPronunciacionClient />
        </Suspense>
    );
}
