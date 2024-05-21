/**
 * @type {import('@whiskeysockets/baileys')}
 */
const {
  proto,
  generateWAMessage,
  areJidsSameUser,
  decryptPollVote,
} = (await import('@whiskeysockets/baileys')).default;

import { googleImage } from '@bochilteam/scraper';

export async function all(m, chatUpdate) {
  if (m.isBaileys) {
    return;
  }
  if (!m.message) {
    return;
  }
  if (!(m.message.buttonsResponseMessage || m.message.templateButtonReplyMessage || m.message.listResponseMessage || m.message.interactiveResponseMessage)) {
    return;
  }
  let id;
  if (m.message.buttonsResponseMessage) {
    id = m.message.buttonsResponseMessage.selectedButtonId;
  } else if (m.message.templateButtonReplyMessage) {
    id = m.message.templateButtonReplyMessage.selectedId;
  } else if (m.message.listResponseMessage) {
    id = m.message.listResponseMessage.singleSelectReply?.selectedRowId;
  } else if (m.message.interactiveResponseMessage) {
    id = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id;
  }

  const [command, url] = id.split(' ');

  if (command === 'sendimage' && url) {
    try {
      await conn.sendFile(m.chat, url, 'image.jpg', `🔗 *من:* ${url}`, m);
      console.log(`تم إرسال الصورة: ${url}`);
    } catch (e) {
      console.error(e);
      await conn.sendMessage(m.chat, 'حدث خطأ أثناء إرسال الصورة.', m);
    }
  } else if (command === '.صورة' && text) {
    if (m.text.match(/\b(gore|cp|porno|xxx|sex|سكس|طيز|خرق|نيك|قحبه|قحبة|porn|xxnx|xnxx|خرقك)\b/i)) 
      return m.reply('[❗خطاء❗] لا يمكنني إرسال هذا المحتوى، المجموعة محظورة\nإذا كنت مشرفًا وتريد تنشيطها، أخبر المطور');

    const res = await googleImage(text);
    const images = res.slice(0, 5);  // اختر 5 صور للعرض عبر الأزرار

    const buttons = images.map((image, index) => ({
        buttonId: `sendimage ${image.url}`,
        buttonText: { displayText: `صورة ${index + 1}` },
        type: 1
    }));

    const buttonMessage = {
        text: `🔎 *النتائج التي تم الحصول عليها ل:* ${text}\n🌎 *محرك البحث:* جوجل`,
        footer: 'اختر الصورة التي تريد إرسالها',
        buttons: buttons,
        headerType: 1
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
  }
}
