import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Material Didáctico y Apuntes Gratis',
    description: 'Biblioteca digital de recursos educativos. Descarga gratis apuntes, exámenes resueltos, resúmenes y ejercicios de Matemáticas, Lengua, Historia y Geografía.',
    keywords: ['material didactico', 'apuntes gratis', 'examenes resueltos', 'recursos educativos', 'ejercicios matematicas', 'resumenes historia'],
};

export default function ResourcesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
