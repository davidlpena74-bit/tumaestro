import fs from 'fs';
import https from 'https';

const url = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson';
const lowResUrl = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_1_states_provinces.geojson';

const download = (u, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(u, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                download(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${u}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✅ Download finished: ${dest} (${fs.statSync(dest).size} bytes)`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

const run = async () => {
    try {
        console.log("🚀 Starting downloads...");
        await download(lowResUrl, 'public/maps/world-admin-1-50m.geojson');
        await download(url, 'public/maps/world-admin-1.geojson');
        console.log("✨ All downloads completed!");
    } catch (e) {
        console.error("❌ Download error:", e.message);
    }
};

run();
