import { Metadata } from 'next';
import MapaEuropaClient from './MapaEuropaClient';

export const metadata: Metadata = {
    title: 'Mapa de Europa - Juego de Geografía | TuMaestro.es',
    description: 'Aprende los países de Europa con este mapa interactivo. Ubica todas las naciones del continente europeo.',
};

export default function EuropeMapPage() {
    return <MapaEuropaClient />;
}
