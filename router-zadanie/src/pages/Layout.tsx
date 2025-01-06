import './Layout.css';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<nav className="nav">
				<ul className="nav-list">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/blogs">Blog</Link>
					</li>
					<li>
						<Link to="/add">Dodaj</Link>
					</li>
				</ul>
			</nav>

			<main className="main">
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
