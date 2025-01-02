const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { createShipment, trackShipment } = require('../controllers/shippingController')

router.post('/:orderId', auth, createShipment)
router.get('/track/:trackingNumber', auth, trackShipment)

module.exports = router 