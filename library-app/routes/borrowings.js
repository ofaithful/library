const Router = require('express-promise-router')
const borrowings = require('../controllers').borrowings
const router = new Router()
const secureRoute = require('../middleware/securedRoute')

module.exports = router

router.use(secureRoute)

// get borrowed books
router.get('/:id', async (req, res) => {
  borrowings.getTakenBooks(req, res)
})

// borrow a book
router.post('/', async (req, res) => {
  borrowings.borrow(req, res)
})

// return a book
router.delete('/:id', async (req, res) => {
  borrowings.return(req, res)
})