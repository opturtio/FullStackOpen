const Persons = ({ personsToShow }) => {
	return (
		<ul>
			{personsToShow.map((person, idx) => (<li key={idx}>{person.name} {person.number}</li>))}
		</ul>
	)
}

export default Persons