const ShippingService = require('../services/shippingService')
const Order = require('../models/Order')

const createShipment = async (req, res) => {
  try {
    const { orderId } = req.params
    const order = await Order.findById(orderId).populate('user')

    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' })
    }

    const shipmentResult = await ShippingService.createShipment({
      orderNumber: order.orderNumber,
      user: order.user,
      shipping: order.shipping
    })

    order.shipping.trackingNumber = shipmentResult.trackingNumber
    order.shipping.carrier = 'UPS'
    order.shipping.status = 'processing'
    await order.save()

    res.json(shipmentResult)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const trackShipment = async (req, res) => {
  try {
    const { trackingNumber } = req.params
    const trackingInfo = await ShippingService.trackShipment(trackingNumber)
    res.json(trackingInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createShipment,
  trackShipment
} 