import fetch from 'node-fetch';
import uploader from '../lib/uploadImage.js';

var handler = async (m, { conn, text, command, usedPrefix }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        let buffer = await q.download();

        await m.reply('يرجى الانتظار...');

        try {
            let media = await (uploader)(buffer);
            console.log('Media URL:', media); // تسجيل عنوان URL للوسائط

            let response = await fetch(`https://aemt.me/bardimg?url=${media}&text=${text}`);
            let json = await response.json();
            console.log('API Response:', json); // تسجيل الاستجابة من الـAPI

            if (json.result) {
                conn.sendMessage(m.chat, { text: json.result }, { quoted: m });
            } else {
                throw 'API لم تُرجع أي نتائج';
            }
        } catch (error) {
            console.error('Error:', error); // تسجيل الخطأ لتحليل الأخطاء
            m.reply('حدث خطأ أثناء تحليل الصورة.');
        }
    } else {
        throw `*قم بالرد على الصورة التي تريد أن أقرأ محتواها*\n\nمثال\n${usedPrefix + command} أعطني معلومات عن الصورة المرسلة`;
    }
};

handler.help = ['bardimg', 'geminiimg'];
handler.tags = ['herramientas'];
handler.command = /^(تحليل|geminiimage|geminimg|geminimage|bardimg)$/i;
handler.limit = false;

export default handler;
