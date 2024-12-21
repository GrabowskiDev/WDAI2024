import { useState } from 'react';

function Logowanie() {
	const [nazwaUzytkownika, setNazwaUzytkownika] = useState('');
	const [haslo, setHaslo] = useState('');
	const [powtorzHaslo, setPowtorzHaslo] = useState('');

	const renderButton = () => {
		if (nazwaUzytkownika === '' || haslo === '' || powtorzHaslo === '') {
			return <button disabled>Zaloguj</button>;
		} else if (haslo !== powtorzHaslo) {
			return (
				<button onClick={() => alert('Hasła nie są zgodne')}>
					Zaloguj
				</button>
			);
		} else {
			return (
				<button onClick={() => alert('Zalogowano pomyślnie')}>
					Zaloguj
				</button>
			);
		}
	};

	return (
		<div
			style={{
				margin: '24px',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
			}}
		>
			<input
				type="text"
				placeholder="Nazwa użytkownika"
				value={nazwaUzytkownika}
				onChange={e => setNazwaUzytkownika(e.target.value)}
			/>
			<br />
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
			<div>{renderButton()}</div>
		</div>
	);
}

export default Logowanie;
