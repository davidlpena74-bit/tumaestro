import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';

async function test() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("es-ES-ElviraNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const text = "Hola, esta es una prueba de voz.";
    const { audioStream } = await tts.toStream(text);

    const writable = fs.createWriteStream('test-voice.mp3');
    audioStream.pipe(writable);

    writable.on('finish', () => {
        const stats = fs.statSync('test-voice.mp3');
        console.log(`Saved test-voice.mp3. Size: ${stats.size} bytes`);
    });
}

test();
