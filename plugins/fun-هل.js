import util from 'util'
import path from 'path'
let user = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
if (!text) throw `*أدخــل الـسـؤال !*`
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let x = `${pickRandom(['احــتـمـال قـلـيـل' ,'نــعم بـالـتـأكـيد','انقلع','اذلف', 'لا أعـتـقـد', 'مــستـحـيــل','كس وجهك ياشيخ','ترى وضعك صعب','هل انت ممحون اولا جاوب😂🙈','لالالا','دعمم بس محد سمع 😹', 'هل تسكت قليلا انت 🙏','اخرص بس ماعندك سالفة🚶'])}`
let l = Math.floor(Math.random() * x.length);
let top = `*هــل ${text}*
    
*الــأجــابـه :* ${x}`.trim()
conn.sendFile (m.reply (top, null, { mentions: [a]}))}
handler.help = handler.command = ['هل']
handler.tags = ['fun']
handler.group = true
handler.limit = 0
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}