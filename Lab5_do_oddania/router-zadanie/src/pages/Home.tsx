import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<div>
			<h1>Witaj w domu (Home)</h1>
			<Link to="/blogs" className="link">
				Blogi
			</Link>
		</div>
	);
}

export default Home;
