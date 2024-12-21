import { useState } from 'react';
import Przycisk from './Przycisk';

function NowyLicznik() {
	const [count, setCount] = useState(0);

	const increment = () => {
		setCount(count + 1);
	};

	return (
		<div>
			<h1>Licznik: {count}</h1>
			<Przycisk function={increment} />
		</div>
	);
}

export default NowyLicznik;
