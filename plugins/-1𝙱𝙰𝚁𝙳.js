import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

let handler = async (message, { text, conn, usedPrefix, command }) => {
  // التحقق من وجود نص أو نص مقتبس
  if (!text && !(message.quoted && message.quoted.text)) {
    throw "*❆━━━═⏣⊰🦇⊱⏣═━━━❆*\n\n*🦇⤺┇ استخدام خاطئ، يجب الرد على رسالة.*\n\n*❆━━━═⏣⊰🦇⊱⏣═━━━❆*";
  }

  try {
    const inputText = text || message.quoted.text; // الحصول على النص المدخل أو المقتبس
    const encodedText = encodeURIComponent(inputText);
    let attachment = null;
    let mediaURL = '';
    let quotedMessage = message.quoted ? message.quoted : message;

    // التفاعل مع الرسالة
    await message.react('💬');

    // التحقق من وجود مرفقات في الرسالة المقتبسة
    if ((quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || '') {
      let mimeType = (quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || '';
      if (mimeType.startsWith('video/')) {
        return await message.reply("*❆━━━═⏣⊰🦇⊱⏣═━━━❆*\n\n*🦇⤺┇ يرجى الرد على صورة، لا فيديو!*\n\n*❆━━━═⏣⊰🦇⊱⏣═━━━❆*");
      }
      attachment = await quotedMessage.download();
      let isImage = /image\/(png|jpe?g|gif)/.test(mimeType);
      mediaURL = await uploadImage(attachment);
    }

    // إنشاء رابط الطلب النهائي
    const endpointURL = mediaURL ? `https://api-darkman-3cf8c6ef66b9.herokuapp.com/googlegenai?query=${encodedText}&url=${mediaURL}` : `https://api-darkman-3cf8c6ef66b9.herokuapp.com/googlegenai?query=${encodedText}`;

    // تحديث حالة الكتابة
    conn.sendPresenceUpdate("composing", message.chat);

    // طلب البيانات من API
    const response = await fetch(endpointURL);
    const result = await response.json();
    const output = result.result;

    // الرد بالنتيجة
    await message.reply(output);
  } catch (error) {
    console.error("Error:", error);
    throw "*❆━━━═⏣⊰🦇⊱⏣═━━━❆*\n\n*🦇⤺┇ حدث خطأ أثناء معالجة طلبك.*\n\n*❆━━━═⏣⊰🦇⊱⏣═━━━❆*";
  }
};

handler.help = ["googlegenai"];
handler.tags = ['AI'];
handler.command = ["bard", "googlegenai", "gemini", 'جيميناي', "دحيح"];
export default handler;
