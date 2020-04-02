const client = require('../db').client
const { hash } = require('../utils/hash')
const { validationResult } = require('express-validator')

module.exports.create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const { name, username, password, confirm_password } = req.body
  const match = await client.check(username)

  if (match) {
    return res.json({ status: 0, message: 'Username already exists' })
  }

  try {
    const hashedPassword = await hash(password)
    const newClient = await client.create({ name, username, password: hashedPassword })
    res.json({ client: newClient })
  } catch (err) {
    console.log(err)
    return res.json({ error: err })
  }
}