const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const calculatorController = require('../controllers/calculatorController')

router.post('/', auth, calculatorController.calculatePrice)


router.post('/custom', auth, calculatorController.calculateCustomPrice)

module.exports = router 