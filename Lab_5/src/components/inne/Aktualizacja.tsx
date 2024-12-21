import { useState } from 'react';

function Aktualizacja() {
	const [produkt, setProdukt] = useState({ nazwa: 'Pomidor', cena: 50 });

	const zmienCene = () => {
		setProdukt(prev => ({
			...prev,
			cena: 100,
		}));
	};

	return (
		<div>
			Aktualnie {produkt.nazwa} kosztuje {produkt.cena}
			<button onClick={zmienCene}>Zmień cenę</button>
		</div>
	);
}

export default Aktualizacja;
