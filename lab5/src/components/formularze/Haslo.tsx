import { useState } from 'react';

function Haslo() {
	const [haslo, setHaslo] = useState('');
	const [powtorzHaslo, setPowtorzHaslo] = useState('');

	const renderMessage = () => {
		if (haslo === '' && powtorzHaslo === '') {
			return <p>Proszę wprowadzić hasło</p>;
		} else if (haslo !== powtorzHaslo) {
			return <p>Hasła nie są zgodne</p>;
		}
	};

	return (
		<div style={{ margin: '24px' }}>
			<input
				type="text"
				placeholder="Hasło"
				value={haslo}
				onChange={e => setHaslo(e.target.value)}
			/>
			<br />
			<input
				type="text"
				placeholder="Powtórz hasło"
				value={powtorzHaslo}
				onChange={e => setPowtorzHaslo(e.target.value)}
			/>
			<div>{renderMessage()}</div>
		</div>
	);
}

export default Haslo;
