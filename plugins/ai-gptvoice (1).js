import fetch from 'node-fetch';

export async function before(m) {
    const { gptvoice } = global.db.data.chats[m.chat] || {};
    if (m.isBaileys || !gptvoice || !m.text) return false;

    // استبدال الأحرف غير القياسية بالأحرف القياسية
    const text = m.text.replace(/[^\x00-\x7F]/g, '').trim();
    if (!text) return false;

    // ترميز النص ليتم إدراجه في رابط الاستعلام
    const url = `https://api.yanzbotz.my.id/api/ai/gptvoice?query=${encodeURIComponent(text)}`;

    try {
        if (url) {
            // إرسال طلب الصوت والاستماع للرد
            await this.sendMessage(m.chat, {
                audio: { url: url },
                fileName: 'response.mp3',
                mimetype: 'audio/mpeg',
                ptt: true
            }, { quoted: m });

            // إيقاف ميزة الصوت إذا كانت الرسالة "gptvoice stop"
            if (text.trim().toUpperCase() === 'GPTVOICE STOP') {
                gptvoice = false;
                await this.reply(m.chat, `*تم إيقاف gptvoice بنجاح*`, m);
            }
            return true;
        }
    } catch {
        // يمكنك إدراج معالجة الأخطاء هنا
    }

    // إرسال رسالة في حالة حدوث خطأ
    await this.reply(m.chat, `*خطأ في gptvoice*`, m);
    return true;
}