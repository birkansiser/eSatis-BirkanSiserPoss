const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const adminController = require('../controllers/adminController')
const orderController = require('../controllers/orderController')


router.get('/stats', auth, adminAuth, adminController.getStats)


router.get('/support-messages', auth, adminAuth, adminController.getSupportMessages)
router.post('/support-messages/:messageId/reply', auth, adminAuth, adminController.replySupportMessage)
router.delete('/support-messages/:messageId', auth, adminAuth, adminController.deleteSupportMessage)

router.get('/orders/custom', auth, adminAuth, orderController.getCustomOrders)


router.post('/orders/:orderId/accept', auth, adminAuth, orderController.acceptOrder)


router.post('/orders/:orderId/reject', auth, adminAuth, orderController.rejectOrder)

module.exports = router 