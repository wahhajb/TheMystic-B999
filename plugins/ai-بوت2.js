import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ organization: global.openai_org_id, apiKey: global.openai_key });
const openai = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (usedPrefix === 'a' || usedPrefix === 'A') return;
    if (!text) throw `مرحبًا! أنا بوت الصاعقة🌩️ يمكنني مساعدتك إذا كان لديك أي أسئلة أو استفسارات. ماذا تحتاج؟`;

    try {
        conn.sendPresenceUpdate('composing', m.chat);
        const respuesta = await getOpenAIChatCompletion(text);

        if (!respuesta) throw 'error';

        m.reply(`${respuesta}`.trim());
    } catch {
        // Handle error or try another API
        // For example:
        // m.reply('عذرًا، لم أتمكن من الرد على هذا الاستفسار في الوقت الحالي.');
    }
};

const getOpenAIChatCompletion = async (text) => {
    const openaiAPIKey = global.openai_key;
    const sistema1 = `سوف تعمل بمثابة WhatsApp Bot الذي أنشأه زورو  .`;
    const chgptdb = global.chatgpt.data.users[m.sender];
    chgptdb.push({ role: 'user', content: text });
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${openaiAPIKey}` };
    const data = { "model": "gpt-3.5-turbo", "messages": [{ "role": "system", "content": sistema1 }, ...chgptdb, ]};

    const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
    const result = await response.json();
    const finalResponse = result.choices[0].message.content;
    return finalResponse;
};

handler.command = /^(بوت2)$/i;
export default handler;
