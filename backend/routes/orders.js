const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

router.use(auth)

router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOrderById)
router.post('/', orderController.createOrder)


router.post('/custom', 
  upload.single('designFile'),
  orderController.createCustomOrder
)

router.post('/:orderId/cancel', orderController.cancelOrder)

module.exports = router 