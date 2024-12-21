import { useState, useEffect } from 'react';

function Licznik8() {
	const [count, setCount] = useState(initialLoad());

	const increment = () => {
		setCount(count + 1);
	};

	function save() {
		localStorage.setItem('count', count.toString());
	}

	function initialLoad() {
		const value = localStorage.getItem('count');
		if (value !== null) {
			return parseInt(value, 10);
		}
		return 0;
	}

	useEffect(() => {
		save();
	}, [count]);

	return (
		<div>
			<h1>Licznik: {count}</h1>
			<button onClick={increment}>Dodaj</button>
		</div>
	);
}

export default Licznik8;
