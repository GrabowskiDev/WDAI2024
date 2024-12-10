import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Koszyk from './components/koszyk/Koszyk';
import NowyKoszyk from './components/koszyk/NowyKoszyk';
import Licznik from './components/liczniki/Licznik';
import NowyLicznik from './components/liczniki/NowyLicznik';
import Formularz from './components/formularze/Formularz';
import Haslo from './components/formularze/Haslo';
import Logowanie from './components/formularze/Logowanie';

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
		</>
	);
}

export default App;
