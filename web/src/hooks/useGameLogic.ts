import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type GameState = 'start' | 'playing' | 'won' | 'finished' | 'feedback';

interface UseGameLogicProps {
    initialTime?: number; // Default 120s
    penaltyTime?: number; // Default 10s
    onFinish?: (results: { score: number, errors: number, timeSpent: number }) => void;
    taskId?: string | null;
}

export function useGameLogic({
    initialTime = 120,
    penaltyTime = 10,
    onFinish,
    gameMode = 'challenge', // 'challenge' | 'practice'
    taskId = null
}: UseGameLogicProps & { gameMode?: 'challenge' | 'practice' } = {}) {
    const [gameState, setGameState] = useState<GameState>('start');
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [message, setMessage] = useState('');

    // Timer Loop
    useEffect(() => {
        if (gameState === 'playing') {
            const timer = setInterval(() => {
                if (gameMode === 'challenge') {
                    if (timeLeft > 0) {
                        setElapsedTime(prev => prev + 1);
                        setTimeLeft((prev) => prev - 1);
                    } else {
                        handleFinish();
                    }
                } else {
                    setElapsedTime(prev => prev + 1);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState, timeLeft, gameMode]);

    const handleFinish = useCallback(async () => {
        setGameState('finished');
        const results = { score, errors, timeSpent: elapsedTime };

        if (onFinish) onFinish(results);

        // If it's an assigned task, save results to Supabase
        if (taskId) {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    await supabase.from('student_task_completions').upsert({
                        task_id: taskId,
                        student_id: session.user.id,
                        score: score,
                        errors: errors,
                        time_spent: elapsedTime,
                        completed_at: new Date().toISOString()
                    });
                }
            } catch (err) {
                console.error("Error saving task completion:", err);
            }
        }
    }, [score, errors, elapsedTime, taskId, onFinish]);

    // Auto clear message
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 1500);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const startGame = useCallback(() => {
        setGameState('playing');
        setScore(0);
        setErrors(0);
        setTimeLeft(initialTime);
        setElapsedTime(0);
        setMessage('');
    }, [initialTime]);

    const addScore = useCallback((points: number = 10) => {
        setScore(s => s + points);
    }, []);

    const addError = useCallback(() => {
        setErrors(e => e + 1);
        if (gameMode === 'challenge') {
            setScore(s => Math.max(0, s - 5)); // Fixed penalty score in challenge
            setTimeLeft(t => Math.max(0, t - penaltyTime));
        }
    }, [penaltyTime, gameMode]);

    const resetGame = useCallback(() => {
        startGame();
    }, [startGame]);

    return {
        gameState,
        setGameState,
        score,
        setScore,
        errors,
        setErrors,
        timeLeft,
        setTimeLeft,
        elapsedTime,
        message,
        setMessage,
        startGame,
        resetGame,
        addScore,
        addError,
        handleFinish
    };
}
