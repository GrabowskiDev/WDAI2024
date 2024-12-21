import { useEffect, useState } from 'react';
import Komentarz from './Komentarz';

function Komentarze() {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		fetch('https://dummyjson.com/comments')
			.then(response => response.json())
			.then(data => setComments(data.comments || []));
	}, []);

	return (
		<>
			<h1>Comments</h1>
			<div
				style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
			>
				{comments.map((comment: any) => (
					<Komentarz
						key={comment.id}
						id={comment.id}
						body={comment.body}
						postId={comment.postId}
						likes={comment.likes}
						user={comment.user}
					/>
				))}
			</div>
		</>
	);
}

export default Komentarze;
