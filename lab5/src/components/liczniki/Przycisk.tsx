function Przycisk(props: { function: () => void }) {
	return <button onClick={props.function}>Dodaj</button>;
}

export default Przycisk;
