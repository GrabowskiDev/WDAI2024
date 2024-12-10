import { useState } from 'react';
import Dodawanie from './Dodawanie';

function Studenci() {
	interface Student {
		imie: string;
		nazwisko: string;
		rocznik: number;
	}

	const [students, setStudents] = useState<Student[]>([
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
	]);

	const dodajStudenta = (student: Student) => {
		setStudents(prev => [...prev, student]);
	};

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Imię</th>
						<th>Nazwisko</th>
						<th>Rocznik</th>
					</tr>
				</thead>
				<tbody>
					{students.map(student => (
						<tr>
							<td>{student.imie}</td>
							<td>{student.nazwisko}</td>
							<td>{student.rocznik}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Dodawanie onClick={dodajStudenta} />
		</>
	);
}

export default Studenci;
