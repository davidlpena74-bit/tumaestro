import { Suspense } from 'react';
import SistemaReproductorFemeninoClient from './SistemaReproductorFemeninoClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <SistemaReproductorFemeninoClient />
        </Suspense>
    );
}
