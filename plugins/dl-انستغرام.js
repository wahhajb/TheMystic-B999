import fg from 'api-dylux';

async function handler(m, { conn, args, text, usedPrefix, command }) {
  try {
    if (!args[0]) throw `♨ ادخل اسم لشخص في انستغرام\n\n📌مثال:\n .انستغرام gl_al.12`;

    let res = await fg.igStalk(args[0]);

    if (res.postsH === '0') {
      throw `⛔ المستخدم ليس لديه أي منشور في حسابه على Instagram`;
    }

    // التحقق من أن res.username معرف قبل محاولة استبدال أي جزء منه
    let username = res.username ? res.username.replace(/^@/, '') : 'unknown';

    let te = `
┐────【 *المعلومات* 】 ────┌
⇠ *🔖 الاسم:* ${res.name} 
⇠ *🔖 المعرف:* ${username}
⇠ *👥 المتابعين:* ${res.followersH}
⇠ *🫂 الذي يتابعهم:* ${res.followingH}
⇠ *📌 البايو:* ${res.description}
⇠ *🏝️ المنشورات:* ${res.postsH}

⇠ *🔗 الرابط* : https://instagram.com/${username}
┘─────【 ﮼♪ﺑوﺕ|الصاعـ|ـقة⁞¹² 】─────└`;

    await conn.sendFile(m.chat, res.profilePic, 'tt.png', te, m);
  } catch (error) {
    throw error;
  }
}

handler.help = ['igstalk'];
handler.tags = ['dl'];
handler.command = ['انستغرام', 'انستا2'];

export default handler;
