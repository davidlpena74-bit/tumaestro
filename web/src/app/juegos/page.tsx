import { Metadata } from 'next';
import NewGamesClient from '@/components/NewGamesClient';

export const metadata: Metadata = {
    title: 'Nueva Zona de Juegos | Aprende Jugando Gratis',
    description: 'Descubre nuestra nueva colección de juegos educativos. Divertidos, interactivos y gratis. Aprende geografía y ciencias jugando.',
    keywords: ['juegos educativos', 'aprender jugando', 'geografia interactiva', 'ciencias naturales'],
    alternates: {
        canonical: 'https://tumaestro.es/juegos',
    },
};

export default function JuegosPage() {
    return <NewGamesClient />;
}
