import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.find(p => p.name === newName) // fixed: find instead of some

    if (existing) {
      if (window.confirm(`${newName} is already added — replace the old number with a new one?`)) {
        const changedPerson = { ...existing, number: newNumber }   // copy, override number

        personService
          .update(existing.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existing.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessageType('success')
            setMessage(`Updated ${returnedPerson.name}'s number`)
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(() => {
            setMessageType('error')
            setMessage(`Information of ${existing.name} has already been removed from the server`)
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.filter(p => p.id !== existing.id))   // drop the dead entry
          })
      }
      return
    }

    const personObject = { name: newName, number: newNumber }   // no id — server adds it

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))                // add what server returned
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }
  // in App
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setMessageType('success')
        setMessage(`${name} has been deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName} number={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App