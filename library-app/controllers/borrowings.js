const { borrowings, book } = require('../db')

module.exports.getTakenBooks = async (req, res) => {
  const client_id = req.params.id
  try {
    const borrowedBooks = await borrowings.getBorrowedBooks(client_id)
    return res.json({ borrowedBooks })
  } catch (err) {
    console.log(err)
    return res.json({ error: err })
  }
}

module.exports.borrow = async (req, res) => {
  const { book_id, client_id } = req.body
  try {
    const borrowInfo = await borrowings.borrow(book_id, client_id)
    return res.json({ borrowDetails: borrowInfo })
  } catch (err) {
    console.log(err)
    return res.json({ error: err })
  }
}

module.exports.return = async (req, res) => {
  const { client_id, book_id } = req.body
  try {
    const status = await borrowings.return(client_id, book_id)
    const updatedBookStock = await book.increaseStockById(book_id)
    return res.json({ updatedBookStock })
  } catch (err) {
    console.log(err)
    return res.json({ error: err })
  }
}