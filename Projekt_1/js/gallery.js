const N = 84;
const gallery = document.querySelector('.gallery');

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

const items = document.querySelectorAll('.item');
items.forEach(item => {
	item.onclick = () => {
		console.log(item.id);
	};
});
