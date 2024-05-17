import fetch from  node-fetch ;

async function chatWithGPT(userInput, apiKey) {
    const apiUrl =  https://api.openai.com/v1/engines/davinci-codex/completions ;

    const response = await fetch(apiUrl, {
        method:  POST ,
        headers: {
             Content-Type :  application/json ,
             Authorization : `Bearer ${apiKey}`
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
    const apiKey =  sk-proj-FZRfT8FSXjcNuvee6VvBT3BlbkFJbePTnfCkC3C4TCL9bZnO ; // المفتاح الجديد الذي حصلت عليه

    let userInput;
    if (message.args.length >= 1) {
        userInput = message.args.join(   );
    } else {
        if (message.quoted && message.quoted.text) {
            userInput = message.quoted.text;
        } else {
            throw  الرجاء إدخال نص ;
        }
    }
    
    try {
        let response = await chatWithGPT(userInput, apiKey);
        message.reply(response);
    } catch (error) {
        message.reply( حدث خطأ );
    }
};

handler.help = [ gpt ];
handler.tags = [ ai ];
handler.command = /^gptai$/i;

export default handler;
