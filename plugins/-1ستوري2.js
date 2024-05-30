import fetch from 'node-fetch';

let handler = async (m, { conn, command }) => {
  // التأكد من أن الدردشة تسمح بالمحتوى المناسب
  if (!db.data.chats[m.chat].modohorny && m.isGroup) throw `المحتوى غير مسموح به في هذه الدردشة.`;

  // اختيار عشوائي من قائمة مقاطع الفيديو
  let url = global.pies[Math.floor(Math.random() * global.pies.length)];

  // التحقق من أن URL صالح
  if (!url.startsWith('https://telegra.ph/file/')) {
    throw 'URL غير صالح!';
  }

  // إرسال الفيديو إلى الدردشة
  await conn.sendFile(m.chat, url, 'video.mp4', '', m);
  
  // إرسال زر للمستخدم لاختيار فيديو آخر
  await conn.sendButton(m.chat, `🌟 تمتع بمشاهدة هذا الفيديو! 🌟`, '', url, [['فيديو آخر | Next 🆕', `/${command}`]], m);
};

handler.help = ['حالات'];
handler.tags = ['internet'];
handler.command = /^(حالة|حالات)$/;
handler.exp = 50;
handler.level = 0;

export default handler;

// قائمة مقاطع الفيديو
global.pies = [
  "https://telegra.ph/file/148a362890f69bff3996f.mp4",
  "https://telegra.ph/file/7f1757a451f3befa5fd17.mp4",
  "https://telegra.ph/file/087d417612f883fbda4c2.mp4",
  "https://telegra.ph/file/53b5313068a7047b3813a.mp4",
  "https://telegra.ph/file/e9a23c9d49dbd89ec9a7a.mp4",
  "https://telegra.ph/file/bb012338cc0e73460cb3e.mp4",
  "https://telegra.ph/file/c653f121728413b78f6fe.mp4",
  "https://telegra.ph/file/53b5313068a7047b3813a.mp4",
  "https://telegra.ph/file/a504dad9f652eb813b246.mp4",
  "https://telegra.ph/file/0cd256adf29c91aa10907.mp4",
  "https://telegra.ph/file/d6c4459a35d351996f057.mp4",
  "https://telegra.ph/file/ddd6dd2e5e67f55db079a.mp4"
];
