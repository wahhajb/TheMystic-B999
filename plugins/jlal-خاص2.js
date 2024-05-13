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
    response += `饾憗饾憥饾憵饾憭: ${data.name}\n`;
    response += `饾櫠饾殠饾殫饾殟饾殠饾殯: ${data.gender}\n`;
    response += `饾殏饾殞饾殬饾殯饾殠: ${data.score}\n`;
    response += `饾殏饾殞饾殬饾殯饾殠: ${data.access}\n`;
    response += `饾櫞饾殫饾殤饾殜饾殫饾殞饾殠饾殟: ${data.enhanced}\n`;

    // Handle phone details
    if (data.phones && data.phones.length > 0) {
      let phone = data.phones[0];
      response += `饾櫩饾殤饾殬饾殫饾殠:\n`;
      response += `  - 饾櫄164饾檨饾櫎饾櫑饾櫌饾櫀饾櫓: ${phone.e164Format}\n`;
      response += `  - 饾櫍饾櫔饾櫌饾櫁饾櫄饾櫑饾檹饾櫘饾櫏饾櫄: ${phone.numberType}\n`;
      response += `  - 饾櫍饾櫀饾櫓饾櫈饾櫎饾櫍饾櫀饾櫋饾檨饾櫎饾櫑饾櫌饾櫀饾櫓: ${phone.nationalFormat}\n`;
      response += `  - 饾櫃饾櫈饾櫀饾櫋饾櫈饾櫍饾櫆饾樉饾櫎饾櫃饾櫄: ${phone.dialingCode}\n`;
      response += `  - 饾櫂饾櫎饾櫔饾櫍饾櫓饾櫑饾櫘饾樉饾櫎饾櫃饾櫄: ${phone.countryCode}\n`;
      response += `  - 饾櫂饾櫀饾櫑饾櫑饾櫈饾櫄饾櫑: ${phone.carrier}\n`;
      response += `  - 饾櫓饾櫘饾櫏饾櫄: ${phone.type}\n`;
    }

    // Handle address details
    if (data.addresses && data.addresses.length > 0) {
      let address = data.addresses[0];
      response += `饾槇饾槬饾槬饾槼饾槮饾槾饾槾饾槮饾槾:\n`;
      response += `  - 饾棶饾棻饾棻饾椏饾棽饾榾饾榾: ${address.address}\n`;
      response += `  - 饾榾饾榿饾椏饾棽饾棽饾榿: ${address.street}\n`;
      response += `  - 饾槆饾椂饾椊饾棖饾椉饾棻饾棽: ${address.zipCode}\n`;
      response += `  - 饾棸饾椂饾榿饾槅: ${address.city}\n`;
      response += `  - 饾棸饾椉饾槀饾椈饾榿饾椏饾槅饾棖饾椉饾棻饾棽: ${address.countryCode}\n`;
      response += `  - 饾榿饾椂饾椇饾棽饾棴饾椉饾椈饾棽: ${address.timeZone}\n`;
      response += `  - 饾榿饾槅饾椊饾棽: ${address.type}\n`;
    }

    // Add 'creator' property to the response
    response += `饾棖饾棩饾棙饾棓饾棫饾棦饾棩: ${data.creator}\n`;

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
  if (!text) throw '丕賷賳 賴賵 丕賱乇賯賲 丕賱匕賷 鬲乇賷丿 丕賱亘丨孬 毓賳賴 ?\n賲孬丕賱 : \n .truecaller2 ++96773315673';

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
      milf += `鈥� *${prop}:* ${json[prop]}\n`;
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
