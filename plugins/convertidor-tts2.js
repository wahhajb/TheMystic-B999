import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command, text, args }) => {
  const [efecto, ...textoArray] = text.split(" ");
  const texto = textoArray.join(" ");

  if (!efecto) {
    let voiceList = await getVoiceList();
    let responseText = `*[❗] لم تقم بإدخال تأثير، الرجاء إدخال تأثير صوتي.*\n\n*—◉ اختر أحد التأثيرات التالية:*\n`;

    for (let i = 0, count = 0; count < 100 && i < voiceList.resultado.length; i++) {
      const entry = voiceList.resultado[i];
      if (entry.ID.length <= 20) {
        responseText += `*◉ ${usedPrefix + command} ${entry.ID} النص_هنا*\n`;
        count++;
      }
    }

    return conn.sendMessage(m.chat, { text: responseText.trim() }, { quoted: m });
  }

  let efectoValido = false;
  let voiceList = await getVoiceList();
  for (const entry of voiceList.resultado) {
    if (entry.ID === efecto) {
      efectoValido = true;
      break;
    }
  }

  if (!efectoValido) return conn.sendMessage(m.chat, { text: `*[❗] التأثير المدخل غير موجود في القائمة، استخدم ${usedPrefix + command} لمعرفة قائمة التأثيرات.*` }, { quoted: m });

  if (!texto) return conn.sendMessage(m.chat, { text: `*[❗] أدخل النص الذي تريد تحويله إلى صوت.*\n\n*—◉ مثال:*\n*◉ ${usedPrefix + command} ${efecto} مرحبًا، هذا مثال لاستخدام الأمر.*` }, { quoted: m });

  let masivo = await makeTTSRequest(texto, efecto);
  conn.sendMessage(m.chat, { audio: { url: masivo.resultado }, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
};

handler.command = /^(g?tts2)$/i;
export default handler;

const secretKey = 'fe2ee40099494579af0ecf871b5af266';
const userId = 'SrgwcKcLzSY63IdsAxd1PzscFjL2';

async function getVoiceList() {
  const url = 'https://play.ht/api/v2/voices';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      AUTHORIZATION: `Bearer ${secretKey}`,
      'X-USER-ID': userId
    }
  };
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    const uniqueData = responseData.reduce((acc, current) => {
      if (!acc.some(item => item.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);
    const simplifiedList = uniqueData
      .filter(entry => entry.language === 'ar') // تصفية الأصوات التي تدعم اللغة العربية
      .map(entry => ({
        ID: entry.id,
        name: entry.name,
        language: entry.language
      }));
    return { resultado: simplifiedList.length ? simplifiedList : '[❗] No Arabic voices found.' };
  } catch (error) {
    console.error('Error:', error);
    return { resultado: '[❗] Error, no se obtuvo respuesta de la API.' };
    throw error;
  }
}

async function makeTTSRequest(texto, efecto) {
  const requestData = { text: texto, voice: efecto };
  const headers = {
    'Authorization': `Bearer ${secretKey}`,
    'X-User-Id': userId,
    'accept': 'text/event-stream',
    'content-type': 'application/json'
  };
  try {
    const response = await axios.post('https://play.ht/api/v2/tts', requestData, { headers });
    const events = response.data.split('\r\n\r\n');
    const eventData = events.find(event => event.includes('"stage":"complete"'));
    const urlMatch = eventData.match(/"url":"([^"]+)"/);
    const url = urlMatch ? urlMatch[1] : null;
    return { resultado: url ? url : '[❗] URL not found in the response.' };
  } catch (error) {
    console.error('Error:', error);
    return { resultado: '[❗] Error, no se obtuvo respuesta de la API.' };
  }
}
