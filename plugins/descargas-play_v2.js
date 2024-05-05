import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
  const tradutor = _translate.plugins.downloader_playdoc;

  if (!text) throw `${tradutor.texto1} *\n*${usedPrefix + command} Good Feeling - Flo Rida* `;
  try {
    const yt_play = await search(args.join(' '));
    let additionalText = '';
    let buttonText = '';
    if (command === 'play3' || command == 'playdoc') {
      additionalText = 'audio 🔊';
      buttonText = '🎵 Audio';
    } else if (command === 'play4' || command == 'playdoc2') {
      additionalText = 'video 🎥';
      buttonText = '🎥 Video';
    }
    const texto1 = `${tradutor.texto2[0]}\n
    ${tradutor.texto2[1]} ${yt_play[0].title}
    ${tradutor.texto2[2]} ${yt_play[0].ago}
    ${tradutor.texto2[3]} ${secondString(yt_play[0].duration.seconds)}
    ${tradutor.texto2[4]} ${`${MilesNumber(yt_play[0].views)}`}
    ${tradutor.texto2[5]} ${yt_play[0].author.name}
    ${tradutor.texto2[6]} ${yt_play[0].author.url}
    ${tradutor.texto2[7]} ${yt_play[0].videoId}
    ${tradutor.texto2[8]} ${yt_play[0].type}
    ${tradutor.texto2[9]} ${yt_play[0].url}\n
    ${tradutor.texto2[10]} ${additionalText}, ${tradutor.texto2[11]}`.trim();
    conn.sendMessage(m.chat, { image: { url: yt_play[0].thumbnail }, caption: texto1, buttons: [{ buttonId: `${command === 'play3' || command == 'playdoc' ? '#ytmp3doc' : '#ytmp4doc'} ${yt_play[0].url}`, buttonText: { displayText: buttonText }, type: 1 }] }, { quoted: m });
    if (command == 'play3' || command == 'playdoc') {
      try {
        const q = '128kbps';
        const v = yt_play[0].url;
        const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
        const dl_url = await yt.audio[q].download();
        const ttl = await yt.title;
        const size = await yt.audio[q].fileSizeH;
        await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3` }, { quoted: m });
      } catch {
        try {
          const lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${yt_play[0].url}`);
          const lolh = await lolhuman.json();
          const n = lolh.result.title || 'error';
          await conn.sendMessage(m.chat, { document: { url: lolh.result.link }, fileName: `${n}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
        } catch {
          try {
            const searchh = await yts(yt_play[0].url);
            const __res = searchh.all.map((v) => v).filter((v) => v.type == 'video');
            const infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId);
            const ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' });
            conn.sendMessage(m.chat, { audio: { url: ress.url }, fileName: __res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m });
          } catch {
            await conn.reply(m.chat, tradutor.texto3, m);
          }
        }
      }
    }
    if (command == 'play4' || command == 'playdoc2') {
      try {
        const qu = '360';
        const q = qu + 'p';
        const v = yt_play[0].url;
        const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
        const dl_url = await yt.video[q].download();
        const ttl = await yt.title;
        const size = await yt.video[q].fileSizeH;
        await await conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `${tradutor.texto4[0]} ${ttl}\n${tradutor.texto4[1]} ${size}`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
      } catch {
        try {
          const mediaa = await ytMp4(yt_play[0].url);
          await await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: cap, mimetype: 'video/mp4', fileName: ttl + `.mp4` }, { quoted: m });
        } catch {
          try {
            const lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${yt_play[0].url}`);
            const lolh = await lolhuman.json();
            const n = lolh.result.title || 'error';
            const n2 = lolh.result.link;
            const n3 = lolh.result.size;
            const n4 = lolh.result.thumbnail;
            await conn.sendMessage(m.chat, { document: { url: n2 }, fileName: `${n}.mp4`, mimetype: 'video/mp4', caption: `${tradutor.texto4[0]} ${n}\n${tradutor.texto4[1]} ${n3}`, thumbnail: await fetch(n4) }, { quoted: m });
          } catch {
            await conn.reply(m.chat, `${tradutor.texto5}`, m);
          }
        }
      }
    }
  } catch {
    throw `${tradutor.texto6}}`;
  }
};
handler.help = ['play3', 'play4'].map((v) => v + ' <busqueda>');
handler.tags = ['downloader'];
handler.command = /^(playdoc|playdoc2|play3|play4)$/i;
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es',
