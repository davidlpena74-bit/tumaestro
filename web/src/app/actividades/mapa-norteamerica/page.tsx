import { Metadata } from 'next';
import MapaNorteamericaClient from './MapaNorteamericaClient';

export const metadata: Metadata = {
    title: 'Mapa de Norteamérica - Juego de Geografía | TuMaestro.es',
    description: 'Aprende los países de América del Norte y el Caribe con este mapa interactivo.',
};

export default function NorthAmericaGamePage() {
    return <MapaNorteamericaClient />;
}
