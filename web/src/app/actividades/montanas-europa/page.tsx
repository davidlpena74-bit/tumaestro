
import { Metadata } from 'next';
import MontanasEuropaClient from './MontanasEuropaClient';

export const metadata: Metadata = {
    title: 'Sistemas Montañosos de Europa - Juego | TuMaestro.es',
    description: 'Aprende las principales cordilleras y montañas de Europa en este mapa interactivo.',
};

export default function MontanasEuropaPage() {
    return <MontanasEuropaClient />;
}
