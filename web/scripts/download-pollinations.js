const fs = require('fs');
const https = require('https');
const path = require('path');

const prompt = process.argv[2] || "magical forest in arthur rackham style";
const filename = process.argv[3] || "test-pollinations.png";
const width = 1024;
const height = 1024;

const encodedPrompt = encodeURIComponent(prompt);
const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true`;

const targetPath = path.join(__dirname, '../public/images/storyteller', filename);

console.log(`Downloading image for prompt: "${prompt}"...`);
console.log(`URL: ${url}`);

https.get(url, (response) => {
    if (response.statusCode !== 200) {
        console.error(`Failed to download image: ${response.statusCode} ${response.statusMessage}`);
        return;
    }

    const fileStream = fs.createWriteStream(targetPath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Image saved to: ${targetPath}`);
    });
}).on('error', (err) => {
    console.error(`Error: ${err.message}`);
});
