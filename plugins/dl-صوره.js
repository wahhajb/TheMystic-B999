import { googleImage } from '@bochilteam/scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*[❗خطاء❗] مثال على الأمر ${usedPrefix + command} أحمد طرزان*`;
    if (m.text.match(/\b(gore|cp|porno|xxx|sex|سكس|طيز|خرق|نيك|قحبه|قحبة|porn|xxnx|xnxx|خرقك)\b/i)) 
        return m.reply('[❗خطاء❗] لا يمكنني إرسال هذا المحتوى، المجموعة محظورة\nإذا كنت مشرفًا وتريد تنشيطها، أخبر المطور');
    
    const res = await googleImage(text);
    const images = res.slice(0, 5);  // اختر 5 صور للعرض عبر الأزرار

    const buttons = images.map((image, index) => ({
        buttonId: `#sendimage ${image.url}`,
        buttonText: { displayText: `صورة ${index + 1}` },
        type: 1
    }));

    const buttonMessage = {
        text: `🔎 *النتائج التي تم الحصول عليها ل:* ${text}\n🌎 *محرك البحث:* جوجل`,
        footer: 'اختر الصورة التي تريد إرسالها',
        buttons: buttons,
        headerType: 1
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
}

handler.help = ['gimage <query>', 'imagen <query>'];
handler.tags = ['internet', 'tools'];
handler.command = /^(صورة|image|صوره|imagen)$/i;

export default handler;

// إضافة التعامل مع زر الضغط
conn.ev.on('messages.upsert', async (chatUpdate) => {
    const message = chatUpdate.messages[0];
    if (!message.message) return;
    if (message.key.fromMe) return;
    const { text } = message.message.conversation || '';
    if (text.startsWith('#sendimage')) {
        const imageUrl = text.split(' ')[1];
        await conn.sendFile(message.key.remoteJid, imageUrl, 'image.jpg', `🔗 *من:* ${imageUrl}`, message);
    }
});
