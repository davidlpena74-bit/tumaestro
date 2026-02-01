import { Metadata } from 'next';
import JuegosClient from '@/components/JuegosClient';

export const metadata: Metadata = {
    title: 'Juegos Educativos Interactivos | Aprende Jugando',
    description: '¡Aprende jugando! Mapas interactivos, cuerpo humano en 3D y juegos de matemáticas. Diversión educativa gratis para primaria y secundaria.',
    keywords: ['juegos educativos', 'mapas interactivos', 'geografía para niños', 'juegos de matemáticas', 'aprender jugando', 'retos educativos'],
    alternates: {
        canonical: 'https://tumaestro.es/juegos',
    },
};

export default function JuegosPage() {
    return <JuegosClient />;
}
