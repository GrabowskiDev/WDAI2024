let canvas = document.querySelector('#gameCanvas');
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
let zombieSpawnTimer = 0;
let zombieSpawnInterval = 5000 * Math.random();

// Classes
class Zombie {
	constructor(scale, speed, y) {
		this.scale = scale;
		this.speed = speed;
		this.y = canvas.height - (zombieImgH * scale) / 2 - y;
	}
	animationFrame = 0;
	animationTime = 0;
	x = canvas.width;

	hasBeenHit(cursorX, cursorY) {
		return (
			cursorX >= this.x &&
			cursorX <= this.x + (zombieImgW * this.scale) / 2 &&
			cursorY >= this.y &&
			cursorY <= this.y + (zombieImgH * this.scale) / 2
		);
	}
}

// Cursor position
var cursor_x = -1;
var cursor_y = -1;
document.onmousemove = function (event) {
	cursor_x = event.pageX;
	cursor_y = event.pageY;
	console.log(cursor_x, cursor_y);
};

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max + 1);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function gameStart() {
	hearts = 3;
	score = 0;
	zombies = [];
	zombieSpawnTimer = 0;
	zombieSpawnInterval = 5000 * Math.random();

	var new_canvas = canvas.cloneNode(true);
	canvas.parentNode.replaceChild(new_canvas, canvas);
	canvas = new_canvas;
	canvas.classList.remove('allowMouse');

	// Shooting with mouseclick
	canvas.addEventListener('click', () => {
		let penality = true;
		zombies.forEach(zombie => {
			if (zombie.hasBeenHit(cursor_x, cursor_y)) {
				score += 20;
				penality = false;
				zombies.splice(zombies.indexOf(zombie), 1);
			}
		});
		if (penality) {
			score -= 5;
		}
	});

	requestAnimationFrame(gameLoop);
}

function gameEnd() {
	console.log('gameEnd');
	cancelAnimationFrame(gameLoop);
	ctx = canvas.getContext('2d');
	ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 50, 400, 100);
	ctx.font = '64px Arial';
	ctx.fillStyle = 'Black';
	ctx.fillText('Restart', canvas.width / 2 - 100, canvas.height / 2 + 21);
	canvas.classList.add('allowMouse');

	canvas.addEventListener('click', () => {
		if (
			cursor_x >= canvas.width / 2 - 200 &&
			cursor_x <= canvas.width / 2 + 200 &&
			cursor_y >= canvas.height / 2 - 50 &&
			cursor_y <= canvas.height / 2 + 50
		) {
			gameStart();
			removeEventListener();
		}
	});
}

function renderUi() {
	ctx = canvas.getContext('2d');

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
	if (score < 0) {
		scoreString = '-';
	}
	for (let i = 0; i < 5 - score.toString().length; i++) {
		scoreString += '0';
	}
	scoreString += Math.abs(score).toString();
	ctx.fillText(scoreString, canvas.width - 190, 64);

	// cursor
	ctx.drawImage(cursorImg, cursor_x - 64, cursor_y - 64, 128, 128);
}

function update(deltaTime) {
	// Update zombies
	zombies.forEach(zombie => {
		// Update frame
		zombie.animationTime += deltaTime * zombie.speed;
		if (zombie.animationTime > 100) {
			zombie.animationFrame += 1;
			zombie.animationFrame %= zombieSpriteN;
			zombie.animationTime = 0;
		}

		// Update position
		zombie.x -= 2 * zombie.speed;

		//listen to wall
		if (zombie.x + (zombieImgW * zombie.scale) / 2 <= 0) {
			zombies.splice(zombies.indexOf(zombie), 1);
			hearts -= 1;
		}
	});

	// Spawning zombies
	zombieSpawnTimer += deltaTime;
	if (zombieSpawnTimer > zombieSpawnInterval) {
		zombieSpawnInterval = 5000 * Math.random();
		zombieSpawnTimer = 0;

		height = getRandomInt(0, 200); //0-200 so zombie can walk on ground
		scale = Math.random() + 1;
		speed = Math.random() + 1;
		zombies.push(new Zombie(scale, speed, height));
	}
}

function render() {
	ctx = canvas.getContext('2d');
	// bg
	ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

	zombies.forEach(zombie => {
		ctx.drawImage(
			zombieImg,
			zombieImgW * zombie.animationFrame,
			0,
			zombieImgW,
			zombieImgH,
			zombie.x,
			zombie.y,
			(zombieImgW / 2) * zombie.scale,
			(zombieImgH / 2) * zombie.scale
		);
	});

	renderUi();
}

// Main game loop
let lastTime = 0;
function gameLoop(timestamp) {
	const deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	update(deltaTime);
	render();

	//Game end
	if (hearts == 0) {
		gameEnd();
		return;
	}

	requestAnimationFrame(gameLoop);
}

//testing
// let zombie = new Zombie(1, 1, canvas.height - zombieImgH / 2);
let zombie = new Zombie(1, 1, 200);

zombie.x = 1920;
zombies.push(zombie);

// Start the game loop
gameStart();
