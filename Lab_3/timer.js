function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const resetBtn = document.querySelector('#resetBtn');

const timeDisplay = document.querySelector('#time');
const statusBar = document.querySelector('#status');

let time = 0;
let timer = null;

function updateDisplay() {
	let seconds = time % 60;
	let minutes = Math.floor(time / 60);

	if (minutes > 0) {
		if (seconds >= 10) {
			timeDisplay.textContent = `${minutes}:${seconds}`;
		} else {
			timeDisplay.textContent = `${minutes}:0${seconds}`;
		}
	} else {
		timeDisplay.textContent = `${seconds}`;
	}
}

function timerStart() {
	statusBar.textContent = 'Running';
	startBtn.disabled = true;
	timer = setInterval(() => {
		time += 1;
		updateDisplay();
	}, 1000);
}

function timerStop() {
	startBtn.disabled = false;
	statusBar.textContent = 'Stopped';
	clearInterval(timer);
	timer = null;
}

function reset() {
	time = 0;
	updateDisplay();
}
