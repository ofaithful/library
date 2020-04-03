const db = require('./database')
const { hash } = require('../utils/hash')

module.exports.find = async (username) => {
  try {
    const { rows } = await db.query(`
      SELECT * FROM clients WHERE clients.username = $1`,
      [username]
    )
    return rows[0]
  } catch (err) {
    console.log(err)
  }
}

module.exports.create = async (data, asAdmin) => {
  try {
    const { name, username, password, photo } = data
    const role = asAdmin ? 'admin' : 'client'
    const now = new Date()
    const hashedPassword = asAdmin ? await hash(password) : password

    const { rows } = await db.query(`
    INSERT INTO clients(name, username, password, registration_date, photo, role) VALUES
      ($1, $2, $3, $4, $5, $6) RETURNING client_id, name, username, registration_date, photo, role`,
      [name, username, hashedPassword, now, photo, role]
    )
    return rows[0]
  } catch(err) {
    console.log(err)
  }
}

module.exports.check = async (username) => {
  try {
    const { rows } = await db.query('SELECT * FROM clients WHERE clients.username = $1',
      [ username ]
    )
    return rows.length > 0
  } catch(err) {
    console.log(err)
  }
}