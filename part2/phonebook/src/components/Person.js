import React from 'react'

const Person = ({ person, deleteButton }) => {

    return (

        <li>
            {person.name}: {person.number}
            <button onClick={deleteButton}>Delete</button>
        </li>


    )
}

export default Person