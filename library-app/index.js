require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mountRoutes = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
mountRoutes(app)

app.set('views', path.join(__dirname, 'views'))

// set public folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})