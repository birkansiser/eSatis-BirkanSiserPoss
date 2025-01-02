import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material'
import api from '../services/api'

function Payment() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderDetails, setOrderDetails] = useState(null)
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: '',
    cardNumber: '',
    expireMonth: '',
    expireYear: '',
    cvc: ''
  })

  useEffect(() => {
    fetchOrderDetails()
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/orders/${orderId}`)
      
  
      console.log('Order details:', response.data)
      
      if (!response.data) {
        throw new Error('Sipariş bulunamadı')
      }

      if (response.data.payment?.status === 'completed') {
        navigate('/orders')
        return
      }

      setOrderDetails(response.data)
    } catch (error) {
      console.error('Sipariş detayları hatası:', error)
      setError(error.response?.data?.message || 'Sipariş detayları yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
    
      console.log('Sending payment request:', {
        orderId,
        cardDetails
      })

      const response = await api.post('/api/payments/create', {
        orderId,
        cardDetails: {
          ...cardDetails,
          cardNumber: cardDetails.cardNumber.replace(/\s/g, '')
        }
      })

      console.log('Payment response:', response.data)

      if (response.data.status === 'success') {
        navigate('/orders?payment=success')
      } else {
        setError(response.data.message || 'Ödeme işlemi başarısız')
      }
    } catch (error) {
      console.error('Ödeme hatası:', error)
      setError(
        error.response?.data?.message || 
        error.message || 
        'Ödeme işlemi sırasında bir hata oluştu'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!orderDetails) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Ödeme Yap
        </Typography>

       
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Sipariş Özeti
          </Typography>
          <Typography>
            Sipariş No: {orderDetails.orderNumber}
          </Typography>
          <Typography>
            Toplam Tutar: {orderDetails.price.total} TL
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

     
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {error && (
              <Alert severity="error">{error}</Alert>
            )}
            
            <TextField
              fullWidth
              label="Kart Üzerindeki İsim"
              value={cardDetails.cardHolderName}
              onChange={(e) => setCardDetails({
                ...cardDetails,
                cardHolderName: e.target.value
              })}
              required
            />
            
            <TextField
              fullWidth
              label="Kart Numarası"
              value={cardDetails.cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '')
                if (value.length <= 16) {
                  setCardDetails({
                    ...cardDetails,
                    cardNumber: value
                  })
                }
              }}
              required
              inputProps={{ maxLength: 16 }}
            />
            
            <Stack direction="row" spacing={2}>
              <TextField
                label="Ay"
                value={cardDetails.expireMonth}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  if (parseInt(value) <= 12) {
                    setCardDetails({
                      ...cardDetails,
                      expireMonth: value
                    })
                  }
                }}
                required
                inputProps={{ maxLength: 2 }}
              />
              
              <TextField
                label="Yıl"
                value={cardDetails.expireYear}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  setCardDetails({
                    ...cardDetails,
                    expireYear: value
                  })
                }}
                required
                inputProps={{ maxLength: 4 }}
              />
              
              <TextField
                label="CVC"
                value={cardDetails.cvc}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  if (value.length <= 3) {
                    setCardDetails({
                      ...cardDetails,
                      cvc: value
                    })
                  }
                }}
                required
                inputProps={{ maxLength: 3 }}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Ödemeyi Tamamla'}
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Test Kartı Bilgileri:
          </Typography>
          <Typography variant="body2">
            Kart No: 5528790000000008
          </Typography>
          <Typography variant="body2">
            SKT: 12/2030
          </Typography>
          <Typography variant="body2">
            CVC: 123
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Payment 