const start = document.getElementById('start-btn');
const pause = document.getElementById('pause-btn');
const reset = document.getElementById('reset-btn');

let timer;
let timerleft = 25 * 60; 
timerDisplay = document.getElementById('timer-display');

function updateDisplay() {
    const minutes = Math.floor(timerleft / 60);
    const seconds = timerleft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timerleft > 0) {
            timerleft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            alert('Time\'s up!');
            timerleft = 25 * 60;
            updateDisplay();
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