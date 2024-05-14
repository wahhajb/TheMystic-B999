let handler = async (m, { conn }) => {
    let teks = `${pickRandom([
        'مرحبا كيف يمكنني مساعدتك اليوم',
      
    ])}`;

    // التحقق من أن النص يبدأ بـ ".بوت"
    if (m.text.toLowerCase().startsWith(".بوت")) {
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }});
    }
}
handler.customPrefix = /\.بوت/i; // تحديد النقطة في البداية كبادئة مخصصة
handler.command = new RegExp;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
