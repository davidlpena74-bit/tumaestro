import { Metadata } from 'next';
import ProfesoresClient from '@/components/ProfesoresClient';

export const metadata: Metadata = {
    title: 'Profesores Particulares Online y Presenciales | TuMaestro.es',
    description: 'Conecta con los mejores profesores particulares. Clases online y presenciales personalizadas para impulsar tus notas en matemáticas, inglés y mucho más.',
    keywords: ['profesores particulares', 'clases online', 'apoyo escolar', 'profesores de matematicas', 'clases de ingles', 'clases particulares españa'],
    alternates: {
        canonical: 'https://tumaestro.es/profesores',
    },
};

export default function ProfesoresPage() {
    return <ProfesoresClient />;
}
