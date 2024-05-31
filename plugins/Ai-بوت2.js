import { fileTypeFromBuffer } from 'file-type';
import fetch from 'node-fetch';

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
    const input_data = [
        "pixar",
        "pixar_plus",
        "3d_cartoon",
        "angel",
        "angel_plus",
        "demon",
        "ukiyoe_cartoon",
        "bopu_cartoon",
        "amcartoon",
        "western",
        "avatar",
        "famous",
        "jpcartoon",
        "jpcartoon_head",
        "hkcartoon",
        "classic_cartoon",
        "tccartoon",
        "anime",
        "handdrawn",
        "sketch",
        "artstyle",
        "head",
        "full",
        "3d_game"
    ];

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'لم يتم العثور على وسائط';
    let media = await q.download();
    let urutan = text.trim();
    await m.reply("يرجى الانتظار...");

    try {
        let data = input_data.map(item => ({
            title: item.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            id: item
        }));

        if (!urutan) return m.reply("أدخل الاستعلام!\n*مثال:*\n.ailabs [رقم أو اسم]\n\n*اختر من الخيارات المتاحة*\n" + data.map((item, index) => `*${index + 1}.* ${item.title} (${item.id})`).join("\n"));

        let out;
        if (isNaN(urutan)) {
            out = data.find(item => item.id.toLowerCase() === urutan.toLowerCase());
            if (!out) return m.reply("أدخل الاستعلام الصحيح!\n*مثال:*\n.ailabs [رقم أو اسم]\n\n*اختر من الخيارات المتاحة*\n" + data.map((item, index) => `*${index + 1}.* ${item.title} (${item.id})`).join("\n"));
        } else {
            if (urutan > data.length || urutan < 1) return m.reply("أدخل الاستعلام الصحيح!\n*مثال:*\n.ailabs [رقم أو اسم]\n\n*اختر من الخيارات المتاحة*\n" + data.map((item, index) => `*${index + 1}.* ${item.title} (${item.id})`).join("\n"));
            out = data[urutan - 1];
        }

        const openAIResponse = await cartoonifyImage(media, out.id);
        if (openAIResponse) {
            const result = openAIResponse;
            const tag = `@${m.sender.split('@')[0]}`;
            await conn.sendMessage(m.chat, {
                image: {
                    url: result.data.image_url
                },
                caption: `هذا تأثير *${out.title}* الخاص بك\nطلب بواسطة: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("لا يوجد رد من OpenAI أو حدث خطأ.");
        }
    } catch (e) {
        console.error(e); // عرض الخطأ في وحدة التحكم للتحقق منه
        await m.reply("حدث خطأ أثناء المعالجة");
    }
};

handler.help = ["ailabs [رقم أو اسم]"];
handler.tags = ["drawing"];
handler.command = /^(ailabs|بوت2)$/i;
handler.limit = true;

export default handler;

async function cartoonifyImage(buffer, type) {
    const fileType = await fileTypeFromBuffer(buffer) || {};
    const mime = fileType ? fileType.mime : 'image/jpg';
    const ext = fileType ? `.${fileType.ext}` : '.jpg';
    const body = {
        image: `data:${mime};base64,${buffer.toString('base64')}`,
        type
    };

    const url = 'https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '230d665706msh8c981a10569b6aep1c5006jsn77776aeae50e',
            'X-RapidAPI-Host': 'cartoon-yourself.p.rapidapi.com',
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
    }

    return await response.json();
}
