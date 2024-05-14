 let handler = async (m, { conn }) => {
    let teks = `${pickRandom([
        'مرحبا كيف يمكنني مساعدتك اليوم',
      
    ])}`;

    // التحقق من أن النص يحتوي على ".بوت" ككلمة منفردة مع النقطة في البداية
    if (/\b\.بوت\b/i.test(m.text)) {
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }});
    }
}
handler.customPrefix = /\.بوت/i; // تحديد النقطة في البداية كبادئة مخصصة
handler.command = new RegExp;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
