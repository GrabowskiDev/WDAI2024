import { Link } from 'react-router-dom';
import articles from '../data/articles';

function Blogs() {
	return (
		<div>
			<h1>Blogs</h1>
			<ul>
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
