import { createInterface } from 'readline';

const rl = createInterface(process.stdin, process.stdout);

const responses = {
    "مرحبا": "مرحبًا! كيف يمكنني مساعدتك؟",
    "كيف حالك": "أنا بخير، شكرًا لسؤالك. كيف يمكنني مساعدتك اليوم؟",
    "ما هو اسمك": "اسمي هو بوت. كيف يمكنني مساعدتك؟",
    // يمكنك إضافة المزيد من الردود هنا
};

rl.on('line', (line) => {
    const userInput = line.trim().toLowerCase();
    for (const keyword in responses) {
        if (userInput.includes(keyword)) {
            console.log(responses[keyword]);
            return;
        }
    }
    console.log("عذرًا، لم أفهم ما تقصده. يمكنك محاولة شيء آخر؟");
});
