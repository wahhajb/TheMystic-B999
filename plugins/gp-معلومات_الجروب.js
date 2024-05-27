let handler = async (m, { conn, participants, groupMetadata }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg'
  const { isBanned, autolevelup, antiver, antitoxic, temporal, restrict, stickers, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, audios, delete: del } = global.db.data.chats[m.chat]
  
  const vs = '1.0.0'; // هنا تعريف المتغير vs بالقيمة المطلوبة، مثلاً النسخة 1.0.0

  let text = 
  `╭━[ اعدادات الجروب ]━⬣
  ┃
  ┃ الترحيب ${welcome ? '✅' : '❌'}
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ انت لينك ${antiLink ? '✅' : '❌'} 
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ انت لينك *2* ${antiLink2 ? '✅' : '❌'} 
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ الاستيكر ${stickers ? '✅' : '❌'}
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ بوت مؤقت  ${global.db.data.settings[conn.user.jid].temporal ? '✅' : '❌'}
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ الاضافه والازالة ${global.db.data.settings[conn.user.jid].restrict ? '✅' : '❌'}
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ المستوي التلقائي ${global.db.data.users[m.sender].autolevelup ? '✅' : '❌'}
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ مكتشف ${detect ? '✅' : '❌'} 
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ انت توكسيك ${antitoxic ? '✅' : '❌'} 
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ مضاد الرؤيه ${antiver ? '✅' : '❌'}
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ حذف تلقائي ${global.db.data.chats[m.chat].delete ? '✅' : '❌'} 
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ الاباحية ${modohorny ? '✅' : '❌'} 
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ الاستيكر التلقائي ${autosticker ? '✅' : '❌'} 
  ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ┃ الصوتيات ${audios ? '✅' : '❌'} 
  ╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣
  `.trim()

  conn.sendHydrated(m.chat, text, wm, pp, md, '𝑺𝒉𝒂𝒅𝒐𝒘', null, null, [
    ['الاوامر ☘️', '/menuall']
  ], m)
}

handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(configuración|معلومات|setting|معلومات-الجروب)$/i
handler.group = true

export default handler
