import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()                  // stop the page reload
    const nameExist = persons.some(person => person.name === newName)
    const numberExist = persons.some(person => person.number === newNumber)
    const invalidNumber = newNumber.match(/\d+/)
    if (nameExist) {
      alert(`"${newName}" is already added to phonebook`)
      return
    }
    if (numberExist) {
      alert(`"${newNumber}" is already added to phonebook`)
      return
    }
    if (!invalidNumber) {
      alert('Please enter a valid phone number')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject)) // NEW array → re-render
    setNewName('')
    setNewNumber('')                 // clear the input
  }
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName} number={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App