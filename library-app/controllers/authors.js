const author = require('../db').author
const { validationResult } = require('express-validator')

module.exports.getAll = async (req, res) => {
  const authors = await author.getAll()
  return res.json({ authors })
}

module.exports.add = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const { firstname, lastname, date_of_birth } = req.body
  const match = await author.check(firstname, lastname)

  if (match) {
    return res.json({ status: 0, message: 'Author already exists' })
  }

  try {
    const newAuthor = await author.create({ firstname, lastname, date_of_birth })
    res.json({ author: newAuthor })
  } catch (err) {
    console.log(err)
    return res.json({ error: err })
  }
}