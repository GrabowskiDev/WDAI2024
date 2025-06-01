import { useParams } from 'react-router-dom';
import articles from '../data/articles';
import { CSSProperties } from 'react';

interface Params extends Record<string, string | undefined> {
	id: string;
}

function Article() {
	const { id } = useParams<Params>();
	const article = articles.find(article => article.id === Number(id));

	if (!article) {
		return <h2>Article with id {id} not found</h2>;
	}

	const articleStyle: CSSProperties = {
		backgroundColor: '#444',
		width: '500px',
		padding: '20px',
		margin: '20px auto',
		borderRadius: '10px',
		overflowWrap: 'break-word',
	};

	const headerStyle: CSSProperties = {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '20px',
	};

	const contentStyle: CSSProperties = {
		textAlign: 'left',
	};

	return (
		<div style={articleStyle}>
			<div style={headerStyle}>
				<h2>{article.title}</h2>
				<p>ID:{id}</p>
			</div>
			<p style={contentStyle}>{article.content}</p>
		</div>
	);
}

export default Article;
