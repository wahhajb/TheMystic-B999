const handler = async (m, { conn, command, text }) => {
  // استخراج اسم الشخص أو منشن الرقم من النص المدخل
  const targetName = text.trim();

  if (!targetName) {
    await conn.sendMessage(m.chat, { text: 'الرجاء كتابة اسم الشخص أو منشن رقمه.' }, { quoted: m });
    return;
  }

  const response = 
    `✦•━━━━ ∘⊰🔥⊱∘ ━━━━•✦\n` +
    `${targetName}😂♥️ وينك ياحلوة لساتك زعلانه` +
    `\n✦•━━━━ ∘⊰🔥⊱∘ ━━━━•✦`;

  const hawemod = [
    `⌯ هلا يا ${targetName} `,
    `⌯ ${targetName} وينك`,
    `⌯ ${targetName} زعلانه`,
    `⌯ ${targetName} الزعلانه`,
    `⌯ مين يراضي ${targetName}`,
    `⌯ مين بيراضي ${targetName}`,
    `⌯ انا براضي ${targetName}`,
    `⌯ ${targetName} ما تزعلي`,
    `⌯ خليكي فرحانه ${targetName}`,
    `⌯ بابا اخد عبود`,
    `⌯ مشوار وما خدني`,
    `⌯ خلي جلبك مسرور`,
    `⌯ وخلاني زعلانه`,
    `⌯ وخلاني زعلانهههه`,
    `⌯ يا ${targetName} يا حلوه`,
    `⌯ ليكي هاي الغنوه`,
    `⌯ ما ضلي زعلانه ${targetName}`
  ];

  async function loading() {
    let { key } = await conn.sendMessage(m.chat, { text: `⌯ زعلانه ${targetName}`, mentions: conn.parseMention(response) }, { quoted: m });
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      await conn.sendMessage(m.chat, { text: hawemod[i], edit: key, mentions: conn.parseMention(response) }, { quoted: m });
    }
    await conn.sendMessage(m.chat, { text: response, edit: key, mentions: conn.parseMention(response) }, { quoted: m });
  }

  loading();
};

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = /^(زعلانه|زعلانة)$/i;

export default handler;
