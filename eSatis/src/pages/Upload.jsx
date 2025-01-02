import { useState } from 'react'
import {
  Container, Paper, Typography, Box, Button,
  Stepper, Step, StepLabel, TextField,
  CircularProgress, Alert, Grid,
  Select, MenuItem, FormControl,
  InputLabel, Radio, RadioGroup,
  FormControlLabel, FormLabel
} from '@mui/material'
import { CloudUpload as UploadIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const serviceTypes = [
  { id: 'pcb_design', name: 'PCB Tasarım', price: 500 },
  { id: 'pcb_assembly', name: 'PCB Montaj', price: 1000 },
  { id: 'pcb_prototype', name: 'PCB Prototip', price: 750 },
  { id: 'full_service', name: 'Tam Hizmet', price: 2000 }
]

function Upload() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [file, setFile] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderData, setOrderData] = useState({
    serviceType: '',
    urgency: 'normal',
    notes: '',
    pcbSpecs: {
      layers: 2,
      size: { width: 0, height: 0 },
      quantity: 1
    }
  })
  const [calculatedPrice, setCalculatedPrice] = useState(null)

  const handleFileChange = async (event) => {
    try {
      const selectedFile = event.target.files[0]
      if (selectedFile) {
        setLoading(true)
        setError('')
        setFile(selectedFile)

       
        if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
          throw new Error('Dosya boyutu 10MB\'dan büyük olamaz')
        }

        
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'application/zip',
          'application/x-zip-compressed',
          'application/octet-stream'
        ]
        if (!allowedTypes.includes(selectedFile.type)) {
          throw new Error('Desteklenmeyen dosya formatı')
        }

        console.log('Yüklenecek dosya:', {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size
        })

        const formData = new FormData()
        formData.append('file', selectedFile)

        const response = await api.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log('Yükleme ilerlemesi:', percentCompleted)
          }
        })

        console.log('Upload response:', response.data)
        setUploadedFile(response.data)
        setActiveStep(1)
      }
    } catch (error) {
      console.error('Dosya yükleme hatası:', error)
      setError(error.response?.data?.message || error.message || 'Dosya yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleCalculatePrice = async () => {
    try {
      setLoading(true)
      setError('')

      const priceData = {
        serviceType: orderData.serviceType,
        fileId: uploadedFile.fileId,
        fileSize: uploadedFile.size,
        urgency: orderData.urgency,
        pcbSpecs: orderData.pcbSpecs,
        notes: orderData.notes
      }

      const response = await api.post('/api/calculator/custom', priceData)
      setCalculatedPrice(response.data)
      setActiveStep(2)
    } catch (error) {
      setError(error.response?.data?.message || 'Fiyat hesaplanırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCustomOrder = async () => {
    try {
      setLoading(true)
      setError('')

      if (!uploadedFile) {
        throw new Error('Lütfen önce dosya yükleyin')
      }

      if (!orderData.serviceType) {
        throw new Error('Lütfen hizmet tipini seçin')
      }

     
      const pcbSpecs = {
        layers: parseInt(orderData.pcbSpecs.layers),
        size: {
          width: parseFloat(orderData.pcbSpecs.size.width),
          height: parseFloat(orderData.pcbSpecs.size.height)
        },
        quantity: parseInt(orderData.pcbSpecs.quantity)
      }

      const orderPayload = {
        serviceType: orderData.serviceType,
        orderType: 'custom',
        designFile: uploadedFile.path,
        designNotes: orderData.notes,
        customSpecs: {
          designFile: uploadedFile.path,
          designNotes: orderData.notes,
          calculatedSpecs: {
            fileId: uploadedFile.fileId,
            fileType: uploadedFile.originalName.split('.').pop(),
            fileSize: uploadedFile.size,
            pcbSpecs: pcbSpecs,
            urgency: orderData.urgency || 'normal'
          }
        },
        price: {
          total: calculatedPrice.totalPrice,
          currency: 'TRY',
          details: {
            basePrice: calculatedPrice.basePrice,
            multipliers: calculatedPrice.multipliers
          }
        }
      }

      console.log('Gönderilen sipariş verisi:', orderPayload)

      const response = await api.post('/api/orders/custom', orderPayload)
      console.log('Sipariş response:', response.data)

      navigate(`/payment/${response.data._id}`)
    } catch (error) {
      console.error('Sipariş oluşturma hatası:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      })
      setError(
        error.response?.data?.message || 
        error.message || 
        'Sipariş oluşturulurken bir hata oluştu'
      )
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <input
              type="file"
              id="file-upload"
              hidden
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png"
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<UploadIcon />}
                size="large"
                disabled={loading}
              >
                {loading ? 'Yükleniyor...' : 'Tasarım Dosyası Seç'}
              </Button>
            </label>
          </Box>
        )

      case 1:
        return (
          <Box sx={{ py: 3 }}>
            <Typography gutterBottom>
              Yüklenen Dosya: {file?.name}
            </Typography>
            
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Hizmet Tipi</InputLabel>
              <Select
                value={orderData.serviceType}
                onChange={(e) => setOrderData(prev => ({
                  ...prev,
                  serviceType: e.target.value
                }))}
              >
                {serviceTypes.map(service => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name} - {service.price} TL'den başlayan
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel>Aciliyet Durumu</FormLabel>
              <RadioGroup
                value={orderData.urgency}
                onChange={(e) => setOrderData(prev => ({
                  ...prev,
                  urgency: e.target.value
                }))}
              >
                <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                <FormControlLabel value="medium" control={<Radio />} label="Orta Öncelik (+20%)" />
                <FormControlLabel value="high" control={<Radio />} label="Yüksek Öncelik (+50%)" />
              </RadioGroup>
            </FormControl>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  type="number"
                  label="Katman Sayısı"
                  fullWidth
                  value={orderData.pcbSpecs.layers}
                  onChange={(e) => setOrderData(prev => ({
                    ...prev,
                    pcbSpecs: {
                      ...prev.pcbSpecs,
                      layers: parseInt(e.target.value)
                    }
                  }))}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  type="number"
                  label="Genişlik (cm)"
                  fullWidth
                  value={orderData.pcbSpecs.size.width}
                  onChange={(e) => setOrderData(prev => ({
                    ...prev,
                    pcbSpecs: {
                      ...prev.pcbSpecs,
                      size: {
                        ...prev.pcbSpecs.size,
                        width: parseFloat(e.target.value)
                      }
                    }
                  }))}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  type="number"
                  label="Yükseklik (cm)"
                  fullWidth
                  value={orderData.pcbSpecs.size.height}
                  onChange={(e) => setOrderData(prev => ({
                    ...prev,
                    pcbSpecs: {
                      ...prev.pcbSpecs,
                      size: {
                        ...prev.pcbSpecs.size,
                        height: parseFloat(e.target.value)
                      }
                    }
                  }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Adet"
                  fullWidth
                  value={orderData.pcbSpecs.quantity}
                  onChange={(e) => setOrderData(prev => ({
                    ...prev,
                    pcbSpecs: {
                      ...prev.pcbSpecs,
                      quantity: parseInt(e.target.value)
                    }
                  }))}
                />
              </Grid>
            </Grid>

            <TextField
              multiline
              rows={4}
              fullWidth
              label="Tasarım Notları"
              value={orderData.notes}
              onChange={(e) => setOrderData(prev => ({
                ...prev,
                notes: e.target.value
              }))}
              sx={{ mt: 2 }}
            />

            <Button
              variant="contained"
              onClick={handleCalculatePrice}
              disabled={loading || !orderData.serviceType}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Fiyat Hesapla'}
            </Button>
          </Box>
        )

      case 2:
        return (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Hesaplanan Fiyat
            </Typography>
            <Typography variant="h3" color="primary" gutterBottom>
              {calculatedPrice?.totalPrice?.toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              })}
            </Typography>

            <Box sx={{ mt: 2, mb: 3, textAlign: 'left' }}>
              <Typography variant="subtitle1" gutterBottom>
                Fiyat Detayları:
              </Typography>
              <Typography variant="body2">
                Temel Fiyat: {calculatedPrice?.basePrice} TL
              </Typography>
              <Typography variant="body2">
                Hizmet Çarpanı: x{calculatedPrice?.multipliers.service}
              </Typography>
              <Typography variant="body2">
                Karmaşıklık Çarpanı: x{calculatedPrice?.multipliers.complexity}
              </Typography>
              <Typography variant="body2">
                Aciliyet Çarpanı: x{calculatedPrice?.multipliers.urgency}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              * Fiyata KDV dahildir
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setActiveStep(1)}
                >
                  Geri Dön
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCreateCustomOrder}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Özel Sipariş Oluştur'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Özel PCB Siparişi
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {['Tasarım Yükleme', 'Sipariş Detayları', 'Fiyat Onayı'].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}
      </Paper>
    </Container>
  )
}

export default Upload 