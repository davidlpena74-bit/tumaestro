'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function EuropeIcelandInset() {
    const { language } = useLanguage();

    return (
        <g key="iceland-box" className="pointer-events-none">
            {/* Box for Iceland Inset */}
            <rect
                x="15"
                y="15"
                width="130"
                height="100"
                rx="8"
                className="fill-none stroke-slate-500/30"
                strokeWidth="1"
                strokeDasharray="4 2"
            />
            <text
                x="25"
                y="32"
                className="fill-slate-500/40 text-[5px] font-medium italic tracking-tight"
            >
                {language === 'es' ? '* No es la ubicación real' : '* Not the real location'}
            </text>
        </g>
    );
}
