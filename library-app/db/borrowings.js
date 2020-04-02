const db = require('./database')
const book = require('./book')
const MAX_BORROWINGS = process.env.MAX_BORROWINGS || 5

const getActiveBorrowingsCount = async (client_id) => {
  try {
    const { rows } = await db.query('SELECT count(*) FROM borrowings WHERE borrowings.client_id = $1',
      [client_id])
    return rows[0]
  } catch(err) {
    console.log(err)
  }
}

module.exports.getBorrowedBooks = async (client_id) => {
  try {
    const { rows } = db.query(`
      SELECT * FROM books
      INNER JOIN borrowings ON borrowings.client_id = $1
      WHERE books.book_id = borrowings.book_id`,
      [client_id]
    )
    return rows
  } catch(err) {
    console.log(err)
  }
}

module.exports.borrow = async (book_id, client_id) => {
  const now = new Date()
  try {
    // refuse if client has more active borrowings than MAX_BORROWINGS
    const currentClientBorrowings = await getActiveBorrowingsCount(client_id)
    if (currentClientBorrowings >= MAX_BORROWINGS) {
      return { message: 'you can no longer borrow until you return the previous books' }
    }
    // insert to borrowings table
    const { rows } = await db.query(`
    INSERT INTO borrowings(borrow_date, book_id, client_id) VALUES
    ($1, $2, $3) RETURNING id, borrow_date, book_id, client_id`,
      [now, book_id, client_id])
    // update books table
    const updatedBookStock = await book.updateStock(book_id)
    return rows[0]
  } catch (err) {
    console.log(err)
  }
}

module.exports.return = async (id) => {
  try {
    const { rows } = await db.query(`DELETE FROM borrowings WHERE borroings.id = $1`, [id])
    return rows[0]
  } catch(err) {
    console.log(err)
  }
}