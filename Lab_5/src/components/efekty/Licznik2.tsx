import { useState, useEffect } from 'react';

function Licznik2() {
	const [count, setCount] = useState(0);

	const increment = () => {
		setCount(count + 1);
	};

	useEffect(() => {
		console.log('Hello world');
	}, []);

	useEffect(() => {
		console.log('Licznik: ' + count);
	}, [count]); // <- add the count variable here

	return (
		<div>
			<h1>Licznik: {count}</h1>
			<button onClick={increment}>Dodaj</button>
		</div>
	);
}

export default Licznik2;
