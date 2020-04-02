const books = require('./book')
const authors = require('./author')
const clients = require('./client')
const borrowings = require('./borrowings')
const login = require('./login')

module.exports = app => {
  app.use('/books', books)
  app.use('/authors', authors)
  app.use('/clients', clients)
  app.use('/borrowings', borrowings)
  app.use('/login', login)
}