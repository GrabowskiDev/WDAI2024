const N = 84;
const gallery = document.querySelector('.gallery');
const imageTag = document.querySelector('#image-displayed');
const main = document.querySelector('#main');

const nextBtn = document.querySelector('#image-next');
const prevBtn = document.querySelector('#image-prev');
const closeBtn = document.querySelector('#image-close');
let activeImage = 0;

function displayImage() {
	imageTag.src = `img/gallery/Photo${activeImage}.jpg`;
}

//Displaying all photos in gallery
for (let i = 1; i <= 84; i++) {
	let item = document.createElement('div');
	item.classList.add('item');
	item.id = i;

	let img = document.createElement('img');
	img.src = `img/gallery/Photo${i}.jpg`;
	img.alt = `Picture number ${i}`;

	item.appendChild(img);
	gallery.appendChild(item);
}

//Click listeners to all gallery photos
const items = document.querySelectorAll('.item');
items.forEach(item => {
	item.onclick = () => {
		console.log(item.id);
		activeImage = Number(item.id);
		displayImage();
		main.classList.add('open');
	};
});

// Picture viewer buttons
nextBtn.addEventListener('click', () => {
	console.log(activeImage);
	activeImage += 1;
	if (activeImage > N) {
		activeImage = 1;
	}
	console.log(activeImage);
	displayImage();
});

prevBtn.addEventListener('click', () => {
	activeImage -= 1;
	if (activeImage <= 0) {
		activeImage = N;
	}
	displayImage();
});

closeBtn.addEventListener('click', () => {
	main.classList.remove('open');
});
