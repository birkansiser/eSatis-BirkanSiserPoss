const PaymentService = require('../services/paymentService')
const Order = require('../models/Order')

const createPayment = async (req, res) => {
  try {
    const { orderId, cardDetails } = req.body
    
    if (!orderId || !cardDetails) {
      return res.status(400).json({ 
        message: 'Eksik ödeme bilgileri' 
      })
    }

    console.log('Payment Request:', { orderId, cardDetails })


    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id,
      'payment.status': 'pending'
    }).populate('user')

    if (!order) {
      return res.status(404).json({ 
        message: 'Sipariş bulunamadı veya ödemesi tamamlanmış' 
      })
    }


    console.log('Found Order:', order)


    if (!validateCardDetails(cardDetails)) {
      return res.status(400).json({ 
        message: 'Geçersiz kart bilgileri' 
      })
    }


    const paymentData = {
      orderNumber: order.orderNumber,
      price: {
        total: order.price.total || 0,
        currency: order.price.currency || 'TRY'
      },
      cardDetails: {
        cardHolderName: cardDetails.cardHolderName,
        cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
        expireMonth: cardDetails.expireMonth.padStart(2, '0'),
        expireYear: cardDetails.expireYear.length === 2 ? `20${cardDetails.expireYear}` : cardDetails.expireYear,
        cvc: cardDetails.cvc
      },
      user: {
        id: order.user._id.toString(),
        firstName: order.user.firstName,
        lastName: order.user.lastName,
        email: order.user.email,
        address: order.user.address || 'Test Address'
      },
      ip: req.ip || '127.0.0.1'
    }

    console.log('Payment Data:', paymentData)

    const result = await PaymentService.createPayment(paymentData)

    if (result.status === 'success') {
      order.payment = {
        status: 'completed',
        transactionId: result.paymentId,
        paidAt: new Date()
      }
      order.status = 'processing'
      await order.save()

      res.json({
        status: 'success',
        message: 'Ödeme başarıyla tamamlandı',
        orderId: order._id
      })
    } else {
      res.status(400).json({
        status: 'error',
        message: result.errorMessage || 'Ödeme işlemi başarısız'
      })
    }
  } catch (error) {
    console.error('Payment Error:', error)
    res.status(500).json({ 
      status: 'error',
      message: error.message || 'Ödeme işlemi sırasında bir hata oluştu'
    })
  }
}


const validateCardDetails = (cardDetails) => {
  const { cardNumber, expireMonth, expireYear, cvc } = cardDetails


  if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
    return false
  }


  const month = parseInt(expireMonth)
  if (month < 1 || month > 12) {
    return false
  }

  const year = expireYear.length === 2 ? `20${expireYear}` : expireYear
  const currentYear = new Date().getFullYear()
  if (parseInt(year) < currentYear) {
    return false
  }


  if (!/^\d{3,4}$/.test(cvc)) {
    return false
  }

  return true
}

module.exports = {
  createPayment
} 