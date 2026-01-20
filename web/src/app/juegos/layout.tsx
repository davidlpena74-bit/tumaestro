import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Juegos Educativos Online: Geografía y Cultura',
    description: 'Aprende divirtiéndote con nuestros juegos educativos interactivos. Mapas de España, Quiz de Cultura General y retos de Geografía para estudiantes.',
    keywords: ['juegos educativos', 'mapa interactivo españa', 'quiz cultura general', 'aprender jugando', 'geografia interactiva', 'juegos primaria eso'],
};

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
