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

let audio = new Audio();
audio.src = 'assets/sad-music.mp3';

let zombieImg = new Image();
zombieImg.src = 'assets/walkingdead.png';
const zombieImgW = 200;
const zombieImgH = 312;
const zombieSpriteN = 10;

class Game {
	#hearts = 3;
	#score = 0;
	#highscore = 0;
	#difficultyC;
	#difficulty;
	#zombies = [];
	#zombieSpawnTimer = 0;
	#zombieSpawnInterval = 5000 * Math.random();

	constructor(difficulty) {
		this.#difficultyC = difficulty;
	}

	start() {
		audio.pause();
		audio.currentTime = 0;
		this.#hearts = 3;
		this.#score = 0;
		this.#difficulty = this.#difficultyC;
		this.#zombies = [];
		this.#zombieSpawnTimer = 0;
		this.#zombieSpawnInterval = (5000 / this.#difficulty) * Math.random();

		//Removing event listenery
		var new_canvas = canvas.cloneNode(true);
		canvas.parentNode.replaceChild(new_canvas, canvas);
		canvas = new_canvas;
		canvas.classList.remove('allowMouse');

		// Shooting with mouseclick
		canvas.addEventListener('click', () => {
			let penality = true;
			this.#difficulty += 0.02;

			//reversing so we prioritize zombies that are drawn last (the ones in front)
			[...this.#zombies].reverse().forEach(zombie => {
				if (zombie.hasBeenHit(cursor_x, cursor_y) && penality) {
					this.#modifyScore(20);
					penality = false;
					this.#zombies.splice(this.#zombies.indexOf(zombie), 1);
				}
			});
			// Didn't hit any zombies, we get penality
			if (penality) {
				this.#modifyScore(-5);
			}
		});

		requestAnimationFrame(gameLoop);
	}

	#end() {
		cancelAnimationFrame(gameLoop);
		audio.play();

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
				this.start();
			}
		});
	}

	update(deltaTime) {
		// Update zombies
		this.#zombies.forEach(zombie => {
			// Update frame
			zombie.animationTime += deltaTime * zombie.getSpeed();
			if (zombie.animationTime > 100) {
				zombie.animationFrame += 1;
				zombie.animationFrame %= zombieSpriteN;
				zombie.animationTime = 0;
			}

			// Update position
			zombie.moveOneStep();

			//listen to wall
			if (zombie.getX() + (zombieImgW * zombie.getScale()) / 2 <= 0) {
				this.#zombies.splice(this.#zombies.indexOf(zombie), 1);
				this.#loseHeart();
			}
		});

		// Spawning zombies
		this.#zombieSpawnTimer += deltaTime;
		if (this.#zombieSpawnTimer > this.#zombieSpawnInterval) {
			this.#zombieSpawnInterval =
				(5000 / this.#difficulty) * Math.random();
			this.#zombieSpawnTimer = 0;

			let height = getRandomInt(0, 250); //0-250 so zombie can walk on ground
			let scale = Math.min(
				Math.max(
					Math.random() + 1 / Math.max(this.#difficulty / 2.5, 1),
					0.3
				),
				5
			);
			let speed = 1 + Math.random() * 2 * this.#difficulty;
			this.#zombies.push(new Zombie(scale, speed, height));
		}

		// Sort zombies
		this.#sortZombies();
	}

	checkForEnd() {
		if (this.#hearts <= 0) {
			this.#end();
			return true;
		}
		return false;
	}

	#modifyScore(value) {
		this.#score += value;
		if (this.#score > this.#highscore) {
			this.#highscore = this.#score;
		}
	}

	#loseHeart() {
		this.#hearts -= 1;
	}

	getHearts() {
		return this.#hearts;
	}

	getScore() {
		return this.#score;
	}

	getHighScore() {
		return this.#highscore;
	}

	getZombies() {
		return [...this.#zombies];
	}

	#sortZombies() {
		this.#zombies.sort((a, b) => {
			if (a.getFeetY() > b.getFeetY()) {
				return -1;
			}
			return 1;
		});
	}
}

// Classes
class Zombie {
	animationFrame = 0;
	animationTime = 0;
	#x = canvas.width;
	#scale;
	#speed;
	#y;
	#feetY;

	constructor(scale, speed, y) {
		this.#scale = scale;
		this.#speed = speed;
		this.#feetY = y;
		this.#y = canvas.height - (zombieImgH * scale) / 2 - y;
	}

	hasBeenHit(cursorX, cursorY) {
		return (
			cursorX >= this.#x &&
			cursorX <= this.#x + (zombieImgW * this.#scale) / 2 &&
			cursorY >= this.#y &&
			cursorY <= this.#y + (zombieImgH * this.#scale) / 2
		);
	}

	moveOneStep() {
		this.#x -= this.#speed;
	}

	getX() {
		return this.#x;
	}

	getY() {
		return this.#y;
	}

	getFeetY() {
		return this.#feetY;
	}

	getScale() {
		return this.#scale;
	}

	getSpeed() {
		return this.#speed;
	}
}

// Cursor position
var cursor_x = -1;
var cursor_y = -1;
document.onmousemove = function (event) {
	cursor_x = event.pageX;
	cursor_y = event.pageY;
};

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max + 1);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function renderUi() {
	ctx = canvas.getContext('2d');

	// hearts
	const heartsPositions = [10, 84, 158];
	for (let i = 0; i < game.getHearts(); i++) {
		ctx.drawImage(fullHeart, heartsPositions[i], 10, 64, 64);
	}
	for (let i = game.getHearts(); i < 3; i++) {
		ctx.drawImage(emptyHeart, heartsPositions[i], 10, 64, 64);
	}

	// score
	ctx.font = '64px Arial';
	ctx.fillStyle = 'white';
	let scoreString = '';
	if (game.getScore() < 0) {
		scoreString = '-';
	}
	for (let i = 0; i < 5 - game.getScore().toString().length; i++) {
		scoreString += '0';
	}
	scoreString += Math.abs(game.getScore()).toString();
	ctx.fillText(scoreString, canvas.width - 190, 128);

	//Highscore
	let highScoreString = 'Highscore: ';
	for (let i = 0; i < 5 - game.getHighScore().toString().length; i++) {
		highScoreString += '0';
	}
	highScoreString += Math.abs(game.getHighScore()).toString();
	ctx.fillText(highScoreString, canvas.width - 510, 64);

	// cursor
	ctx.drawImage(cursorImg, cursor_x - 64, cursor_y - 64, 128, 128);
}

function render() {
	ctx = canvas.getContext('2d');
	// bg
	ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

	game.getZombies().forEach(zombie => {
		ctx.drawImage(
			zombieImg,
			zombieImgW * zombie.animationFrame,
			0,
			zombieImgW,
			zombieImgH,
			zombie.getX(),
			zombie.getY(),
			(zombieImgW / 2) * zombie.getScale(),
			(zombieImgH / 2) * zombie.getScale()
		);
	});

	renderUi();
}

// Main game loop
let lastTime = 0;
function gameLoop(timestamp) {
	const deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	game.update(deltaTime);
	render();

	if (game.checkForEnd()) {
		return;
	}

	requestAnimationFrame(gameLoop);
}

// Start the game loop
let diff = Number(
	prompt('Set starting difficulty (default is 1, higher means harder)', 1)
);
let game = new Game(diff);
game.start();
