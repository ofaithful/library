const db = require('./database')

module.exports.find = async (firstname, lastname) => {
  try {
    const { rows } = await db.query(`
        SELECT * FROM authors WHERE lower(authors.firstname) = lower($1) AND lower(authors.lastname) = lower($2)`,
      [firstname, lastname])
    return rows[0]
  } catch(err) {
    console.log(err)
  }
}

module.exports.create = async (data) => {
  try {
    const { firstname, lastname, date_of_birth } = data
    const { rows } = await db.query(`
    INSERT INTO authors(firstname, lastname, date_of_birth) VALUES
      ($1, $2, $3) RETURNING author_id, firstname, lastname, date_of_birth`,
      [firstname, lastname, date_of_birth]
    )
    return rows[0]
  } catch(err) {
    console.log(err)
  }
}

module.exports.check = async (firstname, lastname) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM authors WHERE authors.firstname = $1 AND authors.lastname = $2',
      [firstname, lastname]
    )
    return rows.length > 0
  } catch(err) {
    console.log(err)
  }
}