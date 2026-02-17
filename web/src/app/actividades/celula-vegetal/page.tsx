import { Suspense } from 'react';
import CelulaVegetalClient from './CelulaVegetalClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <CelulaVegetalClient />
        </Suspense>
    );
}
