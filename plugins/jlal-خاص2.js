//GURU-BOT
/*import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Please provide a phone number.';

  try {
    let res = await fetch(`https://inrl-web.onrender.com/api/truecaller?number=${text}`);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    let json = await res.json();

    if (!json.data || !json.data.length) {
      throw new Error('No data found in API response.');
    }

    // Focus on the first object inside the data array.
    let data = json.data[0];

    // Add custom property.
    data.creator = 'GURU';

    let response = '';

    // Add details directly to the response
    response += `ð‘ð‘Žð‘šð‘’: ${data.name}\n`;
    response += `ð™¶ðšŽðš—ðšðšŽðš›: ${data.gender}\n`;
    response += `ðš‚ðšŒðš˜ðš›ðšŽ: ${data.score}\n`;
    response += `ðš‚ðšŒðš˜ðš›ðšŽ: ${data.access}\n`;
    response += `ð™´ðš—ðš‘ðšŠðš—ðšŒðšŽðš: ${data.enhanced}\n`;

    // Handle phone details
    if (data.phones && data.phones.length > 0) {
      let phone = data.phones[0];
      response += `ð™¿ðš‘ðš˜ðš—ðšŽ:\n`;
      response += `  - ð™š164ð™ð™¤ð™§ð™¢ð™–ð™©: ${phone.e164Format}\n`;
      response += `  - ð™£ð™ªð™¢ð™—ð™šð™§ð™ð™®ð™¥ð™š: ${phone.numberType}\n`;
      response += `  - ð™£ð™–ð™©ð™žð™¤ð™£ð™–ð™¡ð™ð™¤ð™§ð™¢ð™–ð™©: ${phone.nationalFormat}\n`;
      response += `  - ð™™ð™žð™–ð™¡ð™žð™£ð™œð˜¾ð™¤ð™™ð™š: ${phone.dialingCode}\n`;
      response += `  - ð™˜ð™¤ð™ªð™£ð™©ð™§ð™®ð˜¾ð™¤ð™™ð™š: ${phone.countryCode}\n`;
      response += `  - ð™˜ð™–ð™§ð™§ð™žð™šð™§: ${phone.carrier}\n`;
      response += `  - ð™©ð™®ð™¥ð™š: ${phone.type}\n`;
    }

    // Handle address details
    if (data.addresses && data.addresses.length > 0) {
      let address = data.addresses[0];
      response += `ð˜ˆð˜¥ð˜¥ð˜³ð˜¦ð˜´ð˜´ð˜¦ð˜´:\n`;
      response += `  - ð—®ð—±ð—±ð—¿ð—²ð˜€ð˜€: ${address.address}\n`;
      response += `  - ð˜€ð˜ð—¿ð—²ð—²ð˜: ${address.street}\n`;
      response += `  - ð˜‡ð—¶ð—½ð—–ð—¼ð—±ð—²: ${address.zipCode}\n`;
      response += `  - ð—°ð—¶ð˜ð˜†: ${address.city}\n`;
      response += `  - ð—°ð—¼ð˜‚ð—»ð˜ð—¿ð˜†ð—–ð—¼ð—±ð—²: ${address.countryCode}\n`;
      response += `  - ð˜ð—¶ð—ºð—²ð—­ð—¼ð—»ð—²: ${address.timeZone}\n`;
      response += `  - ð˜ð˜†ð—½ð—²: ${address.type}\n`;
    }

    // Add 'creator' property to the response
    response += `ð—–ð—¥ð—˜ð—”ð—§ð—¢ð—¥: ${data.creator}\n`;

    m.reply(response);
  } catch (error) {
    console.error(error);
    m.reply('An error occurred while processing your request. Please try again.');
  }
};

handler.help = ['true'];
handler.tags = ['tools'];
handler.command = /^(true|caller)$/i;

export default handler;*/
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ø§ÙŠÙ† Ù‡Ùˆ Ø§Ù„Ø±Ù‚Ù… Ø§Ù„Ø°ÙŠ ØªØ±ÙŠØ¯ Ø§Ù„Ø¨Ø­Ø« Ø¹Ù†Ù‡ ?\nÙ…Ø«Ø§Ù„ : \n .truecaller2 ++96773315673';

  try {
    let res = await fetch(`https://inrl-web.onrender.com/api/truecaller?number=${text}`);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    let json = await res.json();

    console.log('JSON response:', json);

    
    json;

    let milf = '';
    for (let prop in json) {
      milf += `â€„1¤7 *${prop}:* ${json[prop]}\n`;
    }

    m.reply(milf);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};

handler.help = ['true'];
handler.tags = ['tools'];
handler.command = /^(خاص2)$/i;

export default handler;
