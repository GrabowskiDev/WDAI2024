import { useState } from 'react';
import './App.css';
import Rectangle from './components/Rectangle';
import Circle from './components/Circle';
import Square from './components/Square';

function App() {
	const [shapes, setShapes] = useState(['square', 'circle', 'rectangle']);
	const [activeFilter, setActiveFilter] = useState('all');

	function removeShape(index: number) {
		setShapes(shapes.filter((_, i) => i !== index));
	}

	function addShape(shape: string) {
		setShapes([...shapes, shape]);
	}

	return (
		<main>
			<select
				value={activeFilter}
				onChange={e => setActiveFilter(e.target.value)}
			>
				<option value="all">All</option>
				<option value="square">Square</option>
				<option value="circle">Circle</option>
				<option value="rectangle">Rectangle</option>
			</select>

			<ul className="list">
				{shapes.map((shape, index) =>
					activeFilter === 'all' ||
					(shape === 'square' && activeFilter === 'square') ||
					(shape === 'circle' && activeFilter === 'circle') ||
					(shape === 'rectangle' && activeFilter === 'rectangle') ? (
						<li key={index} className="listItem">
							{shape === 'rectangle' &&
							(activeFilter === 'all' ||
								activeFilter === 'rectangle') ? (
								<Rectangle />
							) : null}
							{shape === 'circle' &&
							(activeFilter === 'all' ||
								activeFilter === 'circle') ? (
								<Circle />
							) : null}
							{shape === 'square' &&
							(activeFilter === 'all' ||
								activeFilter === 'square') ? (
								<Square />
							) : null}
							<button onClick={() => removeShape(index)}>
								Remove
							</button>
						</li>
					) : null
				)}
			</ul>
			<ul className="buttonsList">
				<button onClick={() => addShape('square')}>Add Square</button>
				<button onClick={() => addShape('circle')}>Add Circle</button>
				<button onClick={() => addShape('rectangle')}>
					Add Rectangle
				</button>
			</ul>
		</main>
	);
}

export default App;
