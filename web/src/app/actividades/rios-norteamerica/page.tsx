import { Suspense } from 'react';
import RiosNorteamericaClient from './RiosNorteamericaClient';

export const metadata = {
    title: 'Ríos de América del Norte - Tu Maestro',
    description: 'Aprende a localizar los principales ríos de América del Norte: Mississippi, Missouri, Rio Grande, Yukón, Mackenzie y San Lorenzo.',
};

export default function RiosNorteamericaPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        }>
            <RiosNorteamericaClient />
        </Suspense>
    );
}
