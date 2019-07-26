import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Search from './components/Search'
import AddPersonForm from './components/AddPersonForm'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const [notification, setNotification] = useState(null)

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

    const nameToBeDeleted = persons.find(p => p.id === id).name
    const message = `Do you want to delete ${nameToBeDeleted}?`
    const result = window.confirm(message)

    if (result === true) {
      personsService
        .deletePerson(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
        .catch(error => {
          setNotification(
            {
              text: `${nameToBeDeleted} was already deleted from the server`,
              type: 'error'
            },
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })

        setNotification(
          {
            text: `A record for ${nameToBeDeleted} was deleted`,
            type: 'notification'
          }
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000
        )
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
        .then(() => {
          setNotification(
            {
              text: `${newName} is added`,
              type: 'notification'
            }
          )
    
          setTimeout(() => {
            setNotification(null)
          }, 5000
          )
        })
        .catch(error => {
          console.log(error.response.data)
          setNotification(
            {
              text: `${error.response.data.error}`,
              type: 'error'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000
          )
        })
    }
    else if (persons.find(p => p.name === newName).number !== newNumber) {
      var message = `${newName} is already in the list, do you want to update the number?`
      var result = window.confirm(message)
      if (result === true) {
        const person = persons.find(p => p.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        const id = persons.find(p => p.name === newName).id
        personsService
          .updateNumber(id, updatedPerson)
          .then(ret => {
            setPersons(persons.map(person => person.id !== id ? person : ret))
          })
          .catch(error => {
            setNotification(
              {
                text: `${newName} was already deleted from the server`,
                type: 'error'
              },
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })

        setNotification(
          {
            text: `A number for ${newName} is updated to ${newNumber}`,
            type: 'notification'
          }
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000
        )
      }
    } else {
      message = `${newName} is already in the list`;
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

      <Notification notification={notification} />

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