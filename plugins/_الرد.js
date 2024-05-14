let handler  = async (m, { conn }) => {
conn.reply(m.chat,`
*『 ${pickRandom(global.Truth)} 』*`, m)
}
handler.help = ['bzmzjdks']
handler.tags = ['fun']
handler.command = /(بوت)$/i
export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

 global.Truth = [ 
'مرحبا اسمي شعبوط☻ꪝ كيف بمكنني مساعدك  اليوم',
'مرحبا كيف يمكنني مساعدتك اليوم',

 ] 
