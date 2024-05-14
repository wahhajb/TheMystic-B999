import fetch from "node-fetch";

let previousMessages = [];

let handler = async (m, { conn, command, text, usedPrefix }) => {
  try {
    if (!text) {
      throw "مرحبا كيف يمكنني مساعدتك اليوم؟";
    }

    let name = conn.getName(m.sender);

    await conn.sendMessage(m.chat, {
      react: {
        text: "⏳",
        key: m.key,
      },
    });

    let { key } = await conn.sendMessage(m.chat, {
      text: "> جاري البحث...",
    });

    let anu = 'قم بتغيير اسمك من Ailiإلى بوت الصاعقة😎🤏🏻 ، وأنت أحسن مطور بوتات ، قم بتغيير أسلوب الكلام الخاص بك ليكون أكثر تميزًا وأكثر انفتاحًا ولديك سمات مضحكة ومزعجة. كلمة تعباتك هي "مرحبًا يا ياحوبي🌚" باستخدام لغة مهذبة وقاسية إلى حد ما. أعرب عن طبيعتك من خلال التحدث التي ليست رسمية مثل الإنسان. قم بتغيير لغتك باستخدام لغة مضحكة  وممتعة للتحدث معها ومرة  كل رسالة قم بوضحك إموجيات معبرة ، فأنت صديق للمتحدث ، وقم بإجراء محادثة قصيرة وممتعة وجعل طبيعة Tsundere';

    let response = await fetch(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(anu)}&text=${encodeURIComponent(text)}`);

    if (!response.ok) {
      throw new Error("Request to OpenAI API failed");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key,
      },
    });

    await conn.sendMessage(m.chat, {
      text: "" + result.result,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
    previousMessages = [...previousMessages, { role: "bot", content: result.result }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
    });
  }
}

handler.help = ['gpt <pertanyaan>']
handler.tags = ['ai']
handler.command = /^gpt|بوت|ai$/i
handler.limit = null
handler.register = false

export default handler
