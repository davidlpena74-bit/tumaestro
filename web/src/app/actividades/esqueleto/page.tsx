import { Suspense } from 'react';
import EsqueletoClient from './EsqueletoClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <EsqueletoClient />
        </Suspense>
    );
}
