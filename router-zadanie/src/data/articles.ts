import { Article } from '../interfaces/Article';

const articles: Article[] = [
	{ id: 1, title: 'Article 1', content: 'Content of Article 1' },
	{ id: 2, title: 'Article 2', content: 'Content of Article 2' },
	// Add more articles as needed
];

function addArticle(article: Article) {
	articles.push(article);
}

export { articles, addArticle };
export default articles;
