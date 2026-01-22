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
    onFinish
}: UseGameLogicProps = {}) {
    const [gameState, setGameState] = useState<GameState>('start');
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [message, setMessage] = useState('');

    // Timer Loop
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameState === 'playing') {
            setGameState('finished');
            if (onFinish) onFinish();
        }
    }, [gameState, timeLeft, onFinish]);

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
        setMessage('');
    }, [initialTime]);

    const addScore = useCallback((points: number = 10) => {
        setScore(s => s + points);
    }, []);

    const addError = useCallback(() => {
        setErrors(e => e + 1);
        setScore(s => Math.max(0, s - 5)); // Fixed penalty score
        setTimeLeft(t => Math.max(0, t - penaltyTime));
    }, [penaltyTime]);

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
        message,
        setMessage,
        startGame,
        resetGame,
        addScore,
        addError
    };
}
