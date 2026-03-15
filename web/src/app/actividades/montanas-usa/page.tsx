import { Suspense } from 'react';
import MontanasUSAClient from './MontanasUSAClient';

export const metadata = {
    title: 'Montañas de EE.UU. - Tu Maestro',
    description: 'Localiza las principales cordilleras y sistemas montañosos de los Estados Unidos.',
};

export default function MontanasUSAPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
        </div>}>
            <MontanasUSAClient />
        </Suspense>
    );
}
