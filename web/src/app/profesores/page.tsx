import { Metadata } from 'next';
import ProfesoresClient from '@/components/ProfesoresClient';

export const metadata: Metadata = {
    title: 'Profesores Particulares - Acceso y Herramientas Docentes',
    description: 'Gestiona tus clases, crea actividades personalizadas y accede a recursos didácticos exclusivos para potenciar la enseñanza en TuMaestro.es.',
    keywords: ['profesores particulares', 'herramientas docentes', 'gestion de clases', 'actividades educativas', 'recursos profesores', 'tumaestro profesores'],
    alternates: {
        canonical: 'https://tumaestro.es/profesores',
    },
};

export default function ProfesoresPage() {
    return <ProfesoresClient />;
}
