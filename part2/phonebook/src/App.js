import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Search from './components/Search'
import AddPersonForm from './components/AddPersonForm'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')

  const [showAll, setShowAll] = useState(true)

  const filteredPersons = showAll
    ? persons
    : persons.filter(name => name.name.toLowerCase().includes(searchItem.toLowerCase()))

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const deleteButton = id => {

    const message = `Do you want to delete ${persons.find(p => p.id === id).name}?`
    const result = window.confirm(message)

    if (result === true) {
      personsService
      .deletePerson(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.map(name => name.name).includes(newName)) {
      personsService
        .create(personObject)
        .then(updatedPersons => {
          setPersons(persons.concat(updatedPersons))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      var message = `${newName} is already in the list`;
      window.alert(message);
    }
  }

  const handleSearch = (event) => {
    setSearchItem(event.target.value)
  }

  const applyFilter = (event) => {
    event.preventDefault()
  }

  const rows = () => filteredPersons.map(person =>
    <Person
      key={person.id}
      person={person}
      deleteButton={(() => deleteButton(person.id))}
    />
  )


  return (
    <div>
      <Search
        applyFilter={applyFilter}
        handleSearch={handleSearch}
        showAll={showAll}
        setShowAll={setShowAll}
      />

      <AddPersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <div>
        <h2>Numbers</h2>
        <ul>
          {rows()}
        </ul>
      </div>

    </div>
  )
}

export default App