import { Metadata } from 'next';
import MontanasEspanaClient from './MontanasEspanaClient';

export const metadata: Metadata = {
    title: 'Sistemas Montañosos de España - Juego | TuMaestro.es',
    description: 'Ubica los principales sistemas montañosos y cordilleras de España en este mapa interactivo.',
};

export default function MontanasEspanaPage() {
    return <MontanasEspanaClient />;
}
