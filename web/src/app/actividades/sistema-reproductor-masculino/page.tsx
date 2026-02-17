import { Suspense } from 'react';
import SistemaReproductorMasculinoClient from './SistemaReproductorMasculinoClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <SistemaReproductorMasculinoClient />
        </Suspense>
    );
}
