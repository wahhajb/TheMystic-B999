import fetch from "node-fetch";
import uploadImage from "../lib/uploadImage.js";
import analyzeImage from "./imageAnalysis.js";
import findExternalInformation from "./externalInformation.js";
import generateImageDescription from "./imageDescription.js";
import generateImageInterpretation from "./imageInterpretation.js";
import generateCreativeText from "./creativeText.js";

let handler = async (message, { text, conn, usedPrefix, command }) => {
  // التحقق من وجود نص أو نص مقتبس
  if (!text && !(message.quoted && message.quoted.text)) {
    throw "*❆━━━═⏣⊰⊱⏣═━━━❆*\n\n*⤺┇ استخدام خاطئ، يجب الرد على رسالة.*\n\n*❆━━━═⏣⊰⊱⏣═━━━❆*";
  }

  try {
    const inputText = text || message.quoted.text; // الحصول على النص المدخل أو المقتبس
    const encodedText = encodeURIComponent(inputText);
    let attachment = null;
    let mediaURL = "";
    let quotedMessage = message.quoted ? message.quoted : message;

    // التحقق من وجود مرفقات في الرسالة المقتبسة
    if ((quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || "") {
      let mimeType = (quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || "";
      if (mimeType.startsWith("video/")) {
        return await message.reply(
          "*❆━━━═⏣⊰⊱⏣═━━━❆*\n\n*⤺┇ يرجى الرد على صورة، لا فيديو!*\n\n*❆━━━═⏣⊰⊱⏣═━━━❆*"
        );
      }
      attachment = await quotedMessage.download();
      let isImage = /image\/(png|jpe?g|gif)/.test(mimeType);
      mediaURL = await uploadImage(attachment);
    }

    // إنشاء رابط الطلب النهائي
    const endpointURL = mediaURL
      ? `https://api-darkman-3cf8c6ef66b9.herokuapp.com/googlegenai?query=${encodedText}&url=${mediaURL}`
      : `https://api-darkman-3cf8c6ef66b9.herokuapp.com/googlegenai?query=${encodedText}`;

    // تحديث حالة الكتابة
    conn.sendPresenceUpdate("composing", message.chat);

    // طلب البيانات من API
    const response = await fetch(endpointURL);
    const result = await response.json();
    const output = result.result;

    // تحليل الصورة
    const imageAnalysis = await analyzeImage(mediaURL);

    // إنشاء وصف للصورة
    const imageDescription = generateImageDescription(imageAnalysis);

    // البحث عن معلومات خارجية
    const externalInformation = await findExternalInformation(imageDescription);

    // إنشاء تفسير للصورة
    const imageInterpretation = generateImageInterpretation(imageAnalysis, externalInformation);

    // إنشاء نص إبداعي مستوحى من الصورة
    const creativeText = generateCreativeText(imageDescription, imageInterpretation);

    // الرد بالنتيجة
    await message.reply(
      `**وصف الصورة:** ${imageDescription}\n\n**التفسير:** ${imageInterpretation}\n\n**معلومات خارجية:** ${externalInformation}\n\n**نص إبداعي:** ${creativeText}`
    );
  } catch (error) {
    console.error("Error:", error);
    throw "*❆━━━═⏣⊰⊱⏣═━━━❆*\n\n*⤺┇ حدث خطأ أثناء معالجة طلبك.*\n\n*❆━━━═⏣⊰⊱⏣═━━━❆*";
  }
};

handler.help = ["googlegenai"];
handler.tags = ["AI"];
handler.command = ["bard", "googlegenai
