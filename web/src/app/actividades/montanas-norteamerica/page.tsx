import { Suspense } from 'react';
import MontanasNorteamericaClient from './MontanasNorteamericaClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <MontanasNorteamericaClient />
        </Suspense>
    );
}
