
import { Metadata } from 'next';
import MontanasOceaniaClient from './MontanasOceaniaClient';

export const metadata: Metadata = {
    title: 'Sistemas Montañosos de Oceanía - Juego | TuMaestro.es',
    description: 'Identifica las cordilleras y sistemas montañosos de Australia y las islas de Oceanía.',
};

export default function MontanasOceaniaPage() {
    return <MontanasOceaniaClient />;
}
