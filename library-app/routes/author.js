const Router = require('express-promise-router')
const authors = require('../controllers').authors
const { check } = require('express-validator')
const router = new Router()
const secureRoute = require('../middleware/securedRoute')

module.exports = router

router.use(secureRoute)

// get all authors
router.get('/', async (req, res) => {
  authors.getAll(req, res)
})

// add author
router.post('/', [
  check('firstname').isLength({ min: 2 }).withMessage('must be at least 2 chars long'),
  check('lastname').isLength({ min: 2 }).withMessage('must be at least 2 chars long')
], async (req, res) => {
  authors.add(req, res)
})