'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceVisualizerProps {
    isListening: boolean;
    color?: string;
}

export default function VoiceVisualizer({ isListening, color = '#a78bfa' }: VoiceVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        if (isListening) {
            startVisualization();
        } else {
            stopVisualization();
        }

        return () => stopVisualization();
    }, [isListening]);

    const startVisualization = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContextRef.current = audioContext;

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyserRef.current = analyser;

            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);

            draw();
        } catch (err) {
            console.error('Error accessing microphone for visualizer:', err);
        }
    };

    const stopVisualization = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }

        // Clear canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        const analyser = analyserRef.current;
        if (!canvas || !analyser) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            animationFrameRef.current = requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * canvas.height;

                ctx.fillStyle = color;
                // Rounded bars logic
                const radius = barWidth / 2;
                ctx.beginPath();
                ctx.roundRect(x, canvas.height - barHeight, barWidth - 1, barHeight, [radius, radius, 0, 0]);
                ctx.fill();

                x += barWidth + 1;
            }
        };

        renderFrame();
    };

    return (
        <AnimatePresence>
            {isListening && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Live Audio</span>
                        <canvas
                            ref={canvasRef}
                            width={80}
                            height={30}
                            className="w-20 h-8"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
