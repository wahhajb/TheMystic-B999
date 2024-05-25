// استيراد المكتبات الضرورية
import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import fs from "fs";

// الوظيفة الرئيسية لمعالجة الأوامر
const handler = async (m, { conn, usedPrefix }) => {
  const datas = global; // استخدام البيانات العامة
  const idioma = datas.db.data.users[m.sender].language; // الحصول على لغة المستخدم
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`)); // قراءة ملف الترجمة بناءً على اللغة
  const tradutor = _translate.plugins.info_groupsofc; // الحصول على نص الترجمة المناسب

  // تحديد نوع الوثيقة بشكل عشوائي
  const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const document = doc[Math.floor(Math.random() * doc.length)];

  // تكوين نص الرسالة باستخدام الترجمة
  const text = `${tradutor.texto1[0]}

${tradutor.texto1[1]}
${tradutor.texto1[2]}

${tradutor.texto1[3]}

${tradutor.texto1[4]}

${tradutor.texto1[5]}

${tradutor.texto1[6]}`.trim();

  // إعداد الرسالة التي سيتم إرسالها
  const buttonMessage = {
    'document': { url: `instagram.com/gl_al.12` },
    'mimetype': `application/${document}`,
    'fileName': `${tradutor.texto2}`,
    'fileLength': 99999999999999,
    'pageCount': 200,
    'contextInfo': {
      'forwardingScore': 200,
      'isForwarded': true,
      'externalAdReply': {
        'mediaUrl': 'instagram.com/gl_al.12',
        'mediaType': 2,
        'previewType': 'pdf',
        'title': `${tradutor.texto3}`,
        'body': wm,
        'thumbnail': imagen1,
        'sourceUrl': 'https://www.youtube.com/channel/UCSTDMKjbm-EmEovkygX-lCA'
      }
    },
    'caption': text,
    'footer': wm,
    'headerType': 6
  };

  // إرسال الرسالة إلى الدردشة
  conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

// تحديد الأوامر التي تستدعي هذه الوظيفة
handler.command = ['معلومات_المجموعة'];

// تصدير الوظيفة لتكون متاحة للاستخدام
export default handler;