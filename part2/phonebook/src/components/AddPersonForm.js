import React from 'react'

const AddPersonForm = (props) => {
    return (
        <div>
            <h2>Add a new record:</h2>
            <form onSubmit={props.addPerson}>
                <div>
                    name:
            <input
                        value={props.newName}
                        onChange={props.handleNameChange}
                    />
                </div>
                <div>
                    number:
            <input
                        value={props.newNumber}
                        onChange={props.handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddPersonForm