import { Suspense } from 'react';
import RiddlesClient from './RiddlesClient';

export default function RiddlesPage() {
    return (
        <Suspense fallback={null}>
            <RiddlesClient />
        </Suspense>
    );
}
