import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';
import yts from 'yt-search';
import fs from 'fs';

// دالة التحميل
async function loading(conn, m) {
    var hawemod = [
        "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
        "《 ████▒▒▒▒▒▒▒▒》30%",
        "《 ███████▒▒▒▒▒》50%",
        "《 ██████████▒▒》80%",
        "《 ████████████》100%"
    ];
    for (let i = 0; i < hawemod.length; i++) {
        await conn.sendMessage(m.chat, hawemod[i], MessageType.text);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

// المعالج الرئيسي
const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`));
    const traductor = _translate.plugins.buscador_yts;
    const device = await getDevice(m.key.id);
    
    if (!text) throw `⚠️ *${traductor.texto1}*`;
    
    // التحقق من نوع الجهاز
    if (device !== 'desktop' || device !== 'web') {      
        await loading(conn, m); // استدعاء دالة التحميل
        
        const results = await yts(text); // البحث عن الفيديوهات على يوتيوب
        const videos = results.videos.slice(0, 20);
        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];

        // إعداد رسالة التفاعل
        var messa = await prepareWAMessageMedia({ image: {url: randomVideo.thumbnail}}, { upload: conn.waUploadToServer })
        const interactiveMessage = {
            body: { text: `*${traductor.texto3[0]}:* ${results.videos.length}\n*—◉ ${traductor.texto3[1]}:*\n*-› ${traductor.texto3[2]}:* ${randomVideo.title}\n*-› ${traductor.texto3[3]}:* ${randomVideo.author.name}\n*-› ${traductor.texto3[4]}:* ${randomVideo.views}\n*-› ${traductor.texto3[5]}:* ${randomVideo.url}\n*-› ${traductor.texto3[6]}:* ${randomVideo.thumbnail}`.trim() },
            footer: { text: `${global.wm}`.trim() },  
            header: {
                title: `*< ${traductor.texto3[7]} />*\n`,
                hasMediaAttachment: true,
                imageMessage: messa.imageMessage,
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: `${traductor.texto3[8]}`,
                            sections: videos.map((video) => ({
                                title: video.title,
                                rows: [
                                    {
                                        header: video.title,
                                        title: video.author.name,
                                        description: `${traductor.texto3[9]}`,
                                        id: `${prefijo}audio ${video.url}`
                                    },
                                    {
                                        header: video.title,
                                        title: video.author.name,
                                        description: `${traductor.texto3[10]}`,
                                        id: `${prefijo}video ${video.url}`
                                    }
                                ]
                            }))
                        })
                    }
                ],
                messageParamsJson: {}
            }
        };        

        // إرسال رسالة التفاعل
        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: m })
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id});
    } else {
        // المعالج في حالة سطح المكتب أو الويب
    }    
};
handler.help = ['ytsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(بحث|yts|searchyt|buscaryt|videosearch|audiosearch)$/i;
export default handler;
