const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_TOKEN_KEY || 'secret'

module.exports = async (user) => {
  return await new Promise((resolve, reject) => {
    jwt.sign({ user }, privateKey, { expiresIn: '6h' }, (err, sign) => {
      if (err) {
        reject(err)
      }
      resolve(sign)
    })
  })
}