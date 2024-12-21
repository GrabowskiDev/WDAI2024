import { useEffect, useState } from 'react';

function Tytul() {
	let [tytul, setTytul] = useState('React');

	useEffect(() => {
		document.title = tytul;
	}, [tytul]);

	return (
		<input
			type="text"
			value={tytul}
			onChange={e => setTytul(e.target.value)}
		/>
	);
}

export default Tytul;
