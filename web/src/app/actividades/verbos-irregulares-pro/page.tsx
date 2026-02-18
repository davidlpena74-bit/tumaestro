import { Metadata } from 'next';
import { Suspense } from 'react';
import VerbosIrregularesProClient from './VerbosIrregularesProClient';

export const metadata: Metadata = {
    title: 'Verbos Irregulares PRO | Tu Maestro',
    description: 'Reto de escritura con 100 verbos irregulares para nivel avanzado.'
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerbosIrregularesProClient />
        </Suspense>
    );
}
