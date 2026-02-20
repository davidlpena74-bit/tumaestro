import { Metadata } from 'next';
import MyRatingsClient from './MyRatingsClient';

export const metadata: Metadata = {
    title: 'Mis Valoraciones | TuMaestro.es',
    description: 'Gestiona tus opiniones sobre las actividades de TuMaestro.es',
};

export default function MyRatingsPage() {
    return <MyRatingsClient />;
}
