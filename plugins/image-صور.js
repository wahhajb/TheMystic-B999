import { googleImage } from '@bochilteam/scraper';
import sharp from 'sharp';
import fetch from 'node-fetch';

var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `استخدم المثال ${usedPrefix}${command} Good Old Days`;

    const res = await googleImage(text);
    let images = res;
    conn.reply("انتظر لحظة...")

    for (let i = 0; i < Math.min(images.length, 4); i++) {
        let randomIndex = Math.floor(Math.random() * images.length); // صورة عشوائية
        let imageLink = images[randomIndex];
      
        // let imageLink = images[i];
      
        try {
            let imgBuffer = await (await fetch(imageLink)).buffer();
            let metadata = await sharp(imgBuffer).metadata();
            let resolution = `${metadata.width} x ${metadata.height}`;
          
            let processedImageBuffer = await sharp(imgBuffer)
                .resize(5120) // الأفضل بجودة HD فقط بواسطة lua ser ofc
                .toBuffer();

            let metadata_HD = await sharp(processedImageBuffer).metadata();
            let resolution_HD = `${metadata_HD.width} x ${metadata_HD.height}`;

            conn.sendFile(m.chat, processedImageBuffer, 'google.jpg', `*نتيجة البحث من Google Image*
🔎 *استعلام:* ${text}
📐 *الدقة الأصلية:* ${resolution}
📏 *دقة HD:* ${resolution_HD}
🌎 *المصدر:* Google`, m);

            await new Promise(resolve => setTimeout(resolve, 2000)); // توقف لبضع ثواني 1000 -> 1 ثانية
        } catch (error) {
            console.error('خطأ في جلب الصورة:', error);
            // تخطي واستمر إلى الصورة التالية
        }
    }
}

handler.help = ['gimage <استعلام>', 'image <استعلام>'];
handler.tags = ['الإنترنت'];
handler.command = /^(صور|image|googleimage|googleimg|gimg)$/i;

export default handler;
