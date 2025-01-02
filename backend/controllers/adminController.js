const User = require('../models/User')
const Order = require('../models/Order')
const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')

const getStats = async (req, res) => {
  try {
 
    const totalUsers = await User.countDocuments({ role: 'user' })


    const orders = await Order.find()
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 })


    const totalRevenue = orders.reduce((total, order) => {
      if (order.status === 'completed' && order.payment?.status === 'completed') {
        return total + (order.price?.total || 0)
      }
      return total
    }, 0)

  
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const ordersLast24h = orders.filter(order => 
      new Date(order.createdAt) > last24Hours
    ).length


    const orderStats = {
      pending: orders.filter(order => order.status === 'pending').length,
      processing: orders.filter(order => order.status === 'processing').length,
      completed: orders.filter(order => order.status === 'completed').length,
      cancelled: orders.filter(order => order.status === 'cancelled').length
    }


    const recentOrders = orders.slice(0, 10)

    res.json({
      totalRevenue,
      totalOrders: orders.length,
      totalUsers,
      recentOrders,
      orderStats,
      ordersLast24h
    })

  } catch (error) {
    console.error('Stats Error:', error)
    res.status(500).json({ message: 'İstatistikler alınırken bir hata oluştu' })
  }
}

const getSupportMessages = async (req, res) => {
  try {
    console.log('Destek mesajları getiriliyor...') 
    const messages = await Contact.find().sort({ createdAt: -1 })
    console.log('Bulunan mesajlar:', messages) 
    res.json(messages)
  } catch (error) {
    console.error('Destek mesajları hatası:', error) 
    res.status(500).json({ message: error.message })
  }
}

const replySupportMessage = async (req, res) => {
  try {
    const { messageId } = req.params
    const { replyText } = req.body

    console.log('Yanıt gönderiliyor...', { messageId, replyText }) 

    const message = await Contact.findById(messageId)
    if (!message) {
      return res.status(404).json({ message: 'Mesaj bulunamadı' })
    }

    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: message.email,
      subject: `Re: ${message.subject}`,
      html: `
        <p>Sayın ${message.name},</p>
        <p>${replyText}</p>
        <br>
        <p>Saygılarımızla,</p>
        <p>PCB Tasarım Ekibi</p>
      `
    })


    message.status = 'replied'
    message.reply = replyText
    message.repliedAt = new Date()
    await message.save()

    console.log('Yanıt başarıyla gönderildi')
    res.json({ message: 'Yanıt başarıyla gönderildi' })
  } catch (error) {
    console.error('Yanıt gönderme hatası:', error) 
    res.status(500).json({ message: error.message })
  }
}

const deleteSupportMessage = async (req, res) => {
  try {
    const { messageId } = req.params
    console.log('Mesaj siliniyor:', messageId) 
    
    const result = await Contact.findByIdAndDelete(messageId)
    if (!result) {
      return res.status(404).json({ message: 'Mesaj bulunamadı' })
    }

    console.log('Mesaj başarıyla silindi') 
    res.json({ message: 'Mesaj başarıyla silindi' })
  } catch (error) {
    console.error('Mesaj silme hatası:', error) 
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getStats,
  getSupportMessages,
  replySupportMessage,
  deleteSupportMessage
} 