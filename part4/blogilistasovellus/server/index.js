const { info, error } = require('./utils/logger')
const { PORT, mongoUrl } = require('./utils/config')

const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})