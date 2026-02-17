import { Metadata } from 'next';
import MapaUsaClient from './MapaUsaClient';

export const metadata: Metadata = {
    title: 'Mapa de EE.UU. - Juego de Geografía | TuMaestro.es',
    description: 'Aprende los 50 estados de los Estados Unidos con este mapa interactivo. Desktop y móvil.',
};

export default function UsaGamePage() {
    return <MapaUsaClient />;
}
