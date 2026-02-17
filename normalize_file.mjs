import fs from 'fs';
const content = fs.readFileSync('web/src/components/ActividadesClient.tsx', 'utf-8');
// Normalize line endings and ensure UTF-8
fs.writeFileSync('web/src/components/ActividadesClient.tsx', content.replace(/\r\n/g, '\n'), 'utf-8');
console.log('File normalized to UTF-8 with LF');
