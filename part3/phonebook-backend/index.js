const express = require('express')
const cors = require('cors') // 3.9: allow the frontend (different origin) to call us
const app = express()

app.use(express.json())
app.use(cors()) // 3.9: open the CORS door
app.use(express.static('dist')) // 3.11: serve the built React frontend from the backend

// in-memory data (resets on restart - fixed in Part 3c with a database)
let persons = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
]

// --- 3.1: all persons ---
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// --- 3.2: info page ---
app.get('/info', (request, response) => {
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

// --- 3.3: one person by id ---
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((p) => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// --- 3.4: delete a person ---
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((p) => p.id !== id)
    response.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 1000000)

// --- 3.5 + 3.6: create with validation ---
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }
    if (persons.find((p) => p.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    response.status(201).json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})