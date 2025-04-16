require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return req.method === 'POST' && Object.keys(req.body).length ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const date = new Date()

let persons =
[
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-543543"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-34-234234"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6433122"
  }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(ppl => {
        response.json(ppl)
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons/', (request, response) => {
  const body = request.body
  console.log(body.name)

  if (!body.content) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  if (persons.some(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(p => { response.json(p) })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const ppl = Object.keys(persons).length
  response.send(
    `<p>Phonebook has info for ${ppl} people</p>
    <p>${date}</p>`
  )
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})