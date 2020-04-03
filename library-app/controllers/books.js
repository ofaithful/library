const { book, author } = require('../db')
const { validationResult } = require('express-validator')

const checkAuthors = async (authors) => {
  const unregisteredAuthors = []
  const registeredAuthors = []

  for (let item of authors) {
    const requestedAuthor = await author.find(item.firstname, item.lastname)
    if (!requestedAuthor) {
      unregisteredAuthors.push(item)
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
    return res.json({ message: 'Book already exists' })
  }

  // authors
  const authorsBuffer = await checkAuthors(authors)

  if (authorsBuffer.unregisteredAuthors.length > 0) {
    return res.json({ error: 'No such authors', authors: authorsBuffer.unregisteredAuthors })
  }

  const addedBook = await book.add(published, title)
  await book.linkBookWithAuthors(addedBook.book_id, authorsBuffer.registeredAuthors)

  return res.json({ addedBook })
}