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
  check('lastname').isLength({ min: 2 }).withMessage('must be at least 2 chars long'),
  check('date_of_birth')
    .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g).withMessage('invalid date')
], async (req, res) => {
  authors.add(req, res)
})