import { useState } from 'react'
import {
  Container, Paper, Typography, Box, TextField,
  Button, Stepper, Step, StepLabel, Grid,
  CircularProgress, Alert
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function CustomOrder() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderData, setOrderData] = useState({
    serviceType: '',
    designFile: null,
    designNotes: '',
    calculatedSpecs: {},
    price: {
      total: 0,
      currency: 'TRY'
    }
  })

  const steps = ['Hizmet Seçimi', 'Tasarım Detayları', 'Fiyat Onayı']

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    setOrderData(prev => ({
      ...prev,
      designFile: file
    }))
  }

  const calculatePrice = () => {

    let basePrice = 100 

    const total = basePrice
    setOrderData(prev => ({
      ...prev,
      price: {
        total,
        currency: 'TRY'
      }
    }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError('')

      const formData = new FormData()
      formData.append('serviceType', orderData.serviceType)
      formData.append('designFile', orderData.designFile)
      formData.append('designNotes', orderData.designNotes)
      formData.append('calculatedSpecs', JSON.stringify(orderData.calculatedSpecs))
      formData.append('price', JSON.stringify(orderData.price))

      const response = await api.post('/api/orders/custom', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      navigate(`/payment/${response.data._id}`)
    } catch (error) {
      setError(error.response?.data?.message || 'Sipariş oluşturulamadı')
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Hizmet Seçimi
            </Typography>
       
          </Box>
        )
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tasarım Detayları
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                >
                  Tasarım Dosyası Yükle
                  <input
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="Tasarım Notları"
                  value={orderData.designNotes}
                  onChange={(e) => setOrderData(prev => ({
                    ...prev,
                    designNotes: e.target.value
                  }))}
                />
              </Grid>
            </Grid>
          </Box>
        )
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Fiyat Onayı
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              {orderData.price.total} TL
            </Typography>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Siparişi Onayla'}
            </Button>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Özel Sipariş Oluştur
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(prev => prev - 1)}
          >
            Geri
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (activeStep === steps.length - 1) {
                handleSubmit()
              } else {
                setActiveStep(prev => prev + 1)
              }
            }}
            disabled={loading}
          >
            {activeStep === steps.length - 1 ? 'Tamamla' : 'İleri'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default CustomOrder 