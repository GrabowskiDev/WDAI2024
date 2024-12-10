import Produkt from './Produkt';

function NowyKoszyk() {
	const produkty = [
		'jabłko',
		'banan',
		'pomarańcza pomarańczowa',
		'Banan 2',
		'budyń w proszku',
	];

	return (
		<div style={{ backgroundColor: 'blue' }}>
			<h1>Nowy Koszyk</h1>
			{produkty.map(produkt => (
				<Produkt name={produkt} />
			))}
		</div>
	);
}

export default NowyKoszyk;
