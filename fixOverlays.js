const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'web/src/components/games');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');

    // Fix `gameMode`
    if (!content.includes('gameMode') && !content.includes('const [gameMode')) {
        // If file doesn't have gameMode, we can declare a dummy one or replace it in the template
        // But replacing in template is safer
        content = content.replace(/gameMode === 'challenge'/g, "false");
    }

    // Fix `resetGame` vs `hookResetGame`
    // In TS, `typeof resetGame` throws error if resetGame doesn't exist
    // Let's replace the whole `typeof resetGame !== 'undefined' ? resetGame : (typeof hookResetGame !== 'undefined' ? hookResetGame : () => setGameState('start'))`
    // with something safe.
    if (content.includes("typeof resetGame !== 'undefined'")) {
        let resetCall = "() => setGameState('start')";
        if (content.match(/const resetGame =/)) {
            resetCall = "resetGame";
        } else if (content.match(/hookResetGame/)) {
            resetCall = "hookResetGame";
        } else if (content.match(/reset =/)) {
            resetCall = "reset";
        }
        content = content.replace(/typeof resetGame !== 'undefined' \? resetGame : \(typeof hookResetGame !== 'undefined' \? hookResetGame : \(\) => setGameState\('start'\)\)/g, resetCall);
    }

    // Fix `language`
    if (content.match(/const\s*{\s*t\s*}\s*=\s*useLanguage/)) {
        content = content.replace(/const\s*{\s*t\s*}\s*=\s*useLanguage/, "const { t, language } = useLanguage");
    } else if (content.includes("useLanguage") && !content.includes("language") && content.match(/const\s*{\s*([^}]+)\s*}\s*=\s*useLanguage/)) {
        // Add language to it
        content = content.replace(/(const\s*{\s*)([^}]+)(\s*}\s*=\s*useLanguage)/, (match, p1, p2, p3) => {
            return p1 + p2 + ", language" + p3;
        });
    }

    // Fix imports for Timer, Trophy, RefreshCw
    const missingIcons = [];
    if (!content.includes('Timer') && content.includes('<Timer')) missingIcons.push('Timer');
    if (!content.includes('Trophy') && content.includes('<Trophy')) missingIcons.push('Trophy');
    if (!content.includes('RefreshCw') && content.includes('<RefreshCw')) missingIcons.push('RefreshCw');

    if (missingIcons.length > 0) {
        if (content.includes('lucide-react')) {
            const iconsStr = missingIcons.join(', ');
            content = content.replace(/import {([^}]+)} from 'lucide-react'/, (match, p1) => {
                let existing = p1.trim();
                for (const icon of missingIcons) {
                    if (!existing.includes(icon)) existing += `, ${icon}`;
                }
                return `import { ${existing} } from 'lucide-react'`;
            });
        } else {
            content = `import { ${missingIcons.join(', ')} } from 'lucide-react';\n` + content;
        }
    }

    // Fix imports for ActivityRanking
    if (!content.includes('import ActivityRanking') && content.includes('<ActivityRanking')) {
        content = `import ActivityRanking from './ActivityRanking';\n` + content;
    }
    // Fix imports for RatingSystem
    if (!content.includes('import RatingSystem') && content.includes('<RatingSystem')) {
        content = `import RatingSystem from './RatingSystem';\n` + content;
    }

    // `effectiveActivityId` vs `activityId` logic:
    // If the file passes `typeof effectiveActivityId !== 'undefined' ? effectiveActivityId : activityId` 
    // Typescript might complain if effectiveActivityId doesn't exist.
    if (content.includes("typeof effectiveActivityId !== 'undefined'")) {
        const hasEffective = content.includes('const effectiveActivityId');
        if (hasEffective) {
            content = content.replace(/typeof effectiveActivityId !== 'undefined' \? effectiveActivityId : activityId/g, "effectiveActivityId");
        } else {
            content = content.replace(/typeof effectiveActivityId !== 'undefined' \? effectiveActivityId : activityId/g, "(typeof activityId !== 'undefined' ? activityId : '')");
        }
    }

    fs.writeFileSync(p, content, 'utf8');
});

console.log('Fixed imports and variables');
