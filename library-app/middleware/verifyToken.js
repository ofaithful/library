const jwt = require('jsonwebtoken')

module.exports = async (token, secretKey) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded)
    })
  })
}