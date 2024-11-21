const displayBox = document.querySelector('.display');
const nameFilterInput = document.querySelector('#name-filter');
nameFilterInput.value = '';
const sortSelect = document.querySelector('#sort-select');

async function fetchProducts() {
	const response = await fetch('https://dummyjson.com/products?limit=0');
	const products = await response.json();
	return products;
}

fetchProducts().then(PRODUCTS => {
	displayProducts(PRODUCTS.products);

	sortSelect.addEventListener('change', () => display(PRODUCTS.products));
	nameFilterInput.addEventListener('change', () =>
		display(PRODUCTS.products)
	);
});

function display(PRODUCTS) {
	const sortSelect = document.querySelector('#sort-select');

	let val = sortSelect.value;
	let nameToFilter = nameFilterInput.value;

	let productsCopy = [];

	//Name filtering
	PRODUCTS.forEach(element => {
		if (element.title.toUpperCase().includes(nameToFilter.toUpperCase())) {
			productsCopy.push(element);
		}
	});

	//Order
	switch (val) {
		case 'asc':
			productsCopy.sort((a, b) => {
				const nameA = a.title.toUpperCase(); // ignore upper and lowercase
				const nameB = b.title.toUpperCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return 1;
				}
				if (nameA > nameB) {
					return -1;
				}
				return 0;
			});
			break;

		case 'desc':
			productsCopy.sort((a, b) => {
				const nameA = a.title.toUpperCase(); // ignore upper and lowercase
				const nameB = b.title.toUpperCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
			break;

		default:
			break;
	}

	// Displaying
	displayProducts(productsCopy);
}

function displayProducts(PRODUCTS) {
	displayBox.innerHTML = '';

	for (let i = 0; i < 30; i++) {
		const element = PRODUCTS[i];

		const product = document.createElement('div');
		product.classList.add('product');

		const img = document.createElement('img');
		img.src = element.thumbnail;
		img.alt = 'Product thumbnail';
		img.classList.add('product-img');

		const productContent = document.createElement('div');
		productContent.classList.add('product-content');

		const productName = document.createElement('h2');
		productName.classList.add('product-name');
		productName.textContent = element.title;

		const productDesc = document.createElement('p');
		productDesc.classList.add('product-desc');
		productDesc.textContent = element.description;

		productContent.appendChild(productName);
		productContent.appendChild(productDesc);
		product.appendChild(img);
		product.appendChild(productContent);
		displayBox.appendChild(product);
	}
}
