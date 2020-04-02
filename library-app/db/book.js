const db = require('./database')

module.exports.getAvailable = async () => {
  try {
    const { rows } = await db.query('SELECT * FROM books WHERE books.stock >= 1')
    return rows
  } catch(err) {
    console.log(err)
  }
}

module.exports.getAll = async () => {
  try {
    const { rows } = await db.query('SELECT * FROM books')
    return rows
  } catch(err) {
    console.log(err)
  }
}

module.exports.add = async (publish_date, title) => {
  try {
    const { rows } = await db.query(`INSERT INTO books(published, title) VALUES
    ($1, $2) RETURNING book_id, published, title`,
      [publish_date, title]
    )
    return rows[0]
  } catch (err) {
    console.log(err)
  }
}

module.exports.updateStock = async (book_id) => {
  try {
    const { rows } = await db.query(`
        UPDATE books SET books.stock = books.stock - 1 WHERE books.book_id = $1
        RETURNING books.book_id, books.stock`,
      [book_id])
    return rows[0]
  } catch(err) {
    console.log(err)
  }
}

module.exports.check = async (publish_date, title) => {
  try {
    const { rows } = await db.query(`
        SELECT * FROM books WHERE books.published = $1 AND lower(books.title) = lower($2)`,
      [ publish_date, title ])
    return rows.length > 0
  } catch(err) {
    console.log(err)
  }
}

module.exports.increaseStock = async (publish_date, title) => {
  try {
    const { rows } = await db.query(`
      UPDATE books SET books.stock = books.stock + 1
      WHERE lower(books.title) = lower($1) AND books.published = $2
      RETURNING books.book_id, books.stock`,
      [title, publish_date])
    return rows[0]
  } catch(err) {
    console.log(err)
  }
}

module.exports.linkBookWithAuthors = async (book_id, authors) => {
  try {
    for (let i = 0; i < authors.length; i++) {
      db.query(`INSERT INTO book_authors(book_id, author_id) VALUES
        ($1, $2)`,
        [book_id, authors[i].author_id])
    }
    return true
  } catch(err) {
    console.log(err)
  }
}