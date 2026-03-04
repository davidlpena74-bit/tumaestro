
import CapitalesAsiaClient from './CapitalesAsiaClient';

export const metadata = {
    title: 'Capitales de Asia | TuMaestro.es',
    description: 'Aprende las capitales de todos los países de Asia con este juego interactivo de mapas.',
};

import { Suspense } from 'react';
import CapitalesAsiaClient from './CapitalesAsiaClient';

export default function CapitalesAsiaPage() {
    return (
        <Suspense fallback={null}>
            <CapitalesAsiaClient />
        </Suspense>
    );
}
