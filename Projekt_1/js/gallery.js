const N = 84;
const gallery = document.querySelector('.gallery');
const imageTag = document.querySelector('#image-displayed');

const nextBtn = document.querySelector('#image-next');
const prevBtn = document.querySelector('#image-prev');
let activeImage = 0;

function displayImage() {
	imageTag.src = `img/gallery/Photo${activeImage}.png`;
}

//Displaying all photos in gallery
for (let i = 1; i <= 84; i++) {
	let item = document.createElement('div');
	item.classList.add('item');
	item.id = `Photo${i}`;

	let img = document.createElement('img');
	img.src = `img/gallery/Photo${i}.png`;
	img.alt = `Picture number ${i}`;

	item.appendChild(img);
	gallery.appendChild(item);
}

//Click listeners to all gallery photos
const items = document.querySelectorAll('.item');
items.forEach(item => {
	item.onclick = () => {
		console.log(item.id);
	};
});

// Picture viewer buttons
nextBtn.addEventListener('click', () => {
	activeImage += 1;
	if (activeImage > N) {
		activeImage = 1;
	}
	displayImage();
});

prevBtn.addEventListener('click', () => {
	activeImage -= 1;
	if (activeImage <= 0) {
		activeImage = N;
	}
	displayImage();
});
