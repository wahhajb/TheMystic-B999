 import ytdl from 'ytdl-core';
import yts from 'yt-search';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';

const streamPipeline = promisify(pipeline);

var loading = async (conn, m, response) => {
    var hawemod = [
        "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
        "《 ████▒▒▒▒▒▒▒▒》30%",
        "《 ███████▒▒▒▒▒》50%",
        "《 ██████████▒▒》80%",
        "《 ████████████》100%"
    ];
    let { key } = await conn.sendMessage(m.chat, { text: "جاري الزواج...", mentions: conn.parseMention(response) }, { quoted: m });
    for (let i = 0; i < hawemod.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.sendMessage(m.chat, { text: hawemod[i], edit: key, mentions: conn.parseMention(response) }, { quoted: m });
    }
    await conn.sendMessage(m.chat, { text: response, edit: key, mentions: conn.parseMention(response) }, { quoted: m });
};

var handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `*${usedPrefix}${command} اية الكرسي*`;

    await loading(conn, m, "Downloading audio please wait");

    let search = await yts(text);
    let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
    if (!search) throw "Video Not Found, Try Another Title";
    let { title, thumbnail, timestamp, views, ago, url } = vid;
    let captvid = `*❖───┊ ♪ يــوتـــيــوب ♪ ┊───❖*
    ❏ الـعـنوان: ${title}
    
    ❐ الـمده: ${timestamp}
    
    ❑ الــمـشهـدات: ${views}
    
    ❒ مـنذ: ${ago}
    
    ❒ الـرابــط: ${url}`;

    conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid, footer: author }, { quoted: m });

    const audioStream = ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio',
    });

    const tmpDir = os.tmpdir();
    const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
    await streamPipeline(audioStream, writableStream);

    let doc = {
        audio: {
            url: `${tmpDir}/${title}.mp3`
        },
        mimetype: 'audio/mp4',
        fileName: `${title}`,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                mediaType: 2,
                mediaUrl: url,
                title: title,
                body: "Downloading audio please wait",
                sourceUrl: url,
                thumbnail: await (await conn.getFile(thumbnail)).data
            }
        }
    };

    await conn.sendMessage(m.chat, doc, { quoted: m });

    fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
        if (err) {
            console.error(`Failed to delete audio file: ${err}`);
        } else {
            console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
        }
    });
};

handler.help = ['play <query>'];
handler.tags = ['downloader'];
handler.command = /^شغل$/i;

handler.exp = 0;
handler.diamond = false;

export default handler;
