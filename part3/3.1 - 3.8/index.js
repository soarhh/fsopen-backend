const express = require('express')
const morgan = require('morgan')
morgan.token('data', (req) => {
  if(req.method.toUpperCase() === 'POST') 
    return JSON.stringify(req.body)
})

const app = express()
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]



app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length}<br/><br/>${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body
  if(!name) return response.status(400).json({ error: 'name missing' })
  if(!number) return response.status(400).json({ error: 'number missing' })
  if(persons.some(p => p.name === name)) return response.status(400).json({ error: 'contact already exists' })
  const id = Math.floor(Math.random() * 10000)
  const person = { name, number, id }
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`)
})


