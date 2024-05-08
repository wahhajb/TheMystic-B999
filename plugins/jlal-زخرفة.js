let handler = async(m, { conn, text , command }) => {
if (command == 'focus') {
if (!text) throw '*مثال* :\n*.focus* ♥♥';
let awikwok = `👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿
👉🏿👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👈🏿
👉🏿👉🏾👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👈🏾👈🏿
👉🏿👉🏾👉🏽👇🏼👇🏼👇🏼👇🏼👇🏼👈🏽👈🏾👈🏿
👉🏿👉🏾👉🏽👉🏼👇🏻👇🏻👇🏻👈🏼👈🏽👈🏾👈🏿
👉🏿👉🏾👉🏽👉🏼👉🏻${text}👈🏻👈🏼👈🏽👈🏾👈🏿
👉🏿👉🏾👉🏽👉🏼👆🏻👆🏻👆🏻👈🏼👈🏽👈🏾👈🏿
👉🏿👉🏾👉🏽👆🏼👆🏼👆🏼👆🏼👆🏼👈🏽👈🏾👈🏿
👉🏿👉🏾👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👈🏽👈🏾👈🏿
👉🏿👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👈🏿
👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿`
m.reply(awikwok, null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})
}
}
handler.command = handler.help = ['focus']
handler.tags = ['زخرفه']
export default handler



┃𝒔𝒕𝒐𝒏𝒆
