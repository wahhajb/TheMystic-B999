import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ organization: global.openai_org_id, apiKey: global.openai_key });
const openai = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (usedPrefix == 'a' || usedPrefix == 'A') return;
    if (!text) throw `مرحبًا، أصبح بوت الصاعقة قادرًا على الإجابة على أسئلتك وتلبية طلباتك، جرب أن تطلب شيئًا مثل:\n\n❏ ${usedPrefix + command} أفضل فيلم\n❏ ${usedPrefix + command} نكتة\n❏ ${usedPrefix + command} أحدث الأخبار\n\nوسأكون هنا للمساعدة!`;

    try {
        conn.sendPresenceUpdate('composing', m.chat);
        const sistema1 = `سوف تعمل بمثابة WhatsApp Bot الذي أنشأه زورو.`;
        const chgptdb = global.chatgpt.data.users[m.sender];
        chgptdb.push({ role: 'user', content: text });
        const url = "https://api.openai.com/v1/chat/completions";
        const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${global.openai_key}` };
        const data = { "model": "gpt-3.5-turbo", "messages": [{ "role": "system", "content": sistema1 }, ...chgptdb] };
        const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
        const result = await response.json();
        const finalResponse = result.choices[0].message.content;
        m.reply(`${finalResponse}`.trim());
    } catch {
        try {
            conn.sendPresenceUpdate('composing', m.chat);
            const botIA222 = await openai.createCompletion({ model: 'text-davinci-003', prompt: text, temperature: 0.3, max_tokens: 4097, stop: ['Ai:', 'Human:'], top_p: 1, frequency_penalty: 0.2, presence_penalty: 0 });
            const botResponse = botIA222.data.choices[0].text;
            m.reply(botResponse.trim());
        } catch {
            try {
                conn.sendPresenceUpdate('composing', m.chat);
                const syms1 = `سوف تعمل بمثابة WhatsApp Bot الذي أنشأه زورو.`;
                const fgapi1 = await fetch(`https://api-fgmods.ddns.net/api/info/openai?text=${text}&symsg=${syms1}&apikey=XlwAnX8d`);
                const fgjson1 = await fgapi1.json();
                if (fgjson1.result == 'error' || fgjson1.result == '' || !fgjson1.result) return XD; // causar error undefined para lanzar msg de error
                m.reply(`${fgjson1.result}`.trim());
            } catch {
                try {
                    conn.sendPresenceUpdate('composing', m.chat);
                    const vihangayt1 = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`);
                    const vihangaytjson1 = await vihangayt1.json();
                    if (vihangaytjson1.data == 'error' || vihangaytjson1.data == '' || !vihangaytjson1.data) return XD; // causar error undefined para usar otra api
                    m.reply(`${vihangaytjson1.data}`.trim());
                } catch {
                    try {
                        conn.sendPresenceUpdate('composing', m.chat);
                        const vihangayt error  || !akuariapijson2.respon) return XD; // causar error undefined para lanzar msg de error
                                        const akuariapiresult2 = await translate(`${akuariapijson2.respon}`, { to:  ar , autoCorrect: true });
                                        m.reply(akuariapiresult2.text.trim());
                                    } catch {
                                    try {
    conn.sendPresenceUpdate( composing , m.chat);
    const vihangayt2 = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`);
    const vihangaytjson2 = await vihangayt2.json();
    if (vihangaytjson2.data ==  error  || vihangaytjson2.data ==    || !vihangaytjson2.data) return XD; // causar error undefined para usar otra api
    m.reply(`${vihangaytjson2.data}`.trim());
} try {
    conn.sendPresenceUpdate( composing , m.chat);
    const vihangayt2 = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`);
    const vihangaytjson2 = await vihangayt2.json();
    if (vihangaytjson2.data ==  error  || vihangaytjson2.data ==    || !vihangaytjson2.data) return XD; // causar error undefined para usar otra api
    m.reply(`${vihangaytjson2.data}`.trim());
} catch {
    try {
        conn.sendPresenceUpdate( composing , m.chat);
        const akuariapi2 = await fetch(`https://api.akuari.my.id/ai/gpt?chat=${text}`);
        const akuariapijson2 = await akuariapi2.json();
        if (akuariapijson2.respon ==  error  || akuariapijson2.respon ==    || !akuariapijson2.respon) return XD; // causar error undefined para lanzar msg de error
        const akuariapiresult2 = await translate(`${akuariapijson2.respon}`, { to:  ar , autoCorrect: true });
        m.reply(akuariapiresult2.text.trim());
    } catch {
    try {
        conn.sendPresenceUpdate('composing', m.chat);
        const vihangayt2 = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`);
        const vihangaytjson2 = await vihangayt2.json();
        if (vihangaytjson2.data == 'error' || vihangaytjson2.data == '' || !vihangaytjson2.data) return XD; // causar error undefined para usar otra api
        m.reply(`${vihangaytjson2.data}`.trim());
    } catch {
        try {
            conn.sendPresenceUpdate('composing', m.chat);
            const akuariapi2 = await fetch(`https://api.akuari.my.id/ai/gpt?chat=${text}`);
            const akuariapijson2 = await akuariapi2.json();
            if (akuariapijson2.respon == 'error' || akuariapijson2.respon == '' || !akuariapijson2.respon) return XD; // causar error undefined para lanzar msg de error
            const akuariapiresult2 = await translate(`${akuariapijson2.respon}`, { to: 'ar', autoCorrect: true });
            m.reply(akuariapiresult2.text.trim());
        } catch {
            try {
                conn.sendPresenceUpdate('composing', m.chat);
                const akuariapi1 = await fetch(`https://api.akuari.my.id/ai/gbard?chat=${text}`);
                const akuariapijson1 = await akuariapi1.json();
                if (akuariapijson1.respon == 'error' || akuariapijson1.respon == '' || !akuariapijson1.respon) return XD; // causar error undefined para usar otra api
                const akuariapiresult1 = await translate(`${akuariapijson1.respon}`, { to: 'ar', autoCorrect: true });
                m.reply(`${akuariapiresult1.text}`.trim());
            } catch {
                throw `*[❗] خطأ*`;
            }
        }
    }
}

handler.command = /^(بوت2)$/i;
export default handler;
