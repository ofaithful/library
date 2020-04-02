const client = require('./client')
const author = require('./author')
const book = require('./book')
const borrowings = require('./borrowings')

const admin = {
  name: process.env.ADMIN_NAME || 'admin',
  username: 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin'
}

const checkAdmin = async (username) => {
  return await client.check(username)
}

(async () => {
  const isAdminExists = await checkAdmin(admin.username)
  if (!isAdminExists) {
    client.create(admin, true)
  }
})()

module.exports = {
  client,
  author,
  book,
  borrowings
}