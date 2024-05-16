
import fetch from 'node-fetch';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fs from "fs";
import yts from 'yt-search';

let limit1 = 100;
let limit2 = 400;
let limit_a1 = 50;
let limit_a2 = 400;

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) throw `*[❗𝐈𝐍𝐅𝐎❗] قم بإدخال اسم الأغنية المطلوبة للبحث عنها.*\n\n*—◉ المثال:*\n*${usedPrefix + command} ثم اكتب اسم ماتريد تحميلة*`;

  const yt_play = await search(args.join(' '));
  let additionalText = '';

  if (command === 'play','1صوت') {
    additionalText = 'صوت 🔊';
  } else if (command === 'play2', '1فيديو') {
    additionalText = 'فيديو 🎥';
  }

  const texto1 = `*◉——⌈🔊 تشغيل يوتيوب 🔊⌋——◉*\n
❏ 📌 *العنوان:* ${yt_play[0].title}
❏ 📆 *تم النشر:* ${yt_play[0].ago}
❏ ⌚ *المدة:* ${secondString(yt_play[0].duration.seconds)}
❏ 👀 *المشاهدات:* ${`${MilesNumber(yt_play[0].views)}`}
❏ 👤 *المؤلف:* ${yt_play[0].author.name}
❏ ⏯️ *القناة:* ${yt_play[0].author.url}
❏ 🆔 *المعرف:* ${yt_play[0].videoId}
❏ 🪬 *النوع:* ${yt_play[0].type}
❏ 🔗 *الرابط:* ${yt_play[0].url}\n
❏ *_جاري إرسال ${additionalText}، يرجى الانتظار..._*`.trim();

  conn.sendMessage(m.chat, { image: { url: yt_play[0].thumbnail }, caption: texto1 }, { quoted: m });

  if (command == 'play') {
    try {
      const audio = global.API('ApiEmpire', `/api/v1/ytmp3?url=${yt_play[0].url}`);
      const ttl = await yt_play[0].title;
      const buff_aud = await getBuffer(audio);
      const fileSizeInBytes = buff_aud.byteLength;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      const size = fileSizeInMB.toFixed(2);

      if (size >= limit_a2) {
        await conn.sendMessage(m.chat, { text: `*[ ✔ ] قم بتنزيل الفيديو من هنا ${audio}*` }, { quoted: m });
        return;
      }

      if (size >= limit_a1 && size <= limit_a2) {
        await conn.sendMessage(m.chat, { document: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
        return;
      } else {
        await conn.sendMessage(m.chat, { audio: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
        return;
      }
    } catch {
      throw '*[❗] حدث خطأ، يرجى المحاولة مرة أخرى.*';
    }
  }

  if (command == 'play2') {
    try {
      const video = global.API('ApiEmpire', `/api/v1/ytmp4?url=${yt_play[0].url}`);
      const ttl2 = await yt_play[0].title;
      const buff_vid = await getBuffer(video);
      const fileSizeInBytes2 = buff_vid.byteLength;
      const fileSizeInKB2 = fileSizeInBytes2 / 1024;
      const fileSizeInMB2 = fileSizeInKB2 / 1024;
      const size2 = fileSizeInMB2.toFixed(2);

      if (size2 >= limit2) {
        await conn.sendMessage(m.chat, { text: `*[ ✔ ] قم بتنزيل الفيديو من هنا ${video}*` }, { quoted: m });
        return;
      }

      if (size2 >= limit1 && size2 <= limit2) {
        await conn.sendMessage(m.chat, { document: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
        return;
      } else {
        await conn.sendMessage(m.chat, { video: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
        return;
      }
    } catch {
      throw '*[❗] حدث خطأ، يرجى المحاولة مرة أخرى.*';
    }
  }
};

handler.help = ['play', 'play2'].map((v) => v + ' <اسم الأغنية>');
handler.tags = ['downloader'];
handler.command = /^(play|play2|صوت1|فيديو1)$/i;

export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'ar', gl: 'EG', ...options });
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
  const dDisplay = d > 0 ? d + (d == 1 ? ' يوم، ' : ' أيام، ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' ساعة، ' : ' ساعات، ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' دقيقة، ' : ' دقائق، ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' ثانية' : ' ثواني') : '';
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

const getBuffer = async (url, options) => {
  options ? options : {};
  const res = await axios({
    method: 'get',
    url,
    headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1 },
    ...options,
    responseType: 'arraybuffer'
  });
  return res.data;
};
