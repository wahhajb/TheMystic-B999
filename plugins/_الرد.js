 let handler = async (m, { conn }) => {
    let teks = `${pickRandom([
        'مرحبا كيف يمكنني مساعدتك اليوم',
      
    ])}`;

    // تقسيم النص إلى كلمات والتحقق من وجود الكلمة "بوت" ككلمة منفردة
    let words = m.text.split(" ");
    if (words.includes("بوت")) {
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }});
    }
}
handler.customPrefix = /(بوت)$/i;
handler.command = new RegExp;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
