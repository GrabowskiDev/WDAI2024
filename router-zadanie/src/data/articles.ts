import { ArticleInterface } from '../interfaces/ArticleInterface';

const LOCAL_STORAGE_KEY = 'articles';

const loadArticles = (): ArticleInterface[] => {
	const storedArticles = localStorage.getItem(LOCAL_STORAGE_KEY);
	return storedArticles ? JSON.parse(storedArticles) : [];
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
