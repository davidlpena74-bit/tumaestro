import { Metadata } from 'next';
import RankingsClient from './RankingsClient';

export const metadata: Metadata = {
    title: 'Rankings y Récords - Actividades Educativas | TuMaestro.es',
    description: 'Los mejores tiempos y puntuaciones en nuestras actividades educativas. ¡Compite con otros alumnos!',
};

export default function RankingsPage() {
    return <RankingsClient />;
}
