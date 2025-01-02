const Contact = require('../models/Contact')

const sendContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      status: 'new'
    })

    await contact.save()

  

    res.status(200).json({ 
      message: 'Mesajınız başarıyla gönderildi',
      contactId: contact._id 
    })

  } catch (error) {
    console.error('Contact Form Error:', error)
    res.status(500).json({ 
      message: 'Mesaj gönderilirken bir hata oluştu' 
    })
  }
}

module.exports = {
  sendContactForm
} 