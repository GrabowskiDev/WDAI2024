import { useState } from 'react';

function Formularz() {
	const [text, setText] = useState('text');

	return (
		<div style={{ margin: '24px' }}>
			<input
				type="text"
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<div>{text}</div>
		</div>
	);
}

export default Formularz;
