import { addArticle } from '../data/articles';

function Add() {
	return (
		<div>
			<h1>Add</h1>
			<button
				onClick={() => {
					addArticle({
						id: 3,
						title: 'Article 3',
						content: 'Content of Article 3',
					});
				}}
			/>
		</div>
	);
}

export default Add;
