function Studenci() {
	interface Student {
		imie: string;
		nazwisko: string;
		rocznik: number;
	}

	const Students: Student[] = [
		{
			imie: 'Jan',
			nazwisko: 'Kowalski',
			rocznik: 1990,
		},
		{
			imie: 'Anna',
			nazwisko: 'Nowak',
			rocznik: 1995,
		},
		{
			imie: 'Piotr',
			nazwisko: 'Wiśniewski',
			rocznik: 2000,
		},
	];

	return (
		<table>
			<thead>
				<tr>
					<th>Imię</th>
					<th>Nazwisko</th>
					<th>Rocznik</th>
				</tr>
			</thead>
			<tbody>
				{Students.map(student => (
					<tr>
						<td>{student.imie}</td>
						<td>{student.nazwisko}</td>
						<td>{student.rocznik}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Studenci;
