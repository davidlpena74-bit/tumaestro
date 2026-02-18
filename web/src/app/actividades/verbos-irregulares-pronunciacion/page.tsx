import { Metadata } from 'next';
import { Suspense } from 'react';
import VerbosIrregularesPronunciacionClient from './VerbosIrregularesPronunciacionClient';

export const metadata: Metadata = {
    title: 'Verbos Irregulares | Tu Maestro',
    description: 'Practica la pronunciación de los 50 verbos irregulares con reconocimiento de voz.'
};

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando juego...</div>}>
            <VerbosIrregularesPronunciacionClient />
        </Suspense>
    );
}
