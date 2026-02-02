import { Metadata } from 'next';
import ProfesoresClient from '@/components/ProfesoresClient';

export const metadata: Metadata = {
    title: 'Profesores Particulares | Clases Online y Apoyo Escolar',
    description: 'Encuentra los mejores profesores particulares para clases online y presenciales. Refuerzo escolar en todas las materias y acceso a cuentos narrados en 4 idiomas gratis.',
    keywords: ['profesores particulares', 'clases online', 'apoyo escolar', 'profesor de refuerzo', 'clases particulares españa', 'recursos educativos gratis'],
    alternates: {
        canonical: 'https://tumaestro.es/profesores',
    },
};

export default function ProfesoresPage() {
    return <ProfesoresClient />;
}
