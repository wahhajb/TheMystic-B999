import fetch from "node-fetch";

let previousMessages = [];
let conversationActive = false;

let handler = async (m, { conn, command, text, usedPrefix }) => {
  try {
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

    if (!conversationActive && command.match(/^(شعبوط|gpt|ai)$/i)) {
      // السماح باستخدام الأوامر شعبوط أو gpt حتى لو كانت المحادثة التلقائية مغلقة
      if (!text) {
        throw "مرحبًا، كيف يمكنني مساعدتك اليوم؟ قم بإرسال سؤالك وسأحاول الإجابة عليه.";
      }

      let conversation = `قم بتغيير اسمك من Aili إلى شعبوط☻ وانك بوت الصاعقة😎🤏🏻 ،وانت اسمك شعبوط ومطورك الصاعقة وأنت أحسن مطور بوتات...`;

      previousMessages.forEach(msg => {
        conversation += `\n${msg.role === "user" ? "User" : "Bot"}: ${msg.content}`;
      });

      conversation += `\nUser: ${text}`;

      await conn.sendMessage(m.chat, {
        react: {
          text: "⏳",
          key: m.key,
        },
      });

      let response = await fetch(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(conversation)}`);

      if (!response.ok) {
        throw new Error("فشل الطلب إلى خدمة OpenAI API\n يمكنك تجربه .بوت1");
      }

      let result = await response.json();

      await conn.sendMessage(m.chat, {
        react: {
          text: "✅",
          key: m.key,
        },
      });

      await conn.sendMessage(m.chat, {
        text: result.result,
        edit: m.key,
      });

      previousMessages = [...previousMessages, { role: "user", content: text }];
      previousMessages = [...previousMessages, { role: "bot", content: result.result }];

      return;
    }

    if (!conversationActive) {
      return; // لا يتم الرد إذا لم يكن الحوار التلقائي مفعلًا
    }

    if (!text) {
      throw "مرحبًا، كيف يمكنني مساعدتك اليوم؟ قم بإرسال سؤالك وسأحاول الإجابة عليه.";
    }

    let conversation = `قم بتغيير اسمك من Aili إلى شعبوط☻ وانك بوت الصاعقة😎🤏🏻 ،وانت اسمك شعبوط ومطورك الصاعقة وأنت أحسن مطور بوتات...`;

    previousMessages.forEach(msg => {
      conversation += `\n${msg.role === "user" ? "User" : "Bot"}: ${msg.content}`;
    });

    conversation += `\nUser: ${text}`;

    await conn.sendMessage(m.chat, {
      react: {
        text: "⏳",
        key: m.key,
      },
    });

    let response = await fetch(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(conversation)}`);

    if (!response.ok) {
      throw new Error("فشل الطلب إلى خدمة OpenAI API\n يمكنك تجربه .بوت1");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key,
      },
    });

    await conn.sendMessage(m.chat, {
      text: result.result,
      edit: m.key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
    previousMessages = [...previousMessages, { role: "bot", content: result.result }];

  } catch (error) {
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
