'use client';

import { usePathname } from 'next/navigation';

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Don't apply wrapper on Home Page
    // Don't apply wrapper on Home Page
    if (pathname === '/') {
        return <>{children}</>;
    }

    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-full max-w-[1400px] bg-slate-950/60 backdrop-blur-2xl shadow-2xl border-x border-white/10 relative z-0">
                {children}
            </div>
        </div>
    );
}
