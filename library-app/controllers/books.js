const { book, author } = require('../db')
const { validationResult } = require('express-validator')

const checkAuthors = async (authors) => {
  const unregisteredAuthors = []
  const registeredAuthors = []

  for (let i = 0; i < authors.length; i++) {
    const requestedAuthor = await author.find(authors[i].firstname, authors[i].lastname)
    if (!requestedAuthor) {
      unregisteredAuthors.push(authors[i])
    } else {
      registeredAuthors.push(requestedAuthor)
    }
  }
  return { unregisteredAuthors, registeredAuthors }
}

module.exports.getAvailable = async (req, res) => {
  const books = await book.getAvailable()
  return res.json({ books })
}

module.exports.add = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }
  const { published, title, authors } = req.body
  const match = await book.check(published, title)

  if (match) {
    const updateBookStock = await book.updateStock(published, title)
    return res.json(updateBookStock)
  }

  // authors
  const authorsBuffer = await checkAuthors(authors)
  if (authorsBuffer.unregisteredAuthors.length > 0) {
    return res.json({ error: 'No such authors', authors: authorsBuffer.unregisteredAuthors })
  }

  const addedBook = await book.add(published, title)
  await book.linkBookWithAuthors(addedBook.id, authorsBuffer.registeredAuthors)

  return res.json({ addedBook })
}