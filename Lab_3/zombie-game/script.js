const canvas = document.querySelector('#gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bgImg = new Image();
bgImg.src = 'assets/board-bg.jpg';

let fullHeart = new Image();
fullHeart.src = 'assets/full_heart.png';

let emptyHeart = new Image();
emptyHeart.src = 'assets/empty_heart.png';

let cursorImg = new Image();
cursorImg.src = 'assets/aim.png';

let zombieImg = new Image();
zombieImg.src = 'assets/walkingdead.png';
const zombieImgW = 200;
const zombieImgH = 312;
const zombieSpriteN = 10;

// Global Variables
let hearts = 3;
let score = 0;
let zombies = [];

// Classes
class Zombie {
	constructor(scale, speed, y) {
		this.scale = scale;
		this.speed = speed;
		this.y = y;
	}
	animationFrame = 0;
	x = canvas.width;
}

// Cursor position
var cursor_x = -1;
var cursor_y = -1;
document.onmousemove = function (event) {
	cursor_x = event.pageX;
	cursor_y = event.pageY;
};

function renderUi() {
	ctx = canvas.getContext('2d');
	// bg
	ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

	// hearts
	const heartsPositions = [10, 84, 158];
	for (let i = 0; i < hearts; i++) {
		ctx.drawImage(fullHeart, heartsPositions[i], 10, 64, 64);
	}
	for (let i = hearts; i < 3; i++) {
		ctx.drawImage(emptyHeart, heartsPositions[i], 10, 64, 64);
	}

	// score
	ctx.font = '64px Arial';
	ctx.fillStyle = 'white';
	let scoreString = '';
	for (let i = 0; i < 5 - score.toString().length; i++) {
		scoreString += '0';
	}
	scoreString += score.toString();
	ctx.fillText(scoreString, canvas.width - 190, 64);

	// cursor
	ctx.drawImage(cursorImg, cursor_x - 64, cursor_y - 64, 128, 128);
}

function update() {}

function render() {
	ctx = canvas.getContext('2d');
	renderUi();
}

// Main game loop
let lastTime = 0;
function gameLoop(timestamp) {
	const deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	update(deltaTime);
	render();

	requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
