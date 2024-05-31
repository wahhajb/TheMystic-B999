import uploadImage from '../lib/uploadImage.js';
import BardAI from '../lib/bard.js';

const bardAi = new BardAI();

let handler = async (message, {
  conn: connection,
  args: arguments,
  usedPrefix: prefix,
  command: cmd
}) => {
  let inputText;
  if (arguments.length >= 1) {
    inputText = arguments.slice(0).join(" ");
  } else {
    if (message.quoted && message.quoted.text) {
      inputText = message.quoted.text;
    } else {
      return conn.sendMessage(message.chat, {
        text: "يمكنك الأن التحدث مع موديل غوغل الجديد bard\n\nمثال \n .bard حوار حول المغرب"
      }, { quoted: message });
    }
  }
  let quotedMessage = message.quoted ? message.quoted : message;
  let mimeType = (quotedMessage.msg || quotedMessage).mimetype || '';
  
  // استبدال message.react بإرسال رمز الإيموجي كرسالة
  await conn.sendMessage(message.chat, { react: { text: '💬', key: message.key }});

  if (!mimeType) {
    try {
      let response = await Bard(inputText);
      await conn.sendMessage(message.chat, {
        text: response.content
      }, { quoted: message });
    } catch (error) {
      throw "An error occured";
    }
  } else {
    let downloadedImage = await quotedMessage.download();
    let isImage = /image\/(png|jpe?g)/.test(mimeType);
    if (isImage) {
      let uploadedImage = await uploadImage(downloadedImage);
      let responseWithImage = await BardImg(inputText, uploadedImage);
      await conn.sendMessage(message.chat, {
        text: responseWithImage.content
      }, { quoted: message });
    } else {
      await conn.sendMessage(message.chat, {
        text: "Only images are supported"
      }, { quoted: message });
    }
  }
};

handler.help = ["bard"];
handler.tags = ["ai"];
handler.command = /^(bard)$/i;
export default handler;

async function Bard(question) {
  return await bardAi.question({
     ask: question
  });
};

async function BardImg(question, image) {
  return await bardAi.questionWithImage({
     ask: question,
     image: image
  });
};
