import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Add from './pages/Add';
import Article from './components/Article';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="blogs" element={<Blogs />} />
					<Route path="add" element={<Add />} />
					<Route path="article/:id" element={<Article />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
