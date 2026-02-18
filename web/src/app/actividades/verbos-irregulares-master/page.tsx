import { Metadata } from 'next';
import { Suspense } from 'react';
import VerbosIrregularesMasterClient from './VerbosIrregularesMasterClient';

export const metadata: Metadata = {
    title: 'Verbos Irregulares MASTER | Tu Maestro',
    description: 'El desafío definitivo de escritura con 150 verbos irregulares.'
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerbosIrregularesMasterClient />
        </Suspense>
    );
}
