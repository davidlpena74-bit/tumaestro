import fs from 'fs';
const content = fs.readFileSync('web/src/components/ActividadesClient.tsx', 'utf-8');
const lines = content.split('\n');
// Ensure it ends at the last closing brace and has nothing else
let lastBraceIndex = -1;
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '}') {
        lastBraceIndex = i;
        break;
    }
}
if (lastBraceIndex !== -1) {
    const finalLines = lines.slice(0, lastBraceIndex + 1);
    fs.writeFileSync('web/src/components/ActividadesClient.tsx', finalLines.join('\n'), 'utf-8');
    console.log(`File truncated to ${finalLines.length} lines`);
}
