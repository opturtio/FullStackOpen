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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
  const body = request.body
  console.log(body.name)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  console.log(person.name)

  person.save()
    .then(p => { response.json(p) })
    .catch((error) => { console.log('error saving to MongoDB:', error.message) })
})

app.put('/api/persons/:id', (request, response) => {
  Person.findByIdAndUpdate(request.params.id, request.body)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.number = request.body.number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
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