import React from 'react'

const Persons = ({ filteredPersons }) => {

    return (
        <div>
            <h2>Numbers</h2>
            {filteredPersons.map(person =>
                <li key={person.name}>{person.name}: {person.number}</li>
            )}
        </div>

    )
}

export default Persons