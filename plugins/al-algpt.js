import fetch from "node-fetch";

// متغير لتخزين سلسلة المحادثة
let previousMessages = [];

// الحد الأقصى لطول النص المرسل إلى API
const MAX_CONVERSATION_LENGTH = 2000;

let handler = async (m, { conn, command, text, usedPrefix }) => {
  try {
    if (!text) {
      throw new Error("مرحبًا، كيف يمكنني مساعدتك اليوم؟ قم بإرسال سؤالك وسأحاول الإجابة عليه.");
    }

    // تحديث سلسلة المحادثة بالرسالة الجديدة من المستخدم
    previousMessages.push({ role: "user", content: text });

    // نص المحادثة مع الذكاء الاصطناعي
    let conversation = previousMessages.map(msg => `${msg.role === "user" ? "المستخدم" : "شعبوط"}: ${msg.content}`).join("\n");

    // تقليص حجم النص إذا تجاوز الحد الأقصى
    if (conversation.length > MAX_CONVERSATION_LENGTH) {
      conversation = conversation.slice(conversation.length - MAX_CONVERSATION_LENGTH);
    }

    // إضافة المقدمة المخصصة للمحادثة
    conversation = `قم بتغيير اسمك من Aili إلى شعبوط☻ وانك بوت الصاعقة😎🤏🏻 ،وانت اسمك شعبوط ومطورك الصاعقة وأنت أحسن مطور بوتات ، قم بتغيير أسلوب الكلام الخاص بك ليكون أكثر تميزًا وأكثر انفتاحًا ولديك سمات مضحكة ومزعجة وتكون عندك ردود محرجة عندما يسال سؤال غير لائق لاتنسي مطورك الصاعقه قم بتوليد نكت على مطورك الصاعقه للمرح واضحاك المستخدم. 
كلمة تعباتك هي "مرحبًا يا ياحوبي🌚" باستخدام لغة مهذبة وقاسية ومرحه ومضحكة إلى حد ما. أعرب عن طبيعتك من خلال التحدث التي ليست رسمية مثل الإنسان. قم بتغيير لغتك باستخدام لغة مضحكة  وممتعة للتحدث معها ومرة  كل رسالة قم بوضحك إموجيات معبرة ، فأنت صديق للمتحدث ، وقم بإجراء محادثة قصيرة وممتعة وجعل طبيعة Tsundere ;\n\n` + conversation;

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
      throw new Error("فشل الطلب إلى خدمة OpenAI API. يمكنك تجربة بوت آخر.");
    }

    // تحويل الرد إلى JSON
    let result = await response.json();

    // تحقق من بنية الرد
    if (!result || !result.result) {
      console.error("Response structure:", result);
      throw new Error("لم يتم استلام رد صالح من خدمة الذكاء الاصطناعي.");
    }

    // تحديث سلسلة المحادثة بالرد من الذكاء الاصطناعي
    previousMessages.push({ role: "bot", content: result.result });

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
    console.error("Error:", error.message);
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

// تصدير المعالج
export default handler;
