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
        UPDATE books SET stock = stock - 1 WHERE book_id = $1
        RETURNING book_id, stock`,
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
      UPDATE books SET stock = stock + 1
      WHERE lower(title) = lower($1) AND published = $2
      RETURNING book_id, stock`,
      [title, publish_date])
    return rows[0]
  } catch(err) {
    console.log(err)
  }
}

module.exports.increaseStockById = async (book_id) => {
  try {
    const { rows } = await db.query(`
      UPDATE books SET stock = stock + 1
      WHERE book_id = $1
      RETURNING book_id, stock`,
      [book_id])
    return rows[0]
  } catch(err) {
    console.log(err)
  }
}

module.exports.linkBookWithAuthors = async (book_id, authors) => {
  try {
    for (let item of authors) {
      await db.query(`INSERT INTO book_authors(book_id, author_id) VALUES
        ($1, $2)`,
        [book_id, item.author_id])
    }
    return true
  } catch(err) {
    console.log(err)
  }
}