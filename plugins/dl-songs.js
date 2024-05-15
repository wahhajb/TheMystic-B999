
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴 𝙻𝙰 𝙲𝙰𝙽𝙲𝙸𝙾𝙽 𝙵𝙰𝙻𝚃𝙰𝙽𝚃𝙴, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙼𝙰𝚂 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴/𝚃𝙸𝚃𝚄𝙻𝙾 𝙳𝙴 𝚄𝙽𝙰 𝙲𝙰𝙽𝙲𝙸𝙾𝙽*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*${usedPrefix + command} Good Feeling - Flo Rida* `;
  
  try {
    const yt_play = await yts(args.join(' '));
    const videoUrl = yt_play.videos[0].url;
    
    const message = "جاري تحميل طلبك...";
    conn.sendMessage(m.chat, message, { quoted: m });

    if (command === 'play3' || command === 'playdoc') {
      try {
        const yt = await youtubedl(videoUrl).catch(async (_) => await youtubedlv2(videoUrl));
        const dl_url = yt.audio['128kbps'].download;
        const ttl = yt.title;
        await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: 'audio/mp4', fileName: `${ttl}.mp3` }, { quoted: m });
      } catch {
        await conn.reply(m.chat, '*[❗] 𝙴𝚁𝚁𝙾𝚁 𝙽𝙾 𝙵𝚄𝙴 𝙿𝙾𝚂𝙸𝙱𝙻𝙴 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝙴𝙻 𝙰𝚄𝙳𝙸𝙾*', m);
      }
    }

    if (command === 'play4' || command === 'playdoc2') {
      try {
        const yt = await youtubedl(videoUrl).catch(async (_) => await youtubedlv2(videoUrl));
        const dl_url = yt.video['360p'].download;
        const ttl = yt.title;
        await conn.sendMessage(m.chat, { video: { url: dl_url }, mimetype: 'video/mp4', fileName: `${ttl}.mp4`, caption: `▢ 𝚃𝙸𝚃𝚄𝙻𝙾: ${ttl}` }, { quoted: m });
      } catch {
        await conn.reply(m.chat, '*[❗] 𝙴𝚁𝚁𝙾𝚁 𝙽𝙾 𝙵𝚄𝙴 𝙿𝙾𝚂𝙸𝙱𝙻𝙴 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾*', m);
      }
    }
  } catch {
    throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝚁𝚁𝙾𝚁, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾*';
  }
};

handler.help = ['play3', 'play4'].map((v) => v + ' <busqueda>');
handler.tags = ['downloader'];
handler.command = /^(playdoc|playdoc2|play3|play4)$/i;

export default handler;
async function search(query, options = {}) {
  const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function bytesToSize(bytes) {
  return new Promise((resolve, reject) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
  });
}

async function ytMp3(url) {
  return new Promise((resolve, reject) => {
    ytdl.getInfo(url).then(async (getUrl) => {
      const result = [];
      for (let i = 0; i < getUrl.formats.length; i++) {
        const item = getUrl.formats[i];
        if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
          const {contentLength} = item;
          const bytes = await bytesToSize(contentLength);
          result[i] = {audio: item.url, size: bytes};
        }
      }
      const resultFix = result.filter((x) => x.audio != undefined && x.size != undefined);
      const tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
      const tinyUrl = tiny.data;
      const title = getUrl.videoDetails.title;
      const thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
      resolve({title, result: tinyUrl, result2: resultFix, thumb});
    }).catch(reject);
  });
}

async function ytMp4(url) {
  return new Promise(async (resolve, reject) => {
    ytdl.getInfo(url).then(async (getUrl) => {
      const result = [];
      for (let i = 0; i < getUrl.formats.length; i++) {
        const item = getUrl.formats[i];
        if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
          const {qualityLabel, contentLength} = item;
          const bytes = await bytesToSize(contentLength);
          result[i] = {video: item.url, quality: qualityLabel, size: bytes};
        }
      }
      const resultFix = result.filter((x) => x.video != undefined && x.size != undefined && x.quality != undefined);
      const tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
      const tinyUrl = tiny.data;
      const title = getUrl.videoDetails.title;
      const thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
      resolve({title, result: tinyUrl, rersult2: resultFix[0].video, thumb});
    }).catch(reject);
  });
}

async function ytPlay(query) {
  return new Promise((resolve, reject) => {
    yts(query).then(async (getData) => {
      const result = getData.videos.slice( 0, 5 );
      const url = [];
      for (let i = 0; i < result.length; i++) {
        url.push(result[i].url);
      }
      const random = url[0];
      const getAudio = await ytMp3(random);
      resolve(getAudio);
    }).catch(reject);
  });
}

async function ytPlayVid(query) {
  return new Promise((resolve, reject) => {
    yts(query).then(async (getData) => {
      const result = getData.videos.slice( 0, 5 );
      const url = [];
      for (let i = 0; i < result.length; i++) {
        url.push(result[i].url);
      }
      const random = url[0];
      const getVideo = await ytMp4(random);
      resolve(getVideo);
    }).catch(reject);
  });
}
