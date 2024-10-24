const header = document.querySelector('.header');
const navBtn = document.querySelector('.nav-button');

navBtn.addEventListener('click', () => {
	header.classList.toggle('nav-open');
});
