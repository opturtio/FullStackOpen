const { info } = require('./logger')

const requestLogger = (req, _, next) => {
  info('Method:', req.method)
  info('Path:  ', req.path)
  info('Body:  ', req.body)
  info('---')
  next()
}

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
 requestLogger,
 unknownEndpoint,
 errorHandler
}