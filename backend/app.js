const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err))


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const uploadsPath = path.join(__dirname, 'uploads')
app.use('/uploads', express.static(uploadsPath))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})


const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/orders')
const paymentRoutes = require('./routes/payments')
const uploadRoutes = require('./routes/upload')
const calculatorRoutes = require('./routes/calculator')
const contactRoutes = require('./routes/contact')
const userRoutes = require('./routes/users')

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/calculator', calculatorRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/users', userRoutes)

app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Dosya boyutu çok büyük (max: 10MB)' })
    }
    return res.status(400).json({ message: 'Dosya yükleme hatası' })
  }

  res.status(err.status || 500).json({
    message: err.message || 'Bir hata oluştu'
  })
})

module.exports = app 