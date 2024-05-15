import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    throw `*[❗𝐈𝐍𝐅𝐎❗] Falta el nombre de la canción. Por favor ingrese el comando junto con el nombre/título de una canción.\n\n*—◉ Ejemplo:*\n*${usedPrefix + command} Good Feeling - Flo Rida* `;
  }

  try {
    const ytPlay = await searchYouTube(args.join(' '));
    const additionalText = command === 'play3' || command === 'playdoc' ? 'audio 🔊' : 'video 🎥';
    const message = `Enviando ${additionalText}, por favor, espere...`;

    await conn.sendMessage(m.chat, message, { quoted: m });

    if (command === 'play3' || command === 'playdoc') {
      await downloadAndSendAudio(conn, m, ytPlay[0].url);
    } else if (command === 'play4' || command === 'playdoc2') {
      await downloadAndSendVideo(conn, m, ytPlay[0].url);
    }
  } catch (error) {
    console.error(error);
    throw '*[❗𝐈𝐍𝐅𝐎❗] Error, por favor vuelva a intentarlo.*';
  }
};

handler.help = ['play3', 'play4'].map(v => v + ' <búsqueda>');
handler.tags = ['downloader'];
handler.command = /^(playdoc|playdoc2|play3|play4)$/i;
export default handler;

async function searchYouTube(query) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES' });
  return search.videos;
}

async function downloadAndSendAudio(conn, m, url) {
  try {
    const audio = await downloadAudio(url, '128kbps');
    await conn.sendMessage(m.chat, { document: { url: audio.url }, mimetype: 'audio/mpeg', fileName: `${audio.title}.mp3` }, { quoted: m });
  } catch (error) {
    console.error('Error downloading audio:', error);
    await conn.reply(m.chat, '*[❗] Error, no fue posible descargar el audio.*', m);
  }
}

async function downloadAndSendVideo(conn, m, url) {
  try {
    const video = await downloadVideo(url, '360p');
    await conn.sendMessage(m.chat, { document: { url: video.url }, fileName: `${video.title}.mp4`, mimetype: 'video/mp4', caption: `▢ Título: ${video.title}\n▢ Peso del video: ${video.size}`, thumbnail: await fetch(video.thumbnail) }, { quoted: m });
  } catch (error) {
    console.error('Error downloading video:', error);
    await conn.reply(m.chat, '*[❗] Error, no fue posible descargar el video.*', m);
  }
}

async function downloadAudio(url, quality) {
  try {
    const yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    const downloadUrl = await yt.audio[quality].download();
    const title = await yt.title;
    return { url: downloadUrl, title };
  } catch (error) {
    throw new Error('Error downloading audio from youtubedl');
  }
}

async function downloadVideo(url, quality) {
  try {
    const yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    const downloadUrl = await yt.video[quality].download();
    const title = await yt.title;
    const size = await yt.video[quality].fileSizeH;
    const thumbnail = yt.thumbnail;
    return { url: downloadUrl, title, size, thumbnail };
  } catch (error) {
    throw new Error('Error downloading video from youtubedl');
  }
}
