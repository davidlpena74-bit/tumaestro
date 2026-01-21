'use client';

import { usePathname } from 'next/navigation';

export default function PageBackground() {
    const pathname = usePathname();

    // Don't show on Landing Page ('/')
    if (pathname === '/') return null;

    return (
        <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
            {/* Background Image */}
            <div className="absolute inset-0 bg-slate-900/80 z-0" /> {/* Darker overlay for readability */}
            <img
                src="/fondo.jpg"
                className="w-full h-full object-cover blur-sm scale-105 opacity-40"
                alt=""
                onError={(e) => {
                    // Fallback if image doesn't load
                    e.currentTarget.style.display = 'none';
                }}
            />

            {/* Gradients */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/20 rounded-full blur-[100px]" />
            </div>
        </div>
    );
}
