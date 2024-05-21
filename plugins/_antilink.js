// TheMystic-Bot-MD@BrunoSobrino - _antilink.js

const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;

export async function before(m, {conn, isAdmin, isBotAdmin}) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    const isGroupLink = linkRegex.exec(m.text);

    // إضافة الشرط الإداري
    if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply("*﮼♪ﺑوﺕ|الصاعـ|ـقة⁞¹² تم اكتشاف ارسال رابط في الجروب*\n\n هناك مخالفه من احد الاعضاء جاري الكشف عن هويته...! \nانا اسف, *@${m.sender.split('@')[0]}*  سيتم طردك من الجروب بسبب مخالفتك للقوانين الخاصه بالجروب وارسال روابط البوت\n ΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩΩθ ${isBotAdmin ? '' : '\n اوههةة نسيت انا مو مشرف هون\n ياليت كنت مشرف هون كنت بنتناكح هون وشوتك برا الجروب☻⃤'}", null, {mentions: [m.sender]});

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            if (m.text.includes(linkThisGroup)) return !0;
        }

        // إضافة رسالة التحذير
        await conn.reply(m.chat, `تم اكتشاف ارسال رابط في الجروب...`, null, {mentions: [m.sender]});

        // إضافة الإجراءات الإدارية
        if (isBotAdmin && chat.antiLink) {
            await conn.sendMessage(m.chat, {delete: m.key});
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        } else if (!chat.antiLink) {
            return;
        }
    }
    return !0;
}
