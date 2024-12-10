import { useState } from 'react';
import './App.css';
import Koszyk from './components/koszyk/Koszyk';
import NowyKoszyk from './components/koszyk/NowyKoszyk';
import Licznik from './components/liczniki/Licznik';
import NowyLicznik from './components/liczniki/NowyLicznik';
import Formularz from './components/formularze/Formularz';
import Haslo from './components/formularze/Haslo';
import Logowanie from './components/formularze/Logowanie';
import Ternary from './components/inne/Ternary';
import Aktualizacja from './components/inne/Aktualizacja';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Koszyk />
			<NowyKoszyk />
			<Licznik />
			<NowyLicznik />
			<Formularz />
			<Haslo />
			<Logowanie />
			<Ternary />
			<Aktualizacja />
		</>
	);
}

export default App;
