import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Search from './components/Search'
import AddPersonForm from './components/AddPersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')

  const [showAll, setShowAll] = useState(true)

  const filteredPersons = showAll
  ? persons
  : persons.filter(name => name.name.toLowerCase().includes(searchItem.toLowerCase()))

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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

      <Persons 
        filteredPersons={filteredPersons}
      />
    </div>
  )
}

export default App