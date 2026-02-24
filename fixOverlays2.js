const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'web/src/components/games');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');

    // Fix string | undefined for activityId
    content = content.replace(/activityId=\{effectiveActivityId\}/g, "activityId={effectiveActivityId || 'game'}");
    content = content.replace(/activityId=\{activityId\}/g, "activityId={activityId || 'game'}");
    content = content.replace(/activityId=\{\(typeof activityId !== 'undefined' \? activityId : ''\)\}/g, "activityId={typeof activityId !== 'undefined' && activityId ? activityId : 'game'}");

    // Re-check missing icons
    const missingIcons = [];
    if (!content.includes('Timer') && content.includes('<Timer')) missingIcons.push('Timer');
    if (!content.includes('Trophy') && content.includes('<Trophy')) missingIcons.push('Trophy');
    if (!content.includes('RefreshCw') && content.includes('<RefreshCw')) missingIcons.push('RefreshCw');

    if (missingIcons.length > 0) {
        if (content.includes("from 'lucide-react'") || content.includes('from "lucide-react"')) {
            content = content.replace(/(import\s*{[^}]+)(\s*}\s*from\s*['"]lucide-react['"])/, (match, p1, p2) => {
                let existing = p1;
                for (const icon of missingIcons) {
                    if (!existing.includes(icon)) existing += `, ${icon}`;
                }
                return existing + p2;
            });
        } else {
            // Find the last import
            const lastImportIndex = content.lastIndexOf("import ");
            const endOfLastImport = content.indexOf("\n", lastImportIndex);
            if (lastImportIndex !== -1 && endOfLastImport !== -1) {
                content = content.substring(0, endOfLastImport) + `\nimport { ${missingIcons.join(', ')} } from 'lucide-react';` + content.substring(endOfLastImport);
            } else {
                content = `import { ${missingIcons.join(', ')} } from 'lucide-react';\n` + content;
            }
        }
    }

    // Fix language and gameMode missing in some QuizGame and RegionGameCopy
    if (!content.includes('gameMode')) {
        content = content.replace(/gameMode === 'challenge'/g, "true");
    }

    if (!content.includes('language')) {
        content = content.replace(/language === 'es'/g, "true");
    }

    fs.writeFileSync(p, content, 'utf8');
});

console.log('Fixed extra types');
