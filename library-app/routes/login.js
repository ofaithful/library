const Router = require('express-promise-router')
const login = require('../controllers').login
const { check } = require('express-validator')
const router = new Router()

module.exports = router

router.post('/', [
  check('username').isLength({ min: 2 }).withMessage('must be at least 2 chars long'),
  check('password').isLength({ min: 4 }).withMessage('must be at least 2 chars long')
], async (req, res) => {
  login.login(req, res)
})