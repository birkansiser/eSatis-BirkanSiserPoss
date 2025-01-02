const User = require('../models/User')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
  try {
    console.log('Register isteği alındı:', req.body) 

    const { email } = req.body

  
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('Email zaten kayıtlı:', email) 
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanımda' })
    }

  
    const user = new User(req.body)
    console.log('Yeni kullanıcı oluşturuluyor:', user) 

    await user.save()
    console.log('Kullanıcı kaydedildi:', user._id)

  
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Register Error:', error)
    res.status(500).json({ 
      message: 'Kayıt işlemi başarısız',
      error: error.message 
    })
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body

   
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'E-posta veya şifre hatalı' })
    }

   
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'E-posta veya şifre hatalı' })
    }


    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ message: 'Giriş işlemi başarısız' })
  }
}

module.exports = {
  register,
  login
} 