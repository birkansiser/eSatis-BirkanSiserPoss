require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    const adminData = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'admin123',
      phone: '5555555555',
      address: 'Admin Address',
      role: 'admin'
    }

    const admin = new User(adminData)
    await admin.save()

    console.log('Admin hesabı oluşturuldu')
    process.exit(0)
  } catch (error) {
    console.error('Hata:', error)
    process.exit(1)
  }
}

createAdmin() 