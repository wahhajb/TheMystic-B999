import fetch from "node-fetch";

// متغير لتخزين سلسلة المحادثة
let conversationHistory = [];

let handler = async (m, { conn, command, text, usedPrefix }) => {
  try {
    if (!text) {
      throw "مرحبًا، كيف يمكنني مساعدتك اليوم؟ قم بإرسال سؤالك وسأحاول الإجابة عليه.";
    }

    // تحديث سلسلة المحادثة بالرسالة الجديدة من المستخدم
    conversationHistory.push({ role: "user", content: text });

    // نص المحادثة مع الذكاء الاصطناعي
    let conversation = conversationHistory.map(msg => `${msg.role === "user" ? "المستخدم" : "شعبوط"}: ${msg.content}`).join("\n");

    // إرسال رسالة "جاري البحث"
    await conn.sendMessage(m.chat, {
      react: {
        text: "⏳",
        key: m.key,
      },
    });

    // إرسال رسالة "جاري البحث..."
    let { key } = await conn.sendMessage(m.chat, {
      text: "> جاري البحث...",
    });

    // إرسال طلب إلى الذكاء الاصطناعي
    let response = await fetch(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(conversation)}`);

    // التحقق من نجاح الطلب
    if (!response.ok) {
      throw new Error("فشل الطلب إلى خدمة OpenAI API\n يمكنك تجربه .بوت1");
    }

    // تحويل الرد إلى JSON
    let result = await response.json();

    // تحديث سلسلة المحادثة بالرد من الذكاء الاصطناعي
    conversationHistory.push({ role: "bot", content: result.result });

    // إرسال رمز ردود الفعل "✅"
    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key,
      },
    });

    // إرسال الرد من الذكاء الاصطناعي
    await conn.sendMessage(m.chat, {
      text: "" + result.result,
      edit: key,
    });
  } catch (error) {
    // إرسال رسالة الخطأ إذا حدث خطأ ما
    await conn.sendMessage(m.chat, {
      text: `مرحبا كيف يمكنني مساعدتك اليوم؟: ${error.message}`,
    });
  }
}

// تعريف الأوامر والمساعدة
handler.help = ["gpt <السؤال>"];
handler.tags = ["ذكاء اصطناعي"];
handler.command = /^(gpt|شعبوط|ai)$/i;
handler.limit = null;
handler.register = false;

// تصدير المعالج
export default handler;
