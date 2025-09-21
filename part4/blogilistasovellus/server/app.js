const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(config.mongoUrl)

app.use(express.json())

app.use('/api/blog', blogRouter)

module.exports = app