'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToastMessage, ToastType, ToastContainer } from '@/components/ui/Toast';

const generateId = () => Math.random().toString(36).substring(2, 9);

interface ShowToastOptions {
    title?: string;
    duration?: number;
}

interface ToastContextProps {
    showToast: (message: string, type: ToastType, options?: ShowToastOptions) => void;
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const showToast = (message: string, type: ToastType, options?: ShowToastOptions) => {
        const id = generateId();
        setToasts((prev) => [
            ...prev,
            {
                id,
                message,
                type,
                title: options?.title,
                duration: options?.duration || 5000,
            },
        ]);

        // Safety cleanup if duration is huge or component unmounts logic is handled in the Toast item itself
    };

    const success = (message: string, title: string = 'Éxito') => showToast(message, 'success', { title });
    const error = (message: string, title: string = 'Error') => showToast(message, 'error', { title });
    const warning = (message: string, title: string = 'Advertencia') => showToast(message, 'warning', { title });
    const info = (message: string, title: string = 'Información') => showToast(message, 'info', { title });

    return (
        <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};
