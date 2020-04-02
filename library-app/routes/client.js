const Router = require('express-promise-router')
const { check, body } = require('express-validator')
const clients = require('../controllers').clients
const router = new Router()

module.exports = router

// add client
router.post('/', [
  check('name').isLength({ min: 2 }).withMessage('must be at least 2 chars long'),
  check('username').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
  check('password').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Your password and confirmation password do not match')
    }
    return true
  })
], async (req, res) => {
  clients.create(req, res)
})