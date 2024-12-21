import { useState } from 'react';
import './Komentarz.css';

function Komentarz(props: {
	id: number;
	body: string;
	postId: number;
	likes: number;
	user: { id: number; username: string; fullName: string };
}) {
	const [likes, setLikes] = useState(props.likes);

	function likeComment() {
		setLikes(likes + 1);
	}

	function dislikeComment() {
		setLikes(likes - 1);
	}

	return (
		<div className="comment">
			<div className="user">
				<div className="info">
					<p>Post ID: {props.postId}</p>
					<p>User ID: {props.user.id}</p>
				</div>
				<div className="info info-user">
					<p>{props.user.fullName}</p>
					<p>username: {props.user.username}</p>
				</div>
			</div>
			<p className="comment-body">{props.body}</p>
			<div className="likes-container">
				<p className="likes">Likes: {likes}</p>
				<button onClick={() => likeComment()}>Like</button>
				<button onClick={() => dislikeComment()}>Dislike</button>
			</div>
		</div>
	);
}

export default Komentarz;
