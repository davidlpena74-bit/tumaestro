'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, WarningCircle, Info, XCircle } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
}

interface ToastProps {
    toast: ToastMessage;
    onClose: (id: string) => void;
}

const ToastItem = ({ toast, onClose }: ToastProps) => {
    useEffect(() => {
        if (toast.duration !== 0) {
            const timer = setTimeout(() => {
                onClose(toast.id);
            }, toast.duration || 5000);
            return () => clearTimeout(timer);
        }
    }, [toast, onClose]);

    const icons = {
        success: <CheckCircle size={24} weight="fill" className="text-emerald-500" />,
        error: <XCircle size={24} weight="fill" className="text-red-500" />,
        warning: <WarningCircle size={24} weight="fill" className="text-amber-500" />,
        info: <Info size={24} weight="fill" className="text-blue-500" />,
    };

    const bgColors = {
        success: 'bg-emerald-50/90 border-emerald-200',
        error: 'bg-red-50/90 border-red-200',
        warning: 'bg-amber-50/90 border-amber-200',
        info: 'bg-blue-50/90 border-blue-200',
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={twMerge(
                "relative flex items-start gap-4 p-4 rounded-2xl shadow-xl backdrop-blur-md border w-full max-w-md pointer-events-auto overflow-hidden",
                bgColors[toast.type]
            )}
        >
            <div className="flex-shrink-0 mt-0.5">
                {icons[toast.type]}
            </div>

            <div className="flex-1 mr-2">
                {toast.title && (
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{toast.title}</h3>
                )}
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {toast.message}
                </p>
            </div>

            <button
                onClick={() => onClose(toast.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-black/5 text-slate-400 hover:text-slate-600 transition-colors"
            >
                <X size={14} weight="bold" />
            </button>

            {/* Progress bar (optional, simpler without for now) */}
        </motion.div>
    );
};

interface ToastContainerProps {
    toasts: ToastMessage[];
    removeToast: (id: string) => void;
}

export const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
    return (
        <div className="fixed bottom-0 right-0 p-6 w-full md:max-w-[420px] flex flex-col gap-3 justify-end items-end z-[9999] pointer-events-none">
            <AnimatePresence mode='popLayout'>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
                ))}
            </AnimatePresence>
        </div>
    );
};
