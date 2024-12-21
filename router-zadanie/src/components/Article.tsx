import { useParams } from 'react-router-dom';
import articles from '../data/articles';

interface Params extends Record<string, string | undefined> {
	id: string;
}

function Article() {
	const { id } = useParams<Params>();
	const article = articles.find(article => article.id === Number(id));

	if (!article) {
		return <h2>Article with id {id} not found</h2>;
	}

	return (
		<div>
			<h2>{article.title}</h2>
			<p>Article number {id}</p>
			<p>{article.content}</p>
		</div>
	);
}

export default Article;
