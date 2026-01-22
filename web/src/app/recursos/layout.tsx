import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Recursos y Apuntes Gratuitos | TuMaestro.es',
    description: 'Descarga apuntes de matemáticas, lengua, historia y más. Material didáctico verificado por profesores.',
};

export default function RecursosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
