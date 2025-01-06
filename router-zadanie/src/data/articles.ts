import { ArticleInterface } from '../interfaces/ArticleInterface';

const LOCAL_STORAGE_KEY = 'articles';

const loadArticles = (): ArticleInterface[] => {
	const storedArticles = localStorage.getItem(LOCAL_STORAGE_KEY);
	const firstArticle: ArticleInterface = {
		id: 1,
		title: 'Lorem Ipsum',
		content:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
	};
	return storedArticles ? JSON.parse(storedArticles) : [firstArticle];
};

const saveArticles = (articles: ArticleInterface[]) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
};

const articles: ArticleInterface[] = loadArticles();

function addArticle(title: string, content: string) {
	const newId =
		articles.length > 0 ? articles[articles.length - 1].id + 1 : 1;
	const newArticle: ArticleInterface = { id: newId, title, content };
	articles.push(newArticle);
	saveArticles(articles);
}

export { articles, addArticle, loadArticles, saveArticles };
export default articles;
