const Router = require('express-promise-router')
const router = new Router()
const upload = require('../utils/fileUpload')

module.exports = router

router.post('/', async (req, res) => {
  upload(req, res, function(err) {
    if (err) {
      console.log(err)
      return res.json({ error: err })
    }
    return res.json({ filename: req.file.filename })
  })
})