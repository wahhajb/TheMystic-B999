let loading = async (conn, m, response) => {
    var hawemod = [
        "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
        "《 ████▒▒▒▒▒▒▒▒》30%",
        "《 ███████▒▒▒▒▒》50%",
        "《 ██████████▒▒》80%",
        "《 ████████████》100%"
    ]
    let { key } = await conn.sendMessage(m.chat, { text: "جاري الزواج...", mentions: conn.parseMention(response) }, { quoted: m })
    for (let i = 0; i < hawemod.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.sendMessage(m.chat, { text: hawemod[i], edit: key, mentions: conn.parseMention(response) }, { quoted: m });
    }
    await conn.sendMessage(m.chat, { text: response, edit: key, mentions: conn.parseMention(response) }, { quoted: m });
}

let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    await loading(conn, m, `*【 اجــتماع الـجــروب 】*\n\n❑ جروب : *${groupMetadata.subject}*\n❑ عدد الاعضاء : *${participants.length}*${text ? `\n❑ الرساله : ${text}\n` :   }\n\n*〄━━┋ الـمنــشنـات ┋━━〄*\n\n` + users.map(v =>  *↫❍┋* @  + v.replace(/@.+/,   )).join`\n` +  \n\n*【 احصائيات شعبوط للاعضاء3> 】* )
}

handler.help = [ tagall ]
handler.tags = [ group ]
handler.command = [ منشن ]
handler.admin = true
handler.group = true

export default handler
