/* -------------------------------------------------------*/
/* [❗]                      [❗]                      [❗] */
/*                                                       */
/*        |- [ ⚠ ] - CODE CREDITS - [ ⚠ ] -|            */
/*           —◉ DEVELOPED BY LUA SER OFC:                */
/*       ◉ git : (https://github.com/xxirfanx)           */
/*                                                       */
/* [❗]                      [❗]                      [❗] */
/* -------------------------------------------------------*/

/*import { googleImage } from '@bochilteam/scraper';
import sharp from 'sharp';
import fetch from 'node-fetch';

var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `خاص بالبحث عن الصور بجودة عالية\n ${usedPrefix}${command} Good Old Days`;

    const res = await googleImage("جاري البحث عن الصور. ..");
    let images = res;
    conn.reply(wait)

    for (let i = 0; i < Math.min(images.length, 8); i++) {
        let randomIndex = Math.floor(Math.random() * images.length); // Random Image
        let imageLink = images[randomIndex];
      
        // let imageLink = images[i];
      
        try {
            let imgBuffer = await (await fetch(imageLink)).buffer();
            let metadata = await sharp(imgBuffer).metadata();
            let resolution = `${metadata.width} x ${metadata.height}`;
          
            let processedImageBuffer = await sharp(imgBuffer)
                .resize(5120) // best Which HD Just by lua ser ofc
                .toBuffer();

            let metadata_HD = await sharp(processedImageBuffer).metadata();
            let resolution_HD = `${metadata_HD.width} x ${metadata_HD.height}`;

            conn.sendFile(m.chat, processedImageBuffer, 'google.jpg', `*Search result Google Image*
🔎 *Query:* ${text}
📐 *Resolution Original:* ${resolution}
📏 *Resolution HD:* ${resolution_HD}
🌎 *Source:* Google`, m);

            await new Promise(resolve => setTimeout(resolve, 2000)); // give me a pause for a few seconds 1000 -> 1 second
        } catch (error) {
            console.error('Error fetching image:', error);
            // Skip and continue to the next picture
        }
    }
}

handler.help = ['gimage < query >', 'image < query >'];
handler.tags = ['search'];
handler.command = /^(gimage|image|googleimage|googleimg|gimg)$/i;

export default handler;*/
