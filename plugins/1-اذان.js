export async function before(m) {
    this.autosholat = this.autosholat || {};
    const groupId = m.chat;
    
    if (!this.groupSettings) {
        this.groupSettings = {};
    }

    if (!this.groupSettings[groupId]) {
        this.groupSettings[groupId] = {
            timezone: "Asia/Aden",
            remindersEnabled: true,
            customTimes: {}
        };
    }

    const { timezone, remindersEnabled, customTimes } = this.groupSettings[groupId];
    
    if (!remindersEnabled) {
        return;
    }

    const jadwalSholat = customTimes || await getPrayerTimes(timezone);
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
    const name = await this.getName(who);
    const date = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
            const caption = `السلام عليكم *${name}*,\n${messages[sholat]}\n\n*${waktu}*\n> *هذا توقيت الصلاة في صنعاء وما جاورها*`;
            this.autosholat[groupId] = [
                this.reply(m.chat, caption, null),
                setTimeout(() => {
                    delete this.autosholat[groupId];
                }, 57000)
            ];
            playAudio(sholat); // تشغيل الإشعار الصوتي
        }
    }
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
