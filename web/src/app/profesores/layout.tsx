import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profesores Particulares Online y Presenciales',
    description: 'Encuentra los mejores profesores particulares verificados de Matemáticas, Inglés, Física, Química y más. Clases a medida online o presenciales.',
    keywords: ['profesores particulares', 'clases online', 'profesor matematicas', 'profesor ingles', 'clases apoyo', 'tutorias'],
};

export default function TeachersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
