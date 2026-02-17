import { Suspense } from 'react';
import MusculosClient from './MusculosClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <MusculosClient />
        </Suspense>
    );
}
