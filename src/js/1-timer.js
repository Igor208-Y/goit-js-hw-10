import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector("#datetime-picker");
const btn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let countdown;
let selectedDate;

flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        btn.disabled = selectedDate <= Date.now();
    }
});

btn.addEventListener("click", () => {
    btn.disabled = true;
    input.disabled = true;

    countdown = setInterval(() => {
        const ms = selectedDate - new Date();
        if (ms <= 0) {
            clearInterval(countdown);
            return resetTimer();
        }
        updateTimer(ms);
    }, 1000);
});

function updateTimer(ms) {
    const time = convertMs(ms);
    daysEl.textContent = time.days.toString().padStart(2, "0");
    hoursEl.textContent = time.hours.toString().padStart(2, "0");
    minutesEl.textContent = time.minutes.toString().padStart(2, "0");
    secondsEl.textContent = time.seconds.toString().padStart(2, "0");
}

function resetTimer() {
    input.disabled = false;
    [daysEl, hoursEl, minutesEl, secondsEl].forEach(el => el.textContent = "00");
}

function convertMs(ms) {
    return {
        days: Math.floor(ms / (1000 * 60 * 60 * 24)),
        hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((ms / (1000 * 60)) % 60),
        seconds: Math.floor((ms / 1000) % 60)
    };
}
