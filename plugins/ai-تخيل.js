const fetch = require('node-fetch');

let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (command == 'مساعد') {
    if (!text) throw `مثال : ${usedPrefix + command} من هو اول دخل مكة 
 ؟`;
    try {
      m.reply('انتظر...')
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            apikey: lann
          })
        })
        .then(res => res.json());

      await conn.reply(m.chat, response.message, m);
    } catch (e) {
      console.log(e);
      throw `*خطأ:* ${خطأ}`;
    }
  }
  if (command == 'تخيل') {
    if (!text) throw `مثال: ${usedPrefix + command} طفل يجري مرتدياً ملابس حمراء رسوم متحركة ثلاثية الأبعاد`;
    try {
      m.reply('انتظر...')
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-img', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            apikey: lann
          })
        })
        .then(res => res.json());

      for (let i = 0; i < 4; i++) {
        let img = response.result[i]
        await sleep(3000)
        await conn.sendFile(m.chat, img, 'bing_img.png', `*النص:* ${text}`, m)
      }
    } catch (error) {
      throw `خطأ: ${خطأ}`
    }
  }
}

handler.command = handler.help = ['مساعد', 'تخيل']
handler.tags = ['مساعد']
handler.limit = true

module.exports = handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
