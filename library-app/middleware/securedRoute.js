const getToken = require('../utils/getTokenFromHeader')
const verifyToken = require('./verifyToken')

const secretKey = process.env.PRIVATE_TOKEN_KEY || 'secret'

module.exports = async (req, res, next) => {
  const token = getToken(req)
  if (!token) {
    return res.sendStatus(401)
  }
  try {
    const data = await verifyToken(token, secretKey)
    next()
  } catch (err) {
    console.log(err)
    res.sendStatus(401)
  }
}