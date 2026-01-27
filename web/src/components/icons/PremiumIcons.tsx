import React from 'react';
import { motion } from 'framer-motion';

const springConfig = { type: 'spring', stiffness: 400, damping: 25 };

export const PremiumTeacherIcon = ({ className }: { className?: string }) => (
    <motion.svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="teacher-grad-1" x1="40" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" style={{ stopColor: '#2DD4BF' }} />
                <stop offset="100%" style={{ stopColor: '#0891B2' }} />
            </linearGradient>
            <linearGradient id="teacher-grad-2" x1="100" y1="60" x2="100" y2="140" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="100%" stopColor="white" stopOpacity="0.05" />
            </linearGradient>
            <filter id="teacher-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        <motion.circle
            cx="100" cy="100" r="70"
            fill="url(#teacher-grad-1)"
            opacity={0.15}
            filter="url(#teacher-glow)"
            variants={{
                hover: { opacity: 0.3, scale: 1.05 }
            }}
            transition={springConfig}
        />

        <motion.path
            d="M60 150C60 130 75 115 100 115C125 115 140 130 140 150V160H60V150Z"
            fill="url(#teacher-grad-1)"
            className="drop-shadow-lg"
            variants={{
                hover: { y: -3 }
            }}
            transition={springConfig}
        />
        <motion.circle
            cx="100" cy="85" r="30"
            fill="url(#teacher-grad-1)"
            className="drop-shadow-lg"
            variants={{
                hover: { y: -5 }
            }}
            transition={springConfig}
        />

        <motion.g
            variants={{
                hover: { y: -8, rotate: 2 }
            }}
            initial={{ y: 0, rotate: -3 }}
            style={{ transformOrigin: '100px 65px' }}
            transition={springConfig}
        >
            <g transform="translate(100, 65)">
                <path d="M-50 0L0 -25L50 0L0 25Z" fill="#0F172A" />
                <path d="M-50 0L0 -25L50 0L0 25Z" fill="url(#teacher-grad-2)" />
                <path d="M-42 4L-42 12" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                <circle cx="-42" cy="16" r="4" fill="#F59E0B" />
            </g>
        </motion.g>

        <motion.path
            d="M90 70C95 65 110 65 115 70"
            stroke="white"
            strokeWidth="2"
            strokeOpacity={0.5}
            strokeLinecap="round"
            variants={{
                hover: { strokeOpacity: 1, x: 2 }
            }}
            transition={springConfig}
        />
    </motion.svg>
);

export const PremiumResourcesIcon = ({ className }: { className?: string }) => (
    <motion.svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="res-grad-1" x1="40" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" style={{ stopColor: '#FB923C' }} />
                <stop offset="100%" style={{ stopColor: '#EA580C' }} />
            </linearGradient>
            <linearGradient id="res-grad-2" x1="100" y1="60" x2="100" y2="140" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
            <filter id="res-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        <motion.circle
            cx="100" cy="100" r="75"
            fill="url(#res-grad-1)"
            opacity={0.1}
            filter="url(#res-glow)"
            variants={{
                hover: { opacity: 0.2, scale: 1.02 }
            }}
            transition={springConfig}
        />

        <motion.rect
            x="50" y="100" width="100" height="60" rx="8"
            fill="#F8FAFC"
            className="drop-shadow-xl"
            variants={{
                hover: { y: 1 }
            }}
            transition={springConfig}
        />
        <motion.rect
            x="50" y="100" width="100" height="15" rx="4"
            fill="url(#res-grad-1)"
            variants={{
                hover: { y: 1 }
            }}
            transition={springConfig}
        />
        <path d="M50 115H150" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M50 130H150" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M50 145H150" stroke="#E2E8F0" strokeWidth="1" />

        <motion.g
            variants={{
                hover: { y: -10, rotate: 0, x: 3 }
            }}
            initial={{ rotate: 8, y: 0, x: 0 }}
            style={{ transformOrigin: '80px 50px' }}
            transition={springConfig}
        >
            <g transform="translate(80, 50)">
                <rect width="70" height="90" rx="12" fill="url(#res-grad-2)" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" style={{ backdropFilter: 'blur(8px)' }} />
                <path d="M15 25H55" stroke="white" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
                <path d="M15 40H55" stroke="white" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
                <path d="M15 55H40" stroke="white" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
            </g>
        </motion.g>
    </motion.svg>
);

export const PremiumGamesIcon = ({ className }: { className?: string }) => (
    <motion.svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="game-grad-1" x1="40" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" style={{ stopColor: '#10B981' }} />
                <stop offset="100%" style={{ stopColor: '#8B5CF6' }} />
            </linearGradient>
            <linearGradient id="game-grad-2" x1="100" y1="50" x2="100" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
            <filter id="game-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        <motion.circle
            cx="100" cy="100" r="70"
            fill="url(#game-grad-1)"
            opacity={0.2}
            filter="url(#game-glow)"
            variants={{
                hover: { opacity: 0.35, scale: 1.1 }
            }}
            transition={springConfig}
        />

        <motion.path
            d="M40 90C40 70 70 60 100 60C130 60 160 70 160 90V120C160 140 140 150 125 150C110 150 105 140 100 140C95 140 90 150 75 150C60 150 40 140 40 120V90Z"
            fill="url(#game-grad-1)"
            className="drop-shadow-2xl"
            variants={{
                hover: { y: -4, rotate: 1 }
            }}
            style={{ transformOrigin: 'center' }}
            transition={springConfig}
        />

        <motion.circle
            cx="70" cy="105" r="15"
            fill="black" fillOpacity="0.2"
            variants={{ hover: { y: -4 } }}
            transition={springConfig}
        />
        <motion.circle
            cx="130" cy="105" r="15"
            fill="black" fillOpacity="0.2"
            variants={{ hover: { y: -4 } }}
            transition={springConfig}
        />

        <motion.path
            d="M62 105H78M70 97V113"
            stroke="white" strokeWidth="3" strokeLinecap="round"
            variants={{ hover: { y: -4 } }}
            transition={springConfig}
        />

        <motion.g
            variants={{
                hover: { y: -8, scale: 1.1 }
            }}
            style={{ transformOrigin: '120px 105px' }}
            transition={springConfig}
        >
            <g transform="translate(120, 95)">
                <circle cx="10" cy="0" r="4" fill="#F87171" className="animate-pulse" />
                <circle cx="0" cy="10" r="4" fill="#60A5FA" />
                <circle cx="20" cy="10" r="4" fill="#34D399" />
                <circle cx="10" cy="20" r="4" fill="#FBBF24" />
            </g>
        </motion.g>

        <motion.rect
            x="85" y="75" width="30" height="15" rx="7.5"
            fill="url(#game-grad-2)"
            stroke="white"
            strokeOpacity={0.4}
            variants={{
                hover: { y: -10, fillOpacity: 0.7 }
            }}
            transition={springConfig}
        />
    </motion.svg>
);

export const PremiumMathIcon = ({ className }: { className?: string }) => (
    <motion.svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="math-grad" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
        </defs>
        <motion.rect
            x="40" y="40" width="120" height="120" rx="20"
            fill="url(#math-grad)"
            fillOpacity={0.2}
            stroke="url(#math-grad)"
            strokeWidth="2"
            variants={{ hover: { fillOpacity: 0.3 } }}
            transition={springConfig}
        />
        <motion.path
            d="M70 100H130M100 70V130"
            stroke="url(#math-grad)"
            strokeWidth="12"
            strokeLinecap="round"
            variants={{ hover: { rotate: 90 } }}
            style={{ transformOrigin: 'center' }}
            transition={springConfig}
        />
        <path d="M70 130L130 130" stroke="#F87171" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
    </motion.svg>
);

export const PremiumQuizIcon = ({ className }: { className?: string }) => (
    <motion.svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="quiz-grad" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
        </defs>
        <motion.path
            d="M100 40C66.8629 40 40 66.8629 40 100C40 133.137 66.8629 160 100 160H140V120C151.046 120 160 111.046 160 100C160 66.8629 133.137 40 100 40Z"
            fill="url(#quiz-grad)"
            fillOpacity={0.2}
            stroke="url(#quiz-grad)"
            strokeWidth="2"
            variants={{ hover: { fillOpacity: 0.3 } }}
            transition={springConfig}
        />
        <motion.circle
            cx="85" cy="90" r="10"
            fill="url(#quiz-grad)"
            variants={{ hover: { scale: 1.15 } }}
            style={{ transformOrigin: '85px 90px' }}
            transition={springConfig}
        />
        <motion.circle
            cx="115" cy="90" r="10"
            fill="url(#quiz-grad)"
            variants={{ hover: { scale: 1.15 } }}
            style={{ transformOrigin: '115px 90px' }}
            transition={springConfig}
        />
        <motion.path
            d="M80 125C80 125 90 135 100 135C110 135 120 125 120 125"
            stroke="url(#quiz-grad)"
            strokeWidth="8"
            strokeLinecap="round"
            variants={{ hover: { scaleX: 1.15 } }}
            style={{ transformOrigin: 'center' }}
            transition={springConfig}
        />
    </motion.svg>
);

export const PremiumMapIcon = ({ className }: { className?: string }) => (
    <motion.svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="map-grad" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
            </linearGradient>
        </defs>
        <motion.path
            d="M40 60L80 40L120 60L160 40V140L120 160L80 140L40 160V60Z"
            fill="url(#map-grad)"
            fillOpacity={0.2}
            stroke="url(#map-grad)"
            strokeWidth="2"
            variants={{ hover: { fillOpacity: 0.3 } }}
            transition={springConfig}
        />
        <path d="M80 40V140M120 60V160" stroke="url(#map-grad)" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="20" fill="#EF4444" fillOpacity="0.4" className="animate-ping" />
        <circle cx="100" cy="100" r="6" fill="#EF4444" />
    </motion.svg>
);
