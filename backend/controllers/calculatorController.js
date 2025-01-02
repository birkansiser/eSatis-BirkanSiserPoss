const { calculatePCBPrice, calculateCustomOrderPrice } = require('../services/calculatorService')

const calculatePrice = async (req, res) => {
  try {
    const specs = req.body


    if (!specs.width || !specs.height) {
      return res.status(400).json({ 
        message: 'PCB boyutları gereklidir' 
      })
    }


    const priceDetails = calculatePCBPrice(specs)

    res.json({
      ...priceDetails,
      currency: 'TRY'
    })
  } catch (error) {
    console.error('Fiyat hesaplama hatası:', error)
    res.status(500).json({ 
      message: 'Fiyat hesaplanırken bir hata oluştu',
      error: error.message 
    })
  }
}


const calculateCustomPrice = async (req, res) => {
  try {
    const { 
      serviceType,
      fileId,
      fileSize,
      urgency = 'normal',
      pcbSpecs,
      notes 
    } = req.body

    console.log('Fiyat hesaplama isteği:', req.body)

    const priceDetails = calculateCustomOrderPrice({
      serviceType,
      fileSize,
      urgency,
      pcbSpecs,
      notes
    })

    console.log('Hesaplanan fiyat detayları:', priceDetails)

    res.json({
      ...priceDetails,
      currency: 'TRY'
    })
  } catch (error) {
    console.error('Fiyat hesaplama hatası:', error)
    res.status(500).json({ 
      message: 'Fiyat hesaplanırken bir hata oluştu',
      error: error.message 
    })
  }
}

module.exports = {
  calculatePrice,
  calculateCustomPrice
} 