import { Suspense } from 'react';
import VerbosIrregularesMasterClient from './VerbosIrregularesMasterClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerbosIrregularesMasterClient />
        </Suspense>
    );
}
