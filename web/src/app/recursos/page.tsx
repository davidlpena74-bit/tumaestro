import { Metadata } from 'next';
import RecursosClient from '@/components/RecursosClient';

export const metadata: Metadata = {
    title: 'Material Didáctico y Recursos Educativos Gratis',
    description: 'Descarga miles de apuntes, ejercicios resueltos y guías de estudio de matemáticas, lengua, inglés, geografía y más. Todo el material que necesitas para tus clases.',
    keywords: ['apuntes gratis', 'material didactico', 'ejercicios resueltos', 'recursos educativos', 'primaria', 'secundaria', 'bachillerato', 'estudiar online'],
    alternates: {
        canonical: 'https://tumaestro.es/recursos',
    },
};

export default function RecursosPage() {
    return <RecursosClient />;
}
