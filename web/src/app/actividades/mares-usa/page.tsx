import { Suspense } from 'react';
import MaresUSAClient from './MaresUSAClient';

export const metadata = {
    title: 'Mares y Océanos de EE.UU. - Tu Maestro',
    description: 'Identifica los mares y océanos que bañan las costas de los Estados Unidos.',
};

export default function MaresUSAPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>}>
            <MaresUSAClient />
        </Suspense>
    );
}
