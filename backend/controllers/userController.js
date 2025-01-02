const User = require('../models/User')
const Order = require('../models/Order')

const getProfile = async (req, res) => {
  try {
    const user = req.user


    const orders = await Order.find({ user: user._id })
    
    const stats = {
      orderCount: orders.length,
      activeOrderCount: orders.filter(order => 
        ['pending', 'processing', 'production'].includes(order.status)
      ).length,
      completedOrderCount: orders.filter(order => 
        order.status === 'delivered'
      ).length,
      totalSpent: orders
        .filter(order => order.status !== 'cancelled')
        .reduce((total, order) => total + (order.price?.total || 0), 0)
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      ...stats
    })
  } catch (error) {
    console.error('Profil getirme hatası:', error)
    res.status(500).json({ 
      message: 'Profil bilgileri getirilirken bir hata oluştu' 
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const updates = req.body
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'address']

    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key]
        return obj
      }, {})

    const user = await User.findByIdAndUpdate(
      req.user._id,
      filteredUpdates,
      { new: true, runValidators: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' })
    }


    const orders = await Order.find({ user: user._id })
    
    const stats = {
      orderCount: orders.length,
      activeOrderCount: orders.filter(order => 
        ['pending', 'processing', 'production'].includes(order.status)
      ).length,
      completedOrderCount: orders.filter(order => 
        order.status === 'delivered'
      ).length,
      totalSpent: orders
        .filter(order => order.status !== 'cancelled')
        .reduce((total, order) => total + (order.price?.total || 0), 0)
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      ...stats
    })
  } catch (error) {
    console.error('Profil güncelleme hatası:', error)
    res.status(400).json({ 
      message: 'Profil güncellenirken bir hata oluştu' 
    })
  }
}

module.exports = {
  getProfile,
  updateProfile
} 