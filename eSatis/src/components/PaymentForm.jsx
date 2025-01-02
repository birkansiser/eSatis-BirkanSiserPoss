import { useState } from 'react'
import { TextField, Button, Stack, Alert } from '@mui/material'
import api from '../services/api'

function PaymentForm({ orderId, onSuccess }) {
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: '',
    cardNumber: '',
    expireMonth: '',
    expireYear: '',
    cvc: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/api/payments/create', {
        orderId,
        cardDetails
      })

      if (response.data.status === 'success') {
        onSuccess(response.data)
      } else {
        setError(response.data.errorMessage)
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Ödeme işlemi başarısız')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
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
          onChange={(e) => setCardDetails({
            ...cardDetails,
            cardNumber: e.target.value.replace(/\s/g, '')
          })}
          required
        />
        <TextField
          fullWidth
          label="Ay"
          value={cardDetails.expireMonth}
          onChange={(e) => setCardDetails({
            ...cardDetails,
            expireMonth: e.target.value
          })}
          required
        />
        <TextField
          fullWidth
          label="Yıl"
          value={cardDetails.expireYear}
          onChange={(e) => setCardDetails({
            ...cardDetails,
            expireYear: e.target.value
          })}
          required
        />
        <TextField
          fullWidth
          label="CVC"
          value={cardDetails.cvc}
          onChange={(e) => setCardDetails({
            ...cardDetails,
            cvc: e.target.value
          })}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
        >
          Ödemeyi Tamamla
        </Button>
      </Stack>
    </form>
  )
}

export default PaymentForm 