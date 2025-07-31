const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapList = document.getElementById('lapList');

let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 0;

const startStopwatch = () => {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1); // Update every millisecond
        running = true;

        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
};

const pauseStopwatch = () => {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;

        startButton.disabled = false;
        pauseButton.disabled = true;
        // Keep reset and lap enabled if difference > 0
        resetButton.disabled = (difference === 0);
        lapButton.disabled = (difference === 0);
    }
};

const resetStopwatch = () => {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCounter = 0;
    display.innerHTML = '00:00:00.000';
    lapList.innerHTML = ''; // Clear lap list

    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
};

const recordLap = () => {
    if (running) {
        lapCounter++;
        const lapTime = formatTime(updatedTime - startTime);
        const currentTotalTime = formatTime(difference + (new Date().getTime() - startTime));

        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>Lap ${lapCounter}:</span> ${lapTime} (Total: ${currentTotalTime})`;
        lapList.prepend(listItem); // Add new laps to the top
    }
};


const getShowTime = () => {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const formattedTime = formatTime(difference);
    display.innerHTML = formattedTime;
};

const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    ms %= (1000 * 60 * 60);
    const minutes = Math.floor(ms / (1000 * 60));
    ms %= (1000 * 60);
    const seconds = Math.floor(ms / 1000);
    ms %= 1000;
    const milliseconds = Math.floor(ms);

    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 100 ? (milliseconds < 10 ? "00" : "0") : "") + milliseconds
    );
};

// Event Listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);