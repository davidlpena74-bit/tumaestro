import { Suspense } from 'react';
import VerbosIrregularesProClient from './VerbosIrregularesProClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerbosIrregularesProClient />
        </Suspense>
    );
}
