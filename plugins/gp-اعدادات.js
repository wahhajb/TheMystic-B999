let handler = async (m, { conn, participants, groupMetadata }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
const { antiToxic, antiTraba, antiviewonce, isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, temporal, reaction, antiTelegram, antiFacebook, antiTiktok, antiYoutube, modohorny, antiTwitter, antiInstagram, stickers, autolevelup, autosticker, antitoxic, antifake, modoadmin, audios, delete: del } = global.db.data.chats[m.chat]
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let text = `*「 معلومات الجروب 」*\n
*معرف الجروب :* 
${groupMetadata.id}

*الاسم :* 
${groupMetadata.subject}

*الوصف :* 
${groupMetadata.desc?.toString() || 'لايوجد وصف 🐦‍⬛'}

*عدد الاعضاء :*
${participants.length} عضو

*المالك :* 
@${owner.split('@')[0]}

*الادمن - المشرفين :*
${listAdmin}

*الخيارات :*
❈↲ الترحيب : ${welcome ? '✅' : '❌'}
❈↲ انت لينك : ${antiLink ? '✅' : '❌'} 
❈↲ انت لينك *2 :* ${antiLink2 ? '✅' : '❌'} 
❈↲ انت فايرس : ${antiTraba ? '✅' : '❌'} 
❈↲ بوت استيكر : ${autosticker ? '✅' : '❌'} 
❈↲ مُكتَشَف : ${detect ? '✅' : '❌'} 
❈↲ لفل تلقائي: ${global.db.data.users[m.sender].autolevelup ? '✅' : '❌'}
❈↲ الطرد والاضافه: ${global.db.data.settings[conn.user.jid].restrict ? '✅' : '❌'}
❈↲ الاستيكرات : ${stickers ? '✅' : '❌'}
❈↲ الرياكشن : ${reaction ? '✅' : '❌'}
❈↲ الصوت : ${audios ? '✅' : '❌'} 
❈↲ انت توكسيك : ${antitoxic ? '✅' : '❌'} 
❈↲ انت فيك : ${antifake ? '✅' : '❌'} 
❈↲ مضاد المشاهده : ${antiviewonce ? '✅' : '❌'}
❈↲ مضاد الحذف : ${global.db.data.chats[m.chat].delete ? '✅' : '❌'}
❈↲ انت تيكتوك : ${antiTiktok ? '✅' : '❌'}
❈↲ انت يوتيوب : ${antiYoutube ? '✅' : '❌'}
❈↲ انت تليجرام : ${antiTelegram ? '✅' : '❌'}
❈↲ انت فيسبوك : ${antiFacebook ? '✅' : '❌'}
❈↲ انت انستغرام : ${antiInstagram ? '✅' : '❌'}
❈↲ انت تويتر : ${antiTwitter ? '✅' : '❌'}
❈↲ الادارة : ${modoadmin ? '✅' : '❌'} 
`.trim()
conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(اعدادات|gro?upinfo|info(gro?up|gc))$/i
handler.group = true
export default handler