const client = require('../db').client
const { compareWithHash } = require('../utils/hash')
const genToken = require('../utils/genToken')
const { validationResult } = require('express-validator')

module.exports.login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const { username, password } = req.body

  const user = await client.find(username)

  if (!user) {
    return res.json({ message: 'No such user' })
  }

  const match = await compareWithHash(password, user.password)

  if (!match) {
    return res.json({ message: 'Incorrect password' })
  }

  const token = await genToken(user)

  return res.json({ user, token })
}