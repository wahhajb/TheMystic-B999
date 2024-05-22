// TheMystic-Bot-MD@BrunoSobrino - _antilink.js

  
const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

export async function before(m, {conn, isAdmin, isBotAdmin}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  
  if (!m.isGroup) return !1;

  const chat = global.db.data.chats[m.chat];
  const delet = m.key.participant;
  const bang = m.key.id;
  const bot = global.db.data.settings[this.user.jid] || {};
  const user = `@${m.sender.split`@`[0]}`;
  const isGroupLink = linkRegex.exec(m.text);
  const grupo = `https://chat.whatsapp.com`;
  
  if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply("*𝐇𝐄𝐘!! 𝐄𝐋 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 𝐄𝐒𝐓𝐀 𝐀𝐂𝐓𝐈𝐕𝐎, 𝐏𝐄𝐑𝐎 𝐄𝐑𝐄𝐒 𝐔𝐍 𝐀𝐃𝐌𝐈𝐍 😎, 𝐒𝐀𝐋𝐕𝐀𝐃𝐎/𝐀!*");
  
  if (chat.antiLink && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      if (m.text.includes(linkThisGroup)) return !0;
    }
    await this.sendMessage(m.chat, {
      text: "*「 𝐀𝐍𝐓𝐈 𝐋𝐈𝐍𝐊𝐒 」*\n*𝐇𝐀𝐒𝐓𝐀 𝐋𝐀 𝐕𝐈𝐒𝐓𝐀 𝐁𝐀𝐁𝐘 👋 " + user + " 𝐑𝐎𝐌𝐏𝐈𝐒𝐓𝐄𝐒 𝐋𝐀𝐒 𝐑𝐄𝐆𝐋𝐀𝐒 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎, 𝐒𝐄𝐑𝐀𝐒 𝐄𝐗𝐓𝐄𝐑𝐌𝐈𝐍𝐀𝐃𝐎...!!*",
      mentions: [m.sender]
    }, {quoted: m});
    
    if (!isBotAdmin) return m.reply("*[❗𝐈𝐍𝐅𝐎❗] 𝐄𝐋 𝐁𝐎𝐓 𝐍𝐎 𝐄𝐒 𝐀𝐃𝐌𝐈𝐍, 𝐍𝐎 𝐏𝐔𝐄𝐃𝐄 𝐄𝐗𝐓𝐄𝐑𝐌𝐈𝐍𝐀𝐑 𝐀 𝐋𝐀𝐒 𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐒*");
    
    if (isBotAdmin && bot.restrict) {
      await conn.sendMessage(m.chat, {
        delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }
      });
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === 404) return;
    } else if (!bot.restrict) return m.reply("*[❗𝐈𝐍𝐅𝐎❗] 𝐄𝐋 𝐏𝐑𝐎𝐏𝐈𝐄𝐓𝐀𝐑𝐈𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓 𝐍𝐎 𝐓𝐈𝐄𝐍𝐄 𝐇𝐀𝐁𝐈𝐋𝐈𝐓𝐀𝐃𝐎 𝐋𝐀𝐒 𝐑𝐄𝐒𝐓𝐑𝐈𝐂𝐂𝐈𝐎𝐍𝐄𝐒 (#𝐞𝐧𝐚𝐛𝐥𝐞 𝐫𝐞𝐬𝐭𝐫𝐢𝐜𝐭) 𝐂𝐎𝐍 𝐄𝐋 𝐏𝐀𝐑𝐀 𝐐𝐔𝐄 𝐋𝐎 𝐇𝐀𝐁𝐈𝐋𝐈𝐓𝐄*");
  }
  return !0;
}
