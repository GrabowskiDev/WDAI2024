import { useState } from 'react';

function Licznik() {
	const [count, setCount] = useState(0);

	const increment = () => {
		setCount(count + 1);
	};

	return (
		<div>
			<h1>Licznik: {count}</h1>
			<button onClick={increment}>Dodaj</button>
		</div>
	);
}

export default Licznik;
