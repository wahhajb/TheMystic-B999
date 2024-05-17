import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function chatWithGPT(userInput) {
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

let handler = async (message) => {
    let userInput;
    if (message.args.length >= 1) {
        userInput = message.args.join(' ');
    } else {
        if (message.quoted && message.quoted.text) {
            userInput = message.quoted.text;
        } else {
            throw 'الرجاء إدخال نص';
        }
    }
    
    try {
        let response = await chatWithGPT(userInput);
        message.reply(response);
    } catch (error) {
        message.reply('حدث خطأ');
    }
};

handler.help = ['gpt'];
handler.tags = ['ai'];
handler.command = /^جيبيتي$/i;

export default handler;
