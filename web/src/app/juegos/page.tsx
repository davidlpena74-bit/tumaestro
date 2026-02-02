import { Metadata } from 'next';
import JuegosClient from '@/components/JuegosClient';

export const metadata: Metadata = {
    title: 'Juegos Educativos Interactivos | Aprende Jugando Gratis',
    description: '¡Aprende jugando! Mapas interactivos, anatomía 3D y juegos de matemáticas. Cuentos infantiles narrados gratis en 4 idiomas y retos educativos para niños.',
    keywords: ['juegos educativos gratis', 'mapas interactivos', 'geografia niños', 'juegos matematicas', 'cuentos infantiles narrados', 'aprender idiomas jugando'],
    alternates: {
        canonical: 'https://tumaestro.es/juegos',
    },
};

export default function JuegosPage() {
    return <JuegosClient />;
}
