const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      throw new Error('Token bulunamadı')
    }


    console.log('Gelen token:', token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    

    console.log('Çözülen token:', decoded)


    const user = await User.findById(decoded.userId)
    if (!user) {
      throw new Error('Kullanıcı bulunamadı')
    }


    req.user = user
    next()
  } catch (error) {
    console.error('Auth Error:', {
      message: error.message,
      token: req.header('Authorization'),
      error
    })

    let message = 'Lütfen giriş yapın'
    if (error.name === 'JsonWebTokenError') {
      message = 'Geçersiz token'
    } else if (error.name === 'TokenExpiredError') {
      message = 'Oturum süresi doldu'
    }

    res.status(401).json({ message })
  }
}

module.exports = auth 