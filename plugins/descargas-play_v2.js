const fetch = require('node-fetch');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const axios = require('axios');
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } = require('@whiskeysockets/baileys');

let data;
let buff;
let mimeType;
let fileName;
let apiUrl;
let enviando = false;
let device;

const handler = async (m, { command, usedPrefix, conn, text }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
  const tradutor = _translate.plugins.descargas_play_v2;
  device = await getDevice(m.key.id);

  if (!text) throw `${tradutor.texto1[0]} _${usedPrefix + command} ${tradutor.texto1[1]} _${usedPrefix + command} https://youtu.be/JLWRZ8eWyZo?si=EmeS9fJvS_OkDk7p_`;
  if (command === 'playyt' && device == 'desktop' || command === 'playyt' && device == 'web') throw `*[❗] Los mensajes de botones aun no estan disponibles en WhatsApp web, acceda a su celular para poder ver y usar los mensajes con botones.*`;
  if (enviando) return;
  enviando = true;

  try {
    const apisUrls = [
      `https://api.cafirexos.com/api/ytplay?text=${text}`,
      `https://api-brunosobrino.onrender.com/api/ytplay?text=${text}`,
      `https://api-for-canvas-brunosobrino.koyeb.app/api/ytplay?text=${text}`
    ];

    await Promise.all(
      apisUrls.map(async (url) => {
        try {
          const res = await fetch(url);
          const _data = await res.json();
          if (_data.resultado && _data.resultado.url) {
            data = _data;
            break;
          }
        } catch {}
      })
    );

    if (!data.resultado || !data.resultado.url) {
      enviando = false;
      throw `${tradutor.texto2}`;
    }

    if (command === 'playyt') {
      const dataMessage = `${tradutor.texto4[0]} ${data.resultado.title}\n${tradutor.texto4[1]} ${data.resultado.publicDate}\n${tradutor.texto4[2]} ${data.resultado.channel}\n${tradutor.texto4[3]} ${data.resultado.url}`.trim();
      const messa = await prepareWAMessageMedia({ image: { url: data.resultado.image } }, { upload: conn.waUploadToServer });
      let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: dataMessage },
              footer: { text: `${global.wm}`.trim() },
              header: {
                hasMediaAttachment: true,
                imageMessage: messa.imageMessage,
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                      display_text: 'AUDIO',
                      id: `${usedPrefix}play.1 ${data.resultado.url} SN@`
                    })
                  },
                  {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                      display_text: 'VIDEO',
                      id: `${usedPrefix}play.2 ${data.resultado.url} SN@`
                    })
                  },
                ],
                messageParamsJson: "",
              },
            },
          },
        },
      }, { userJid: conn.user.jid, quoted: m });
      conn.relayMessage(m.
