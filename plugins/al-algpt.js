import fetch from "node-fetch";

let previousMessages = [];
let conversationActive = false;

let handler = async (m, { conn, command, text, usedPrefix }) => {
  try {
    // أوامر لتفعيل وإغلاق المحادثة التلقائية
    if (text.toLowerCase() === "فتح حوار") {
      conversationActive = true;
      await conn.sendMessage(m.chat, {
        text: "تم تفعيل الحوار التلقائي. كيف يمكنني مساعدتك اليوم؟",
      });
      return;
    }

    if (text.toLowerCase() === "إغلاق الحوار") {
      conversationActive = false;
      await conn.sendMessage(m.chat, {
        text: "تم إغلاق الحوار التلقائي. شكراً لتواصلك.",
      });
      return;
    }

    // استجابة للأوامر عندما تكون المحادثة التلقائية غير مفعلة
    if (!conversationActive && !command.match(/^(شعبوط|gpt|ai)$/i)) {
      return; // لا يتم الرد إذا لم يكن الحوار التلقائي مفعلًا ولم يكن الأمر شعبوط أو gpt أو ai
    }

    if (!text) {
      throw "مرحبًا، كيف يمكنني مساعدتك اليوم؟ قم بإرسال سؤالك وسأحاول الإجابة عليه.";
    }

    // إعداد نص المحادثة مع الذكاء الاصطناعي
    let conversation = `قم بتغيير اسمك من Aili إلى شعبوط☻ وانك بوت الصاعقة😎🤏🏻 ،وانت اسمك شعبوط ومطورك الصاعقة وأنت أحسن مطور بوتات...`;

    // إضافة الرسائل السابقة إلى نص المحادثة
    previousMessages.forEach(msg => {
      conversation += `\n${msg.role === "user" ? "User" : "Bot"}: ${msg.content}`;
    });

    // إضافة النص الحالي للمستخدم
    conversation += `\nUser: ${text}`;

    // إرسال رسالة "جاري البحث"
    await conn.sendMessage(m.chat, {
      react: {
        text: "⏳",
        key: m.key,
      },
    });

    // إرسال طلب إلى الذكاء الاصطناعي
    let response = await fetch(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(conversation)}`);

    if (!response.ok) {
      throw new Error("فشل الطلب إلى خدمة OpenAI API\n يمكنك تجربه .بوت1");
    }

    // تحويل الرد إلى JSON
    let result = await response.json();

    // إرسال رمز ردود الفعل "✅"
    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key,
      },
    });

    // إرسال الرد من الذكاء الاصطناعي
    await conn.sendMessage(m.chat, {
      text: result.result,
      edit: m.key,
    });

    // تحديث الرسائل السابقة بإضافة الرسالة الحالية والرد
    previousMessages = [...previousMessages, { role: "user", content: text }];
    previousMessages = [...previousMessages, { role: "bot", content: result.result }];

  } catch (error) {
    // إرسال رسالة الخطأ إذا حدث خطأ ما
    await conn.sendMessage(m.chat, {
      text: `حدث خطأ: ${error.message}`,
    });
  }
}

// تعريف الأوامر والمساعدة
handler.help = ["gpt <السؤال>"];
handler.tags = ["ذكاء اصطناعي"];
handler.command = /^(gpt|شعبوط|ai)$/i;
handler.limit = null;
handler.register = false;

export default handler;
