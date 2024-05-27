let handler = async (m, { conn, participants, groupMetadata }) => {
  try {
    console.log('Handler started');
    
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg';
    console.log('Profile picture URL obtained');
    
    const { isBanned, autolevelup, antiver, antitoxic, temporal, restrict, stickers, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, audios, delete: del } = global.db.data.chats[m.chat];
    
    const vs = '1.0.0'; // هنا تعيين الإصدار بشكل ثابت
    console.log('Version set:', vs);
    
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
    ┃ بوت مؤقت  ${temporal ? '✅' : '❌'}
    ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃ الاضافه والازالة ${restrict ? '✅' : '❌'}
    ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃ المستوي التلقائي ${autolevelup ? '✅' : '❌'}
    ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃ مكتشف ${detect ? '✅' : '❌'} 
    ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃ انت توكسيك ${antitoxic ? '✅' : '❌'} 
    ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃ مضاد الرؤيه ${antiver ? '✅' : '❌'}
    ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃ حذف تلقائي ${del ? '✅' : '❌'} 
    ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃ الاباحية ${modohorny ? '✅' : '❌'} 
    ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃ الاستيكر التلقائي ${autosticker ? '✅' : '❌'} 
    ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃ الصوتيات ${audios ? '✅' : '❌'} 
    ╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣
    `.trim();
    
    console.log('Text constructed:', text);
    
    conn.sendHydrated(m.chat, text, wm, pp, md, '𝑺𝒉𝒂𝒅𝒐𝒘', null, null, [
      ['الاوامر ☘️', '/menuall']
    ], m);
    
    console.log('Message sent');
  } catch (error) {
    console.error('Error in handler:', error);
  }
};

handler.help = ['infogrup'];
handler.tags = ['group'];
handler.command = /^(configuración|معلومات|setting|معلومات-الجروب)$/i;
handler.group = true;

export default handler;
