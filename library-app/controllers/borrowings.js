const borrowings = require('../db').borrowings

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
    const borrowInfo = borrowings.borrow(book_id, client_id)
    return res.json({ borrowDetails: borrowInfo })
  } catch (err) {
    console.log(err)
    return res.json({ error: err })
  }
}

module.exports.return = async (req, res) => {
  const id = req.params.id
  try {
    const status = borrowings.return(id)
    return res.json({ status })
  } catch (err) {
    console.log(err)
    return res.json({ error: err })
  }
}