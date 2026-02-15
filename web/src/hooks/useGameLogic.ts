import { useState, useEffect, useCallback } from 'react';

export type GameState = 'start' | 'playing' | 'won' | 'finished';

interface UseGameLogicProps {
    initialTime?: number; // Default 120s
    penaltyTime?: number; // Default 10s
    onFinish?: () => void;
}

export function useGameLogic({
    initialTime = 120,
    penaltyTime = 10,
    onFinish,
    gameMode = 'challenge' // 'challenge' | 'practice'
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
                        setTimeLeft((prev) => prev - 1);
                    } else {
                        setGameState('finished');
                        if (onFinish) onFinish();
                    }
                } else {
                    setElapsedTime(prev => prev + 1);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState, timeLeft, onFinish, gameMode]);

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
        // In practice mode, we might just track errors without heavy penalties
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
        setErrors, // Expose setter if needed for custom logic
        timeLeft,
        setTimeLeft,
        elapsedTime, // Start exposing elapsed time
        message,
        setMessage,
        startGame,
        resetGame,
        addScore,
        addError
    };
}
