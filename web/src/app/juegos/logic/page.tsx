import { Suspense } from 'react';
import LogicClient from './LogicClient';

export default function LogicPage() {
    return (
        <Suspense fallback={null}>
            <LogicClient />
        </Suspense>
    );
}
