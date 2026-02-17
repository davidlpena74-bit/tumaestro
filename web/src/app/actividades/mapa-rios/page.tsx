import { Metadata } from 'next';
import MapaRiosClient from './MapaRiosClient';

export const metadata: Metadata = {
    title: 'Mapa de Ríos de España - Juego de Geografía Hidrografía | TuMaestro.es',
    description: 'Juego interactivo gratuito para aprender los principales ríos de España. Identifica su curso, nacimiento y desembocadura de forma divertida.',
    keywords: ['ríos de españa', 'geografía españa', 'juego interactivo', 'hidrografía española', 'aprender geografía', 'primaria', 'secundaria'],
    alternates: {
        canonical: 'https://tumaestro.es/actividades/mapa-rios',
    },
};

export default function MapaRiosPage() {
    return <MapaRiosClient />;
}
