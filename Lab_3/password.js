const minInput = document.querySelector('#min');
const maxInput = document.querySelector('#max');
const bigLettersCheckbox = document.querySelector('#bigLetters');
const specialCharCheckbox = document.querySelector('#specialChar');

const letters = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
];

const bigLetters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

const specialCharacters = [
	'!',
	'@',
	'#',
	'$',
	'%',
	'^',
	'&',
	'*',
	'(',
	')',
	'-',
	'+',
	'_',
	'=',
	'{',
	'}',
	'[',
	']',
	';',
	':',
	'"',
	"'",
	',',
	'.',
	'?',
	'<',
	'>',
	'/',
];

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function shuffle(array) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
}

function generate() {
	let charactersToGenerate = [];
	let passwordCharacters = [];
	let min = Number(minInput.value);
	let max = Number(maxInput.value);
	let special = specialCharCheckbox.checked;
	let big = bigLettersCheckbox.checked;

	if (max < min) {
		alert(
			'Error: Maksymalna wartość musi być większa od minimalnej wartości'
		);
		return;
	}

	let charactersNumber = getRandomInt(min, max + 1);

	if (special) {
		passwordCharacters.push(
			specialCharacters[getRandomInt(0, specialCharacters.length)]
		);
		charactersToGenerate = charactersToGenerate.concat(specialCharacters);
		charactersNumber -= 1;
	}
	if (big) {
		passwordCharacters.push(bigLetters[getRandomInt(0, bigLetters.length)]);
		charactersToGenerate = charactersToGenerate.concat(bigLetters);
		charactersNumber -= 1;
	}
	charactersToGenerate = charactersToGenerate.concat(letters);

	for (let i = 0; i < charactersNumber; i++) {
		passwordCharacters.push(
			charactersToGenerate[getRandomInt(0, charactersToGenerate.length)]
		);
	}
	console.log(passwordCharacters);

	shuffle(passwordCharacters);

	alert(passwordCharacters.join(''));
}
