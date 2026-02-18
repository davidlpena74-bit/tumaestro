import { Metadata } from 'next';
import { Suspense } from 'react';
import VerbosIrregularesProPronunciacionClient from './VerbosIrregularesProPronunciacionClient';

export const metadata: Metadata = {
    title: 'Verbos Irregulares PRO | Tu Maestro',
    description: 'Mejora tu fluidez hablando 100 verbos irregulares avanzados.'
};

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando juego...</div>}>
            <VerbosIrregularesProPronunciacionClient />
        </Suspense>
    );
}
