import { Metadata } from 'next';
import { Suspense } from 'react';
import VerbosIrregularesBasicoPronunciacionClient from './VerbosIrregularesBasicoPronunciacionClient';

export const metadata: Metadata = {
    title: 'Verbos Irregulares BÁSICO (Voz) | Tu Maestro',
    description: 'Mejora tu fluidez practicando los 25 verbos irregulares básicos.'
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerbosIrregularesBasicoPronunciacionClient />
        </Suspense>
    );
}
