// إعداد المتغيرات والوظائف العامة
let autosholat = {};
let groupSettings = {};

const jadwalSholat = {
    الفجر: "04:15",
    الضحى: "05:50",
    الظهر: "12:00",
    العصر: "15:25",
    المغرب: "18:30",
    العشاء: "19:45"
};

const messages = {
    الفجر: "حان موعد أذان الفجر، استعد للصلاة.",
    الضحى: "حان موعد أذان الضحى، استعد للصلاة.",
    الظهر: "حان موعد أذان الظهر، استعد للصلاة.",
    العصر: "حان موعد أذان العصر، استعد للصلاة.",
    المغرب: "حان موعد أذان المغرب، استعد للصلاة.",
    العشاء: "حان موعد أذان العشاء، استعد للصلاة."
};

// دالة لتحديث إعدادات المجموعة
function updateGroupSettings(groupId, newSettings) {
    groupSettings[groupId] = { ...groupSettings[groupId], ...newSettings };
}

// دالة لتحميل أوقات الصلاة من API
async function getPrayerTimes(timezone) {
    const response = await fetch(`https://api.pray.zone/v2/times/today.json?city=sanaa&timeformat=1`);
    const data = await response.json();
    return {
        الفجر: data.results.datetime[0].times.Fajr,
        الضحى: data.results.datetime[0].times.Sunrise,
        الظهر: data.results.datetime[0].times.Dhuhr,
        العصر: data.results.datetime[0].times.Asr,
        المغرب: data.results.datetime[0].times.Maghrib,
        العشاء: data.results.datetime[0].times.Isha
    };
}

// دالة لإرسال التذكيرات
async function sendReminders() {
    const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Aden" }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    for (const groupId in groupSettings) {
        const { remindersEnabled, customTimes, timezone } = groupSettings[groupId];
        if (!remindersEnabled) continue;

        const jadwal = customTimes || jadwalSholat;

        for (const [sholat, waktu] of Object.entries(jadwal)) {
            if (timeNow === waktu) {
                const name = "المستخدم"; // استخدم دالة للحصول على اسم المستخدم حسب الحاجة
                const caption = `السلام عليكم *${name}*,\n${messages[sholat]}\n\n*${waktu}*\n> *هذا توقيت الصلاة في صنعاء وما جاورها*`;
                autosholat[groupId] = [
                    // this.reply(m.chat, caption, null),  // تأكد من استبدال هذه السطر بدالة الرد الفعلية
                    setTimeout(() => {
                        delete autosholat[groupId];
                    }, 57000)
                ];
                console.log(`Reminder sent for ${sholat} at ${timeNow} to group ${groupId}`);
            }
        }
    }
}

// دالة لتفعيل التذكيرات التلقائية
function startAutoReminders() {
    console.log("Starting automatic reminders...");
    setInterval(sendReminders, 60000); // التحقق كل دقيقة
}

// إعداد الإعدادات الافتراضية للمجموعة وتشغيل التذكيرات التلقائية
function initializeGroupSettings(groupId) {
    if (!groupSettings[groupId]) {
        groupSettings[groupId] = {
            timezone: "Asia/Aden",
            remindersEnabled: true,
            customTimes: {}
        };
    }
}

// استدعاء دالة بدء التذكيرات التلقائية عند تشغيل البرنامج
startAutoReminders();
