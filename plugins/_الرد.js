async function executeSpecialCommand(userInput) {
    if (userInput.toLowerCase().includes("مرحبا")) {
        const specialResponse = "رد الأمر الخاص";
        displayBotResponse(specialResponse);
    }
}

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.textContent = userInput;

    const chatMessages = document.getElementById("chat-messages");
    chatMessages.appendChild(userMessage);

    document.getElementById("user-input").value = "";

    await executeSpecialCommand(userInput);

    try {
        const botResponse = await generateBotResponse(userInput);
        displayBotResponse(botResponse);
    } catch (error) {
        console.log(error);
        // يمكن عرض رسالة خطأ للمستخدم هنا
    }
}

function generateBotResponse(userInput) {
    // يمكنك توليد رد البوت هنا بناءً على ما تريده
    // في هذا المثال، سأقوم بإرجاع رسالة بسيطة
    return "رد بوت بسيط";
}
