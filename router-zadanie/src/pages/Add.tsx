import { useNavigate } from 'react-router-dom';
import { addArticle } from '../data/articles';
import { useState } from 'react';

function Add() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const navigate = useNavigate();

	return (
		<div>
			<h1>Add</h1>
			<input
				type="text"
				value={title}
				onChange={event => {
					setTitle(event.target.value);
				}}
			/>
			<input
				type="text"
				value={content}
				onChange={event => {
					setContent(event.target.value);
				}}
			/>

			<button
				onClick={() => {
					addArticle(title, content);
					navigate('/blogs');
				}}
			>
				Add Article
			</button>
		</div>
	);
}

export default Add;
