const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'web/src/components/games');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const referenceOverlay = `                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start p-6 text-center animate-in fade-in duration-500 rounded-[2rem] overflow-y-auto custom-scrollbar">

                            {/* Top Section: Score & Trophy (Pushing up) */}
                            <div className="flex flex-col items-center mb-8 shrink-0">
                                <div className="bg-emerald-500/10 p-3 rounded-full mb-3 ring-1 ring-emerald-500/30">
                                    {gameMode === 'challenge' && timeLeft === 0 ? (
                                        <Timer className="w-10 h-10 text-red-500 animate-pulse" />
                                    ) : (
                                        <Trophy className="w-10 h-10 text-yellow-400 animate-bounce" />
                                    )}
                                </div>
                                <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">
                                    {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : (t?.common?.completed || 'Completado')}
                                </h2>
                            </div>

                            {/* Main Content Area: Rankings & Actions */}
                            <div className="w-full max-w-5xl flex flex-col gap-6 mb-10">
                                {/* Rankings Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left: Score Box */}
                                    <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                        <div className="flex flex-col items-center gap-1 mb-4">
                                            <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black">{language === 'es' ? 'Tu Puntuación:' : 'Your Score:'}</span>
                                            <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                                                {score}
                                            </span>
                                        </div>
                                        <div className="w-full text-left">
                                            <ActivityRanking activityId={typeof effectiveActivityId !== 'undefined' ? effectiveActivityId : activityId} limit={3} sortBy="score" />
                                        </div>
                                    </div>

                                    {/* Right: Time Box */}
                                    <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                        <div className="flex flex-col items-center gap-1 mb-4">
                                            <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black">{language === 'es' ? 'Tu Tiempo:' : 'Your Time:'}</span>
                                            <span className="text-4xl font-black text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                                                {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                        <div className="w-full text-left">
                                            <ActivityRanking activityId={typeof effectiveActivityId !== 'undefined' ? effectiveActivityId : activityId} limit={3} sortBy="time" />
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Row - Reduced Height */}
                                <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-5xl mx-auto w-full mt-2">
                                    <div className="w-full md:w-[calc(50%-8px+8px)] flex-none bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-0 shadow-xl overflow-hidden h-[120px] flex items-center justify-center">
                                        <div className="scale-[0.6] origin-center w-[166%] h-[166%] flex items-center justify-center -mt-8">
                                            <RatingSystem activityId={typeof effectiveActivityId !== 'undefined' ? effectiveActivityId : activityId} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={typeof resetGame !== 'undefined' ? resetGame : (typeof hookResetGame !== 'undefined' ? hookResetGame : () => setGameState('start'))}
                                        className="w-full md:w-[calc(50%-8px-8px)] flex-none h-[120px] flex items-center justify-center gap-4 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20 uppercase tracking-wider"
                                    >
                                        <RefreshCw className="w-8 h-8" /> {t?.common?.playAgain || 'Jugar de nuevo'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}`;

const regex = /\{(?:\(gameState === 'won' \|\| gameState === 'finished'\) \?|gameState === 'finished' &&) \([\\s\\S]*?\}\)/g;

let count = 0;
files.forEach(file => {
    if (file === 'RegionGame.tsx') return; // our reference
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');

    // we need to match the block properly.
    // Regex might not match correctly with nested brackets. Let's do a simple brace counting parser.

    let index = content.indexOf("gameState === 'finished' && (");
    if (index === -1) {
        index = content.indexOf("(gameState === 'won' || gameState === 'finished') ? (");
    }

    if (index !== -1) {
        // find the matching closing parentesis and bracket for the open bracket
        const startIndex = content.lastIndexOf("{", index);

        // Find closing brace
        let openBraces = 0;
        let endIndex = startIndex;
        for (let i = startIndex; i < content.length; i++) {
            if (content[i] === '{') openBraces++;
            if (content[i] === '}') {
                openBraces--;
                if (openBraces === 0) {
                    endIndex = i;
                    break;
                }
            }
        }

        let newBlock = referenceOverlay;

        // Check if file uses `activityId` or `effectiveActivityId`
        if (!content.includes('effectiveActivityId')) {
            newBlock = newBlock.replace(/typeof effectiveActivityId !== 'undefined' \? effectiveActivityId : activityId/g, 'activityId');
        } else {
            newBlock = newBlock.replace(/typeof effectiveActivityId !== 'undefined' \? effectiveActivityId : activityId/g, 'effectiveActivityId');
        }

        // Check if `t` from `useLanguage` is available, some games might not have it or have it differently.
        if (!content.includes('const { language, t }')) {
            // Let's assume most use it. If t is missing it'll be fine with optional chaining.
            // Actually, the original files are in TS and might throw error for undefined hook vars? 
            // We can just rely on the existing imports.
        }

        content = content.substring(0, startIndex) + newBlock + content.substring(endIndex + 1);
        fs.writeFileSync(p, content, 'utf8');
        console.log('Updated', file);
        count++;
    }
});
console.log('Total updated:', count);
