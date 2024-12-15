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
import Studenci from './components/studenci/Studenci';
import StudentManager from './components/studenci/StudentManager';
import Licznik2 from './components/efekty/Licznik2';
import Tytul from './components/efekty/Tytul';
import Odliczanie from './components/efekty/Odliczanie';
import Komentarz from './components/produkty/Komentarz';
import Komentarze from './components/produkty/Komentarze';
import Licznik8 from './components/liczniki/Licznik8';

function App() {
	let sampleUser = { id: 1, username: 'johndoe', fullName: 'John Doe' };

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
			<Studenci />
			<StudentManager />
			<Licznik2 />
			<Tytul />
			<Odliczanie />
			<Komentarz
				id={1}
				body="bardzo fajny komentarz"
				postId={2}
				likes={12}
				user={sampleUser}
			/>
			<Komentarze />
			<Licznik8 />
		</>
	);
}

export default App;
