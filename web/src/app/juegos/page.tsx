import { Metadata } from 'next';
import JuegosClient from '@/components/JuegosClient';

export const metadata: Metadata = {
    title: 'Juegos Educativos Interactivos | Aprende Jugando',
    description: 'Explora nuestra colección de juegos educativos gratuitos. Geografía, matemáticas, biología y más. Diviértete mientras aprendes con retos interactivos para todas las edades.',
    keywords: ['juegos educativos', 'mapas interactivos', 'geografía para niños', 'juegos de matemáticas', 'aprender jugando', 'retos educativos'],
    alternates: {
        canonical: 'https://tumaestro.es/juegos',
    },
};

export default function JuegosPage() {
    return <JuegosClient />;
}
