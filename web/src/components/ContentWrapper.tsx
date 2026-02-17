'use client';

import { usePathname } from 'next/navigation';
import { useBackground } from '@/context/BackgroundContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ContentWrapper({
    children,
    transparent = false,
    className = ""
}: {
    children: React.ReactNode;
    transparent?: boolean;
    className?: string;
}) {
    const pathname = usePathname();
    const { isImmersive } = useBackground();

    // Don't apply wrapper on Home Page
    if (pathname === '/') {
        return <>{children}</>;
    }

    return (
        <div className="flex justify-center min-h-screen">
            <div className={cn(
                "w-full max-w-[1400px] relative transition-all duration-500",
                isImmersive ? "z-[70]" : "z-0",
                (transparent || isImmersive)
                    ? 'bg-transparent border-transparent shadow-none'
                    : 'bg-white/10 backdrop-blur-3xl shadow-2xl border-x border-white/20',
                className
            )}>
                {children}
            </div>
        </div>
    );
}
