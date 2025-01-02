const express = require('express')
const router = express.Router()
const { uploadGerber, upload } = require('../controllers/uploadController')
const auth = require('../middleware/auth')


router.post('/gerber', auth, upload.single('file'), uploadGerber)

module.exports = router 