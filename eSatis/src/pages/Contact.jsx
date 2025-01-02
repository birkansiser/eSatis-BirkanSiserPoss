import { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress
} from '@mui/material'
import { Email, Phone, LocationOn } from '@mui/icons-material'
import api from '../services/api'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/api/contact', formData)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Mesajınız gönderilirken bir hata oluştu'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'E-posta',
      content: 'info@pcbtasarim.com',
      link: 'mailto:info@pcbtasarim.com'
    },
    {
      icon: <Phone sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Telefon',
      content: '+90 (212) 555 0000',
      link: 'tel:+902125550000'
    },
    {
      icon: <LocationOn sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Adres',
      content: 'Teknoloji Mah. PCB Cad. No:1 İstanbul',
      link: 'https://maps.google.com/?q=Teknoloji+Mah.+PCB+Cad.+No:1+İstanbul'
    }
  ]

  return (
    <Box component="main" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}
        >
          İletişim
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          <Box flex={1}>
            <Box sx={{ mb: 4 }}>
              {contactInfo.map((info, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 3,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    }
                  }}
                  onClick={() => window.open(info.link, '_blank')}
                >
                  {info.icon}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {info.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {info.content}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>

          <Box flex={2}>
            <Paper sx={{ p: 4 }}>
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Mesajınız başarıyla gönderildi! Size en kısa sürede dönüş yapacağız.
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField
                      fullWidth
                      label="Adınız"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <TextField
                      fullWidth
                      label="E-posta"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    label="Konu"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    label="Mesajınız"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Mesaj Gönder'
                    )}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Contact 