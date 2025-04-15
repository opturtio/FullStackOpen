const Persons = ({ personsToShow, deletePerson }) => {
	return (
		<ul>
			{personsToShow.map((person, idx) => (
				<li key={idx} data-personid={person.id}>
					{person.name} {person.number}
					<button onClick={() => deletePerson(person.id)}>delete</button>
				</li>
			))}
		</ul>
	)
}

export default Persons