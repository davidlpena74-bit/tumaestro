
import { Metadata } from 'next';
import MontanasAmericaClient from './MontanasAmericaClient';

export const metadata: Metadata = {
    title: 'Sistemas Montañosos de América - Juego | TuMaestro.es',
    description: 'Aprende las principales cordilleras de América, desde las Rocosas hasta los Andes.',
};

export default function MontanasAmericaPage() {
    return <MontanasAmericaClient />;
}
