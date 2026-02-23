export const OCEANIA_MOUNTAINS_PATHS: Record<string, any> = {
    "Gran Cordillera Divisoria": {
        path: "M400,199.6 C411,230 416,245 421.6,261.6 S435,295 445.9,326.8 S426,354 406.6,382",
        peaks: [
            { x: 400, y: 200, scale: 0.9 },
            { x: 411, y: 230, scale: 1.2 },
            { x: 416, y: 245, scale: 1.4 },
            { x: 422, y: 262, scale: 1.7 },
            { x: 435, y: 295, scale: 1.7 },
            { x: 446, y: 327, scale: 1.5 },
            { x: 426, y: 354, scale: 1.2 },
            { x: 407, y: 382, scale: 0.8 },
        ]
    },
    "Alpes del Sur": {
        path: "M550.9,451.7 C559,443 568,434 577.2,424.5",
        peaks: [
            { x: 551, y: 452, scale: 0.9 },
            { x: 559, y: 443, scale: 1.6 },
            { x: 568, y: 434, scale: 1.4 },
            { x: 577, y: 425, scale: 0.8 },
        ]
    },
    "Cordillera Owen Stanley": {
        path: "M406.6,179.6 C413,182 420,184 426.2,186.3",
        peaks: [
            { x: 407, y: 180, scale: 0.9 },
            { x: 413, y: 182, scale: 1.5 },
            { x: 420, y: 184, scale: 1.6 },
            { x: 426, y: 186, scale: 0.9 },
        ]
    },
};

export const OCEANIA_SEAS_PATHS: Record<string, string> = {
    "Mar del Coral": "M400,185 L470,185 L475,295 L400,295 Z",
    "Mar de Tasmania": "M430,365 L535,365 L535,455 L430,455 Z",
    "Mar de Arafura": "M300,150 L385,150 L385,200 L300,200 Z",
    "Gran Bahía Australiana": "M234,340 L370,340 L370,412 L300,415 L235,412 Z",
};
