import fs from 'fs';
const content = fs.readFileSync('web/src/components/ActividadesClient.tsx', 'utf-8');
const lines = content.split(/\r?\n/);
lines.forEach((line, i) => {
    if (i + 1 >= 865 && i + 1 <= 875) {
        console.log(`${i + 1}: [${line}]`);
    }
});
