 import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'bing') {
    if (!text) throw `Example: ${usedPrefix + command} siapa presiden Indonesia?`;
    try {
      m.reply('wait');
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          apikey: 'lann'
        })
      }).then(res => res.json());

      await conn.reply(m.chat, response.message, m);
    } catch (e) {
      console.log(e);
      throw `*Error:* ${e.message}`;
    }
  }
  if (command === 'bingimg') {
    if (!text) throw `Contoh: ${usedPrefix + command} anak berlari menggunakan pakaian merah 3d animation`;
    try {
      m.reply('wait');
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          apikey: 'lann'
        })
      }).then(res => res.json());

      for (let i = 0; i < 4; i++) {
        let img = response.result[i];
        await sleep(3000);
        await conn.sendFile(m.chat, img, 'bing_img.png', `*PROMPT:* ${text}`, m);
      }
    } catch (error) {
      console.log(error);
      throw `*Error:* ${error.message}`;
    }
  }
};

handler.command = ['bing', 'bingimg'];
handler.tags = ['drawing'];
handler.limit = true;

export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
