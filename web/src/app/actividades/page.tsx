import { Metadata } from 'next';
import ActividadesClient from '@/components/ActividadesClient';

export const metadata: Metadata = {
    title: 'Actividades Educativas Interactivas | Aprende Jugando Gratis',
    description: '¡Aprende con nuestras actividades interactivas! Mapas, anatomía 3D y juegos de matemáticas. Cuentos infantiles narrados gratis en 4 idiomas y retos educativos para niños.',
    keywords: ['actividades educativas', 'juegos interactivos', 'mapas interactivos', 'geografia niños', 'juegos matematicas', 'cuentos infantiles narrados', 'aprender idiomas jugando'],
    alternates: {
        canonical: 'https://tumaestro.es/actividades',
    },
};

export default function ActividadesPage() {
    return <ActividadesClient />;
}
