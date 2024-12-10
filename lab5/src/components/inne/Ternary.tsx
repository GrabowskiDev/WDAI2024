import { useState } from 'react';

function Ternary() {
	const [a] = useState(true);
	const [b] = useState(false);
	return (
		<>
			{a ? (
				<div>Stwierdzenie a jest prawdziwe</div>
			) : (
				<div>Stwierdzenie a jest fałszywe</div>
			)}
			{b ? (
				<p>Stwierdzenie b jest prawdziwe</p>
			) : (
				<p>Stwierdzenie b jest fałszywe</p>
			)}
		</>
	);
}

export default Ternary;
