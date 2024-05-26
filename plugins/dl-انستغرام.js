import fg from 'api-dylux';

async function handler(m, { conn, args, text, usedPrefix, command }) {
  try {
    if (!args[0]) throw `♨ ادخل اسم لشخص في انستغرام\n\n📌مثال:\n .انستغرام gl_al.12`;

    let res = await fg.igStalk(args[0]);
    console.log("البيانات المستلمة من fg.igStalk:", res);  // إضافة سجل للتحقق من البيانات المستلمة

    if (!res) {
      throw `⛔ لم يتم العثور على المستخدم. تحقق من اسم المستخدم المدخل.`;
    }

    if (res.postsH === '0') {
      throw `⛔ المستخدم ليس لديه أي منشور في حسابه على Instagram`;
    }

    // التحقق من أن الحقول المطلوبة موجودة في النتيجة
    const name = res.name || 'غير معروف';
    const username = res.username || 'غير معروف';
    const followersH = res.followersH || 'غير معروف';
    const followingH = res.followingH || 'غير معروف';
    const description = res.description || 'غير معروف';
    const postsH = res.postsH || 'غير معروف';
    const profilePic = res.profilePic || null;

    let te = `
┐────【 *المعلومات* 】 ────┌
⇠ *🔖 الاسم:* ${name} 
⇠ *🔖 المعرف:* ${username.replace(/^@/, '')}
⇠ *👥 المتابعين:* ${followersH}
⇠ *🫂 الذي يتابعهم:* ${followingH}
⇠ *📌 البايو:* ${description}
⇠ *🏝️ المنشورات:* ${postsH}

⇠ *🔗 الرابط* : https://instagram.com/${username.replace(/^@/, '')}
┘─────【 ﮼♪ﺑوﺕ|الصاعـ|ـقة⁞¹² 】─────└`;

    if (profilePic) {
      await conn.sendFile(m.chat, profilePic, 'profile_pic.png', te, m);
    } else {
      await conn.sendMessage(m.chat, te, m);
    }
  } catch (error) {
    console.error("حدث خطأ:", error);
    await conn.sendMessage(m.chat, `حدث خطأ: ${error.message}`, m);
  }
}

handler.help = ['igstalk'];
handler.tags = ['dl'];
handler.command = ['انستغرام', 'انستا2'];

export default handler;
