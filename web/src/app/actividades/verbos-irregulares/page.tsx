import { Suspense } from 'react';
import VerbosIrregularesClient from './VerbosIrregularesClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerbosIrregularesClient />
        </Suspense>
    );
}
