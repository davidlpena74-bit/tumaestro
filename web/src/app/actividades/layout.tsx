import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Juegos Educativos Interactivos | TuMaestro.es',
    description: 'Aprende geografía, matemáticas e idiomas jugando. Mapas interactivos de España y Europa, cálculo mental y más.',
};

export default function JuegosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
