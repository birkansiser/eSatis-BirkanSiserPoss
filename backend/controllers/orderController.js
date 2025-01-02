const Order = require('../models/Order')

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    console.error('Siparişleri getirme hatası:', error)
    res.status(500).json({ message: 'Siparişler getirilemedi' })
  }
}

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    })
    
    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' })
    }
    
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: 'Sipariş detayları getirilemedi' })
  }
}

const createOrder = async (req, res) => {
  try {
    const { serviceType, pcbSpecs, price } = req.body

    const order = new Order({
      user: req.user._id,
      orderNumber: `PCB${Date.now()}`,
      serviceType,
      pcbSpecs,
      price,
      status: 'pending',
      payment: {
        status: 'pending'
      }
    })

    await order.save()
    res.status(201).json(order)
  } catch (error) {
    console.error('Sipariş oluşturma hatası:', error)
    res.status(500).json({ message: error.message })
  }
}

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params
    const { reason } = req.body || { reason: 'Müşteri tarafından iptal edildi' }

    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id,
      status: { $nin: ['cancelled', 'delivered'] }
    })

    if (!order) {
      return res.status(404).json({ 
        message: 'Sipariş bulunamadı veya iptal edilemez durumda' 
      })
    }

    order.status = 'cancelled'
    order.statusHistory.push({
      status: 'cancelled',
      note: reason,
      date: new Date()
    })

    if (order.payment) {
      order.payment.status = 'cancelled'
    }

    await order.save()

    res.json({
      message: 'Sipariş başarıyla iptal edildi',
      order
    })
  } catch (error) {
    console.error('Sipariş iptal hatası:', error)
    res.status(500).json({ 
      message: 'Sipariş iptal edilemedi' 
    })
  }
}

const createCustomOrder = async (req, res) => {
  try {
    console.log('Gelen sipariş verisi:', req.body)

    const { 
      serviceType, 
      orderType,
      customSpecs,
      price 
    } = req.body


    if (!serviceType) {
      throw new Error('Hizmet tipi gereklidir')
    }

    if (!customSpecs?.designFile) {
      throw new Error('Tasarım dosyası gereklidir')
    }

    const order = new Order({
      user: req.user._id,
      orderNumber: `CUSTOM${Date.now()}`,
      orderType: orderType || 'custom',
      serviceType,
      customSpecs,
      price,
      status: 'pending',
      statusHistory: [{
        status: 'pending',
        note: 'Sipariş oluşturuldu',
        date: new Date()
      }],
      payment: {
        status: 'pending'
      }
    })

    console.log('Oluşturulan sipariş:', order.toObject())

    await order.save()
    console.log('Sipariş kaydedildi')

    res.status(201).json(order)
  } catch (error) {
    console.error('Özel sipariş oluşturma hatası:', {
      message: error.message,
      stack: error.stack
    })
    res.status(500).json({ 
      message: error.message || 'Özel sipariş oluşturulurken bir hata oluştu',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}


const getCustomOrders = async (req, res) => {
  try {
    const orders = await Order.find({ orderType: 'custom' })
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Siparişler getirilemedi' })
  }
}

const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' })
    }

    order.status = 'accepted'
    order.statusHistory.push({
      status: 'accepted',
      note: 'Sipariş onaylandı',
      date: new Date()
    })

    await order.save()
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: 'Sipariş onaylanamadı' })
  }
}


const rejectOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' })
    }

    order.status = 'rejected'
    order.statusHistory.push({
      status: 'rejected',
      note: 'Sipariş reddedildi',
      date: new Date()
    })

    await order.save()
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: 'Sipariş reddedilemedi' })
  }
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  createCustomOrder,
  getCustomOrders,
  acceptOrder,
  rejectOrder
} 