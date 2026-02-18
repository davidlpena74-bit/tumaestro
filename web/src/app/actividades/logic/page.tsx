import { Metadata } from 'next';
import LogicClient from './LogicClient';

export const metadata: Metadata = {
    title: 'Desafío de Lógica | TuMaestro.es',
    description: 'Entrena tu razonamiento con nuestros retos de lógica y acertijos.',
};

export default function LogicPage() {
    return <LogicClient />;
}
