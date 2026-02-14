'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundContextType {
    backgroundImage: string | null;
    setBackgroundImage: (image: string | null) => void;
    isImmersive: boolean;
    setIsImmersive: (immersive: boolean) => void;
    themeColor: string | null;
    setThemeColor: (color: string | null) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [isImmersive, setIsImmersive] = useState(false);
    const [themeColor, setThemeColor] = useState<string | null>(null);

    return (
        <BackgroundContext.Provider value={{
            backgroundImage,
            setBackgroundImage,
            isImmersive,
            setIsImmersive,
            themeColor,
            setThemeColor
        }}>
            {children}
        </BackgroundContext.Provider>
    );
}

export function useBackground() {
    const context = useContext(BackgroundContext);
    if (context === undefined) {
        throw new Error('useBackground must be used within a BackgroundProvider');
    }
    return context;
}
