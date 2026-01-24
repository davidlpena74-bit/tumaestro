'use client';

import React, { useRef } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'lord-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                trigger?: string;
                colors?: string;
                delay?: string | number;
                state?: string;
            };
        }
    }
}

interface AnimatedIconProps {
    src: string;
    trigger?: 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph';
    size?: number;
    colors?: { primary?: string; secondary?: string };
    delay?: number;
    className?: string;
}

export default function AnimatedIcon({
    src,
    trigger = 'hover',
    size = 48,
    colors = { primary: '#ffffff', secondary: '#5eead4' },
    delay = 0,
    className = ""
}: AnimatedIconProps) {
    const iconRef = useRef<any>(null);

    // Primary and secondary colors formatted for Lordicon
    const colorsStr = `primary:${colors.primary},secondary:${colors.secondary}`;

    return (
        <div className={`relative z-30 ${className}`}>
            <lord-icon
                ref={iconRef}
                src={src}
                trigger={trigger}
                delay={delay}
                colors={colorsStr}
                style={{ width: size, height: size }}
                className="transition-transform duration-300 transform group-hover:scale-110"
            />
        </div>
    );
}
