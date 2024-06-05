const handler = async (m, { conn, command, text }) => {
  const lovePercentage = Math.floor(Math.random() * 100);
  const isHighLove = lovePercentage >= 50;
  const loveDescription = isHighLove ? "" : "";
  const getRandomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];
  const response = `✦•━━━━ ∘⊰🔥⊱∘ ━━━━•✦\n${text} وينك يافحل المجٰال تعال وريهم من انت🌚💔. \n✦•━━━━ ∘⊰🔥⊱∘ ━━━━•✦`; // يُرجى استبدال هنا بالنصوص التي تُفضلها

  async function loading() {
    var hawemod = [
      "عمك",
      "الاسطورة",
      "احمد طرزان",
      "هو فحل العالم",
      "ونايك",
      "كسم المجال",
      "وفحل",
      "كمن",
      "شرموط",
      "يعمل",
      "في مطاردة",
      "الخرفان",
      "ونيك ارقامهم",
      "وتشرديهم",
      "من كل",
      "جروب🤤🤟🏿"
    ];
    let { key } = await conn.sendMessage(m.chat, {text: `⌯ نبذة تعريفيه عن عمكم طرزان`, mentions: conn.parseMention(response)}, {quoted: m});
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      await conn.sendMessage(m.chat, {text: hawemod[i], edit: key, mentions: conn.parseMention(response)}, {quoted: m}); 
    }
    await conn.sendMessage(m.chat, {text: response, edit: key, mentions: conn.parseMention(response)}, {quoted: m});         
  }
  loading();    
};
handler.help = [ love ]; // يُرجى استبدال هنا بوصف الأمر
handler.tags = [ fun ];
handler.command = /^(احمدطزران|الاسطورة طرزان|طرزان)$/i;
export default handler;
