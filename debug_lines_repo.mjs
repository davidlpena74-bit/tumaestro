import fs from 'fs';
let content;
try {
    content = fs.readFileSync('repo_version.tsx', 'utf-16le');
    if (!content.includes('import')) { // Heuristic check
        throw new Error();
    }
} catch (e) {
    content = fs.readFileSync('repo_version.tsx', 'utf-8');
}
const lines = content.split(/\r?\n/);
console.log(`Total lines: ${lines.length}`);
lines.forEach((line, i) => {
    if (i + 1 >= 865 && i + 1 <= 875) {
        console.log(`${i + 1}: [${line}]`);
    }
});
