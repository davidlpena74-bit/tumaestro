import { Metadata } from 'next';
import ProfesoresClient from '@/components/ProfesoresClient';

export const metadata: Metadata = {
    title: 'Profesores Particulares Online y Presenciales | TuMaestro.es',
    description: 'Encuentra profesores particulares expertos y verificados. Apoyo escolar, idiomas, música y más. Elige entre clases online o presenciales con los mejores profesionales.',
    keywords: ['profesores particulares', 'clases online', 'apoyo escolar', 'profesores de matematicas', 'clases de ingles', 'clases particulares españa'],
    alternates: {
        canonical: 'https://tumaestro.es/profesores',
    },
};

export default function ProfesoresPage() {
    return <ProfesoresClient />;
}
