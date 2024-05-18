 import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ organization: global.openai_org_id, apiKey: global.openai_key });
const openai = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (usedPrefix == 'a' || usedPrefix == 'A') return;
    if (!text) throw `مرحبًا! أنا بوت الصاعقة🌩️ يمكنني مساعدتك إذا كان لديك أي أسئلة أو استفسارات. ماذا تحتاج؟`;

    try {
        conn.sendPresenceUpdate('composing', m.chat);
        let respuesta;

        // Your OpenAI interaction
        respuesta = await getOpenAIChatCompletion(text);

        if (respuesta == 'error' || respuesta == '' || !respuesta) {
            // Try another AI API or handle the error
        } else {
            m.reply(`${respuesta}`.trim());
            return;
        }
    } catch {
        // Handle error
    }

    // If OpenAI fails or throws an error, try other APIs or services
    // ...

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
