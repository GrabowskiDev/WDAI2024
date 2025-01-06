import './Blogs.css';
import { Link } from 'react-router-dom';
import articles from '../data/articles';

function Blogs() {
	return (
		<div>
			<h1 className="blog-h1">Blog</h1>
			<h2 className="blog-h2">Artykuły</h2>
			<ul className="blogs">
				{articles.map(article => (
					<li key={article.id}>
						<Link
							to={`/article/${article.id}`}
							state={{
								title: article.title,
								content: article.content,
							}}
						>
							{article.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Blogs;
