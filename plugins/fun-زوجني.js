

import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]

let couples = {}

function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
  if (command === 'زوجني') {
    let ps = groupMetadata.participants.map(v => v.id)
    let a = pickRandom(ps)
    let k = Math.floor(Math.random() * 70)
    let top = `*${user(a)} هذه هي زوجتك* 💍`.trim()
    couples[m.sender] = a
    conn.sendFile(m.reply(top, null, { mentions: [a]}))
  } else if (command === 'طلقني') {
    if (couples[m.sender]) {
      let ex = couples[m.sender]
      let top = `*${user(m.sender)} تم طلاقك من ${user(ex)}* 💔`.trim()
      delete couples[m.sender]
      conn.sendFile(m.reply(top, null, { mentions: [ex]}))
    } else {
      conn.reply(m.chat, 'أنت لست متزوجًا حتى تستطيع الطلاق.', m)
    }
  }
}

handler.help = handler.command = ['زوجني', 'طلقني']
handler.tags = ['المجال']
handler.group = true
handler.limit = 0

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
