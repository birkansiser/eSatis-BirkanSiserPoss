const Iyzipay = require('iyzipay')

// İyzipay yapılandırması
const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.IYZICO_URI || 'https://sandbox-api.iyzipay.com'
})

const createPayment = async (paymentData) => {
  try {
    // Debug için
    console.log('Creating payment with data:', paymentData)

    // Alıcı adı ve soyadını kart üzerindeki isimden al
    const [firstName, ...lastNameParts] = paymentData.cardDetails.cardHolderName.trim().split(' ')
    const lastName = lastNameParts.join(' ')

    // İyzico istek yapısını oluştur
    const request = {
      locale: 'tr',
      conversationId: paymentData.orderNumber,
      price: paymentData.price.total.toString(),
      paidPrice: paymentData.price.total.toString(),
      currency: paymentData.price.currency,
      installment: '1',
      basketId: paymentData.orderNumber,
      paymentChannel: 'WEB',
      paymentGroup: 'PRODUCT',
      paymentCard: {
        cardHolderName: paymentData.cardDetails.cardHolderName,
        cardNumber: paymentData.cardDetails.cardNumber,
        expireMonth: paymentData.cardDetails.expireMonth,
        expireYear: paymentData.cardDetails.expireYear,
        cvc: paymentData.cardDetails.cvc,
        registerCard: '0'
      },
      buyer: {
        id: paymentData.user.id,
        name: firstName, // Kart sahibinin adı
        surname: lastName, // Kart sahibinin soyadı
        email: paymentData.user.email,
        identityNumber: '11111111111',
        registrationAddress: paymentData.user.address,
        ip: paymentData.ip,
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34000'
      },
      shippingAddress: {
        contactName: paymentData.cardDetails.cardHolderName, // Kart sahibinin tam adı
        city: 'Istanbul',
        country: 'Turkey',
        address: paymentData.user.address,
        zipCode: '34000'
      },
      billingAddress: {
        contactName: paymentData.cardDetails.cardHolderName, // Kart sahibinin tam adı
        city: 'Istanbul',
        country: 'Turkey',
        address: paymentData.user.address,
        zipCode: '34000'
      },
      basketItems: [
        {
          id: paymentData.orderNumber,
          name: `PCB Sipariş - ${paymentData.orderNumber}`,
          category1: 'PCB',
          itemType: 'PHYSICAL',
          price: paymentData.price.total.toString()
        }
      ]
    }

    // Debug için
    console.log('Iyzico request:', JSON.stringify(request, null, 2))

    return new Promise((resolve, reject) => {
      iyzipay.payment.create(request, (err, result) => {
        if (err) {
          console.error('Iyzico Error:', err)
          reject(err)
        } else {
          console.log('Iyzico Response:', result)
          
          if (result.status === 'success') {
            resolve({
              status: 'success',
              paymentId: result.paymentId
            })
          } else {
            resolve({
              status: 'error',
              errorMessage: result.errorMessage || 'Ödeme işlemi başarısız'
            })
          }
        }
      })
    })
  } catch (error) {
    console.error('Payment Service Error:', error)
    throw new Error(error.message || 'Ödeme işlemi sırasında bir hata oluştu')
  }
}

module.exports = {
  createPayment
} 