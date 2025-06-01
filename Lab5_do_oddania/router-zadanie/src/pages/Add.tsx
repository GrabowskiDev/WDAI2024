import './Add.css';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addArticle } from '../data/articles';

function Add() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		addArticle(title, content);
		navigate('/blogs');
	};

	return (
		<div>
			<h1>Dodaj własny artykuł!</h1>
			<form onSubmit={handleSubmit}>
				<div className="input-div">
					<label htmlFor="title">Tytuł:</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={event => setTitle(event.target.value)}
						className="add-input"
						required
					/>
				</div>
				<div className="input-div">
					<label htmlFor="content">Treść:</label>
					<textarea
						id="content"
						value={content}
						onChange={event => setContent(event.target.value)}
						className="add-input"
						required
					></textarea>
				</div>
				<button type="submit" className="add-button">
					Dodaj artykuł
				</button>
			</form>
		</div>
	);
}

export default Add;
