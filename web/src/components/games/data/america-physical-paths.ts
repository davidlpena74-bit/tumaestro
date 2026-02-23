export const AMERICA_MOUNTAINS_PATHS: Record<string, any> = {
    "Rocosas": {
        path: "M374.8,273.8 C378,265 381,258 383.2,251.8 S380,242 376.3,232.4 S371,221 366.4,209.9",
        peaks: [
            { x: 375, y: 274, scale: 0.9 },
            { x: 378, y: 265, scale: 1.1 },
            { x: 381, y: 258, scale: 1.4 },
            { x: 383, y: 252, scale: 1.6 },
            { x: 380, y: 242, scale: 1.7 },
            { x: 376, y: 232, scale: 1.5 },
            { x: 371, y: 221, scale: 1.2 },
            { x: 366, y: 210, scale: 0.8 },
        ]
    },
    "Andes": {
        path: "M443.6,319.7 C440,336 438,344 436.9,353.4 S444,371 450.3,389.3 S447,415 445.3,441.8",
        peaks: [
            { x: 444, y: 320, scale: 0.9 },
            { x: 440, y: 336, scale: 1.1 },
            { x: 438, y: 344, scale: 1.5 },
            { x: 437, y: 353, scale: 1.6 },
            { x: 444, y: 371, scale: 1.5 },
            { x: 450, y: 389, scale: 1.5 },
            { x: 447, y: 415, scale: 1.2 },
            { x: 445, y: 442, scale: 0.8 },
        ]
    },
    "Apalaches": {
        path: "M426.8,275.8 C430,270 433,265 436.9,261 S445,254 453.7,247",
        peaks: [
            { x: 427, y: 276, scale: 0.9 },
            { x: 430, y: 270, scale: 1.3 },
            { x: 433, y: 265, scale: 1.6 },
            { x: 437, y: 261, scale: 1.6 },
            { x: 445, y: 254, scale: 1.4 },
            { x: 454, y: 247, scale: 0.8 },
        ]
    },
    "Sierra Nevada": {
        path: "M366.4,271.7 C367,268 368,267 368.1,265.4",
        peaks: [
            { x: 366, y: 272, scale: 0.9 },
            { x: 367, y: 268, scale: 1.5 },
            { x: 368, y: 267, scale: 1.5 },
            { x: 368, y: 265, scale: 0.8 },
        ]
    },
    "Sierra Madre Occidental": {
        path: "M386.6,287.6 C388,292 390,297 391.6,302.3",
        peaks: [
            { x: 387, y: 288, scale: 0.9 },
            { x: 388, y: 292, scale: 1.5 },
            { x: 390, y: 297, scale: 1.5 },
            { x: 392, y: 302, scale: 0.8 },
        ]
    },
    "Sierra Madre Oriental": {
        path: "M400,293.2 C401,296 402,300 403.4,304.1",
        peaks: [
            { x: 400, y: 293, scale: 0.9 },
            { x: 401, y: 296, scale: 1.6 },
            { x: 402, y: 300, scale: 1.4 },
            { x: 403, y: 304, scale: 0.8 },
        ]
    },
};

export const AMERICA_SEAS_PATHS: Record<string, string> = {
    "Mar Caribe": "M415,300 L450,300 L470,310 L475,325 L460,335 L440,335 L420,330 L410,318 Z",
    "Golfo de México": "M395,280 L440,278 L445,300 L415,302 L395,302 Z",
    "Bahía de Hudson": "M400,195 L440,192 L448,235 L425,240 L405,238 Z",
    "Mar de Bering": "M265,185 L305,182 L308,235 L285,238 L262,235 Z",
    "Golfo de California": "M368,278 L390,276 L395,295 L375,298 Z",
};
