import { useState } from 'react';

function Dodawanie(props: {
	onClick: (student: {
		imie: string;
		nazwisko: string;
		rocznik: number;
	}) => void;
}) {
	const [imie, setImie] = useState('');
	const [nazwisko, setNazwisko] = useState('');
	const [rocznik, setRocznik] = useState<number | ''>('');

	const renderButton = () => {
		if (imie === '' || nazwisko === '' || rocznik === '') {
			return <button disabled>Dodaj</button>;
		} else {
			return (
				<button
					onClick={() => props.onClick({ imie, nazwisko, rocznik })}
				>
					Dodaj
				</button>
			);
		}
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Imię"
				value={imie}
				onChange={e => setImie(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Nazwisko"
				value={nazwisko}
				onChange={e => setNazwisko(e.target.value)}
			/>
			<input
				type="number"
				placeholder="Rocznik"
				value={rocznik}
				onChange={e => setRocznik(Number(e.target.value))}
			/>
			{renderButton()}
		</div>
	);
}

export default Dodawanie;
