import { useState, useEffect } from 'react';

function Odliczanie() {
	const [counter, setCounter] = useState(15.0);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (isActive && counter > 0) {
			const id = setInterval(() => {
				setCounter(Math.round((counter - 0.1) * 10) / 10);
			}, 100);
			return () => clearInterval(id);
		}
	}, [isActive, counter]);

	const renderButton = () => {
		if (counter <= 0) {
			return <button disabled>Odliczanie zakończone</button>;
		} else if (isActive === false) {
			return <button onClick={() => setIsActive(true)}>Start</button>;
		} else {
			return <button onClick={() => setIsActive(false)}>Stop</button>;
		}
	};

	return (
		<div>
			<h1>{counter.toFixed(1)}</h1>
			{renderButton()}
		</div>
	);
}

export default Odliczanie;
