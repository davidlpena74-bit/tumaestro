import { Metadata } from 'next';
import MapaProvinciasClient from './MapaProvinciasClient';

export const metadata: Metadata = {
    title: 'Mapa de Provincias de España - Juego de Geografía | TuMaestro.es',
    description: 'Aprende las 50 provincias de España con este juego interactivo gratuito. Ubica cada provincia en el mapa and mejora tu conocimiento geográfico.',
    keywords: ['provincias de españa', 'geografía española', 'juego interactivo', 'educación primaria', 'mapa político', 'aprender provincias'],
    alternates: {
        canonical: 'https://tumaestro.es/juegos/mapa-provincias',
    },
};

export default function MapaProvinciasPage() {
    return <MapaProvinciasClient />;
}
