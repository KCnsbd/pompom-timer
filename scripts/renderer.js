const start = document.getElementById('start-btn');
const pause = document.getElementById('pause-btn');
const reset = document.getElementById('reset-btn');
const alarmSound = document.getElementById('alarm-sound');

let timer;
let timerleft = 3;
let isFocus = true;

timerDisplay = document.getElementById('timer-display');

function updateDisplay() {
    const minutes = Math.floor(timerleft / 60);
    const seconds = timerleft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, { body });
            }
        });
    }
}

function switchMode() {
    isFocus = !isFocus;

    showNotification("Pompom Timer", isFocus ? "Focus session started!" : "Break time! Relax");

    if (isFocus) {
        timerleft = 3;
    } else {
        timerleft = 15 * 60;
    }
    updateDisplay();
    startTimer();
}

const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timerleft > 0) {
            timerleft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            switchMode();
            startTimer();
        }        
    }, 1000)};

const pauseTimer = () => {
    clearInterval(timer);
}

const resetTimer = () => {
    clearInterval(timer);
    timerleft = 25 * 60;
    updateDisplay();
}

start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer);

updateDisplay();