const Days = document.getElementById('days');
const Hours = document.getElementById('hours');
const Minutes = document.getElementById('minutes');
const Seconds = document.getElementById('seconds');

const targetDate = new Date("December 6 2026 00:00:00").getTime();

function timer () {
    const currentDate = new Date().getTime();
    const distance = targetDate - currentDate;

   const days = Math.ceil(distance / 1000 / 60 / 60 / 24);
    const hours = Math.floor(distance / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(distance / 1000 / 60) % 60;
    const seconds = Math.floor(distance / 1000) % 60;

    Days.innerHTML = days;
    Hours.innerHTML = hours;
    Minutes.innerHTML = minutes;
    Seconds.innerHTML = seconds;

    if(distance < 0){
        Days.innerHTML = "00";
        Hours.innerHTML = "00";
        Minutes.innerHTML = "00";
        Seconds.innerHTML = "00";
    }
}

setInterval(timer, 1000);

document.getElementById("reminderBtn").addEventListener("click", () => {
    const title = "My Reminder";
    const description = "Don't forget this!";

    // Start = today, End = Dec 6, 2026
    const start = new Date();
    const lastDay = new Date(2026, 11, 6); // months start at 0, so 11 = December

    // All-day events treat the end date as exclusive, so add 1 day to include Dec 6
    const endExclusive = new Date(lastDay);
    endExclusive.setDate(endExclusive.getDate() + 1);

    // Format as YYYYMMDD using the local date (avoids timezone shifts)
    const fmt = (d) =>
        d.getFullYear() +
        String(d.getMonth() + 1).padStart(2, "0") +
        String(d.getDate()).padStart(2, "0");

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isIOS) {
        // iPhone: opens the "Add to Calendar" screen directly
        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "BEGIN:VEVENT",
            `DTSTART;VALUE=DATE:${fmt(start)}`,
            `DTEND;VALUE=DATE:${fmt(endExclusive)}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description}`,
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        window.location.href = "data:text/calendar;charset=utf8," + encodeURIComponent(ics);
    } else {
        // Android and desktop: opens Google Calendar with the event pre-filled
        const url =
            "https://calendar.google.com/calendar/render?action=TEMPLATE" +
            `&text=${encodeURIComponent(title)}` +
            `&details=${encodeURIComponent(description)}` +
            `&dates=${fmt(start)}/${fmt(endExclusive)}`;

        window.location.href = url;
    }
});