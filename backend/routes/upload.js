const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const { handleFileUpload } = require('../controllers/uploadController')


router.post('/', auth, upload.single('file'), handleFileUpload)

module.exports = router 