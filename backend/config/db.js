const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB bağlantısı başarılı')
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error)
    process.exit(1)
  }
}

module.exports = { connectDB } 