/*

- شكر خاص لمجتمع "WSApp • Developers"
 * https://chat.whatsapp.com/FaQunmlp9BmDRk6lEEc9FJ
- شكر خاص لـ كارلوس (PT) على رموز interactiveMessage (الأزرار)
- شكر خاص لـ Darlyn1234 على الهيكل المستخدم في هذا الكود و quoted
 * https://github.com/darlyn1234
- تكييف الصورة في نوع القائمة، والشفرة، والوظيفة بواسطة BrunoSobrino
 * https://github.com/BrunoSobrino

*/
import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys'
import yts from 'yt-search';
import fs from 'fs';

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const traductor = _translate.plugins.buscador_yts;
    const device = await getDevice(m.key.id);
    
    if (!text) throw `⚠️ *${traductor.texto1}*`;
    
    if (device !== 'desktop' || device !== 'web') {      
    
        const results = await yts(text);
        const videos = results.videos.slice(0, 20);
        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];

        var messa = await prepareWAMessageMedia({ image: {url: randomVideo.thumbnail}}, { upload: conn.waUploadToServer })
        const interactiveMessage = {
            body: { text: `*—◉ ${traductor.texto3}:* ${results.videos.length}\n*—◉ ${traductor.texto4}*\n*-› ${traductor.texto5}:* ${randomVideo.title}\n*-› ${traductor.texto6}:* ${randomVideo.author.name}\n*-› ${traductor.texto7}:* ${randomVideo.views}\n*-› ${traductor.texto2[0]}:* ${randomVideo.url}\n*-› ${traductor.texto8}:* ${randomVideo.thumbnail}`.trim() },
            footer: { text: `${global.wm}`.trim() },  
            header: {
                title: `*< ${traductor.texto9} />*\n`,
                hasMediaAttachment: true,
                imageMessage: messa.imageMessage,
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: traductor.texto10,
                            sections: videos.map((video) => ({
                                title: video.title,
                                rows: [
                                    {
                                        header: video.title,
                                        title: video.author.name,
                                        description: traductor.texto11,
                                        id: `${prefijo}play.1 ${video.url}`
                                    },
                                    {
                                        header: video.title,
                                        title: video.author.name,
                                        description: traductor.texto12,
                                        id: `${prefijo}play.2 ${video.url}`
                                    }
                                ]
                            }))
                        })
                    }
                ],
                messageParamsJson: ''
            }
        };        
            
        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: m })
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id});

    } else {
        const datas = global;
        const idioma = datas.db.data.users[m.sender].language;
        const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
        const traductor = _translate.plugins.buscador_yts;      
        const results = await yts(text);
        const tes = results.all;
        const teks = results.all.map((v) => {
            switch (v.type) {
                case 'video': return `
° *_${v.title}_*
↳ 🫐 *_${traductor.texto2[0]}_* ${v.url}
↳ 🕒 *_${traductor.texto2[1]}_* ${v.timestamp}
↳ 📥 *_${traductor.texto2[2]}_* ${v.ago}
↳ 👁 *_${traductor.texto2[3]}_* ${v.views}`;
            }
        }).filter((v) => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');
        conn.sendFile(m.chat, tes[0].thumbnail, 'error.jpg', teks.trim(), m);      
    }    
};
handler.help = ['ytsearch <نص>'];
handler.tags = ['search'];
handler.command = /^(ytsearch|yts|searchyt|buscaryt|videosearch|audiosearch)$/i;
export default handler;
