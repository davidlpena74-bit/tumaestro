import { Suspense } from 'react';
import CelulaAnimalClient from './CelulaAnimalClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <CelulaAnimalClient />
        </Suspense>
    );
}
