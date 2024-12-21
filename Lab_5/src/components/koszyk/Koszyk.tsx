import Produkt from './Produkt';

function Koszyk() {
	return (
		<div style={{ backgroundColor: 'blue' }}>
			<h1>Koszyk</h1>
			<Produkt name="jabłko" />
			<Produkt name="banan" />
			<Produkt name="pomarańcza pomarańczowa" />
			<Produkt name="Banan 2" />
			<Produkt name="budyń w proszku" />
		</div>
	);
}

export default Koszyk;
