import React, { useState, useEffect } from 'react'
import personService from '../services/persons'

const Entry = ({ person }) => {
  return(
    <p>{person.name} {person.number}</p>
  )
}

const Form = (props) => {
  return(
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, handleDelete }) => {

  return(
    persons.map(p => 
      <div key={p.id}>
        <Entry person={p} />
        <button onClick={() => handleDelete(p.id)}>delete</button>
      </div>
    )
  )
}

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if(message === null) {
    return null
  }

  return(
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()

    const exists = persons.map(p => p.name).indexOf(newName) >= 0
    if(exists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setAddedMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    const name = persons.find(p => p.id === id).name
    if(window.confirm(`Delete ${name} ?`)) {
      personService
      .remove(id)
      .then(deletedPerson => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
      <Form 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={deletePerson} />
    </div>
  )
}

export default App