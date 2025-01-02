import { useState } from 'react'
import { 
  Container, Typography, Box, Stack, Card, CardContent, CardMedia, Chip, 
  Button, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper 
} from '@mui/material'
import { 
  LayersClear, Speed, Verified, PrecisionManufacturing,
  CompareArrows, MonetizationOn, Timeline 
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Services() {
  const [selectedService, setSelectedService] = useState(null)
  const navigate = useNavigate()

  const services = [
    {
      title: 'Standart PCB',
      description: '2-6 katmanlı PCB üretimi, FR-4 malzeme',
      icon: <LayersClear sx={{ fontSize: 40 }} />,
      features: ['2-6 Katman', 'FR-4', 'HASL / ENIG'],
      image: 'img/pcb-manufacture-3.jpg',
      specs: {
        minTrace: '4/4 mil',
        material: 'FR-4',
        thickness: '1.6mm',
        copper: '1oz',
        leadTime: '5-7 gün',
        minOrder: '5 adet'
      },
      price: {
        base: '100 TL',
        perLayer: '+50 TL'
      }
    },
    {
      title: 'Hızlı Üretim',
      description: '24-48 saat içinde üretim ve teslimat',
      icon: <Speed sx={{ fontSize: 40 }} />,
      features: ['Hızlı Üretim', '24-48 Saat', 'Express Kargo'],
      image: 'img/communityIcon_o9lwizkk7bxb1.png',
      specs: {
        minTrace: '5/5 mil',
        material: 'FR-4',
        thickness: '1.6mm',
        copper: '1oz',
        leadTime: '24-48 saat',
        minOrder: '1 adet'
      },
      price: {
        base: '200 TL',
        perLayer: '+75 TL'
      }
    },
    {
      title: 'Yüksek Hassasiyet',
      description: 'Minimum 4/4 mil hat/boşluk, hassas üretim',
      icon: <PrecisionManufacturing sx={{ fontSize: 40 }} />,
      features: ['4/4 mil', 'Hassas Üretim', 'Kalite Kontrol'],
      image: 'img/wzquvfgtahs14yfy7h1v.jpg',
      specs: {
        minTrace: '3/3 mil',
        material: 'FR-4 / Rogers',
        thickness: '0.8-3.2mm',
        copper: '0.5-2oz',
        leadTime: '7-10 gün',
        minOrder: '3 adet'
      },
      price: {
        base: '300 TL',
        perLayer: '+100 TL'
      }
    }
  ]

  const processSteps = [
    {
      icon: <CompareArrows />,
      title: 'Dosya Kontrolü',
      description: 'Gerber dosyalarınız detaylı olarak incelenir'
    },
    {
      icon: <MonetizationOn />,
      title: 'Fiyatlandırma',
      description: 'Özel gereksinimlerinize göre fiyat belirlenir'
    },
    {
      icon: <Timeline />,
      title: 'Üretim Takibi',
      description: 'Üretim aşamalarını anlık takip edebilirsiniz'
    }
  ]

  const handleOrder = async (service) => {
    try {
    
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      const basePrice = parseInt(service.price.base.replace(' TL', ''))
      
      const response = await api.post('/api/orders', {
        serviceType: service.title,
        pcbSpecs: {
          ...service.specs,
          price: basePrice
        },
        price: {
          total: basePrice,
          currency: 'TRY'
        }
      })
      
      if (response.data._id) {
        navigate(`/payment/${response.data._id}`)
      } else {
        throw new Error('Sipariş oluşturulamadı')
      }
    } catch (error) {
      console.error('Sipariş oluşturma hatası:', error)
      if (error.response?.status === 401) {
        navigate('/login')
      } else {
        alert('Sipariş oluşturulurken bir hata oluştu: ' + error.message)
      }
    }
  }

  return (
    <Box component="main" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}
        >
          PCB Üretim Hizmetlerimiz
        </Typography>

       
        <Stack 
          direction="row" 
          flexWrap="wrap" 
          spacing={4} 
          useFlexGap
        >
          {services.map((service, index) => (
            <Box 
              key={index} 
              flex={1} 
              minWidth={280}
            >
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => setSelectedService(service)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={service.image}
                  alt={service.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {service.icon}
                    <Typography variant="h5" component="h2" sx={{ ml: 1, fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {service.features.map((feature, idx) => (
                      <Chip
                        key={idx}
                        label={feature}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Stack>

       
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
            Üretim Süreci
          </Typography>
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4}
            sx={{ mt: 4 }}
          >
            {processSteps.map((step, index) => (
              <Card 
                key={index}
                sx={{ 
                  flex: 1,
                  textAlign: 'center',
                  p: 3,
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText'
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {step.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2">
                  {step.description}
                </Typography>
              </Card>
            ))}
          </Stack>
        </Box>

        <Dialog 
          open={!!selectedService} 
          onClose={() => setSelectedService(null)}
          maxWidth="md"
          fullWidth
        >
          {selectedService && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {selectedService.icon}
                  {selectedService.title}
                </Box>
              </DialogTitle>
              <DialogContent>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Özellik</TableCell>
                        <TableCell>Değer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(selectedService.specs).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell component="th" scope="row">
                            {key}
                          </TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => {
                      handleOrder(selectedService)
                    }}
                  >
                    Sipariş Ver
                  </Button>
                </Box>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  )
}

export default Services 