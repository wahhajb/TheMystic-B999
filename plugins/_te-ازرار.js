/**
 * @type {import('@whiskeysockets/baileys')}
 */
const {
  proto,
  generateWAMessage,
  areJidsSameUser,
  decryptPollVote,
} = (await import('@whiskeysockets/baileys')).default;

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
  }
}
