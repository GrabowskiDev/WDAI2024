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
						<Link to="/blogs">Blogs</Link>
					</li>
					<li>
						<Link to="/add">Add</Link>
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
