import uploadImage from  ../lib/uploadImage.js ;
import BardAI from  ../lib/bard.js ;

const bardAi = new BardAI();

let handler = async (message, { conn, args, usedPrefix, command }) => {
  let inputText;
  if (args.length >= 1) {
    inputText = args.slice(0).join(" ");
  } else {
    if (message.quoted && message.quoted.text) {
      inputText = message.quoted.text;
    } else {
      return message.reply("يمكنك الآن التحدث مع موديل غوغل الجديد bard\n\nمثال \n .bard حوار حول المغرب");
    }
  }

  let quotedMessage = message.quoted ? message.quoted : message;
  let mimeType = (quotedMessage.msg || quotedMessage).mimetype ||   ;
  await message.react( 💬 );
  
  if (!mimeType) {
    try {
      let response = await Bard(inputText);
      await message.reply(response.content);
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred");
    }
  } else {
    let downloadedImage = await quotedMessage.download();
    let isImage = /image\/(png|jpe?g)/.test(mimeType);
    if (isImage) {
      let uploadedImage = await uploadImage(downloadedImage);
      let responseWithImage = await BardImg(inputText, uploadedImage);
      await message.reply(responseWithImage.content);
    } else {
      await message.reply("Only images are supported");
    }
  }
};

handler.help = ["bard"];
handler.tags = [ ai ];
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
