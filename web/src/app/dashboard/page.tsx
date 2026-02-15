import { Metadata } from 'next';
import RoleBasedDashboard from '@/components/RoleBasedDashboard';

export const metadata: Metadata = {
    title: 'Mi Panel | Tu Maestro',
    description: 'Gestiona tus clases, alumnos y profesores en Tu Maestro.',
};

export default function DashboardPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 bg-slate-50/50">
            <RoleBasedDashboard />
        </main>
    );
}
