const Router = require('express-promise-router')
const books = require('../controllers').books
const { check } = require('express-validator')
const router = new Router()
const secureRoute = require('../middleware/securedRoute')

module.exports = router

router.use(secureRoute)

// get all books
router.get('/', async (req, res) => {
  books.getAvailable(req, res)
})

// add book
router.post('/', [
  check('title').isLength({ min: 2 }).withMessage('must be at least 2 chars long'),
  check('published')
    .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g).withMessage('invalid publish date')
], async (req, res) => {
  books.add(req, res)
})