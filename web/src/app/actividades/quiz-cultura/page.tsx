import { Suspense } from 'react';
import QuizCulturaClient from './QuizCulturaClient';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <QuizCulturaClient />
        </Suspense>
    );
}
