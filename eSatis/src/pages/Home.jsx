import { useState, useEffect } from 'react'
import { 
  Container, Typography, Box, Button, Stack, Grid, 
  Fade, useTheme, useMediaQuery 
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { 
  CloudUpload, Calculate, CheckCircle, ArrowForward 
} from '@mui/icons-material'
import SEOHelmet from '../components/SEOHelmet'
import OptimizedImage from '../components/OptimizedImage'

function Home() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {

    const firstRefresh = setTimeout(() => {
      setRefreshKey(prev => prev + 1)
    }, 1000)

    const secondRefresh = setTimeout(() => {
      setRefreshKey(prev => prev + 1)
    }, 2000)

    return () => {
      clearTimeout(firstRefresh)
      clearTimeout(secondRefresh)
    }
  }, [])

  return (
    <Box key={refreshKey}>
      <SEOHelmet 
        title="Ana Sayfa"
        description="Profesyonel PCB tasarım ve üretim hizmetleri. Yüksek kalite, hızlı teslimat ve rekabetçi fiyatlarla PCB çözümleri sunuyoruz."
        keywords="PCB tasarım, PCB üretim, elektronik devre kartı, prototip PCB, çok katmanlı PCB"
      />
      <Box sx={{ bgcolor: '#0A1929' }}>
        <Box
          sx={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: '#0A1929',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Stack spacing={4}>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        display: 'inline-block',
                        color: '#FFB74D',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: 3,
                        mb: 3,
                        border: '1px solid #FFB74D',
                        boxShadow: '0 0 20px rgba(255,183,77,0.2)'
                      }}
                    >
                      PROFESYONEL PCB ÜRETİMİ
                    </Typography>

                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                        fontWeight: 800,
                        color: '#FFFFFF',
                        lineHeight: 1.1,
                        mb: 3,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      Elektronik Projeleriniz
                      <Box 
                        component="span"
                        sx={{ 
                          display: 'block',
                          color: '#FFA726',
                          textShadow: '0 0 30px rgba(255,167,38,0.3)'
                        }}
                      >
                        Hayata Geçiyor
                      </Box>
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        color: '#FFE0B2',
                        fontWeight: 300,
                        lineHeight: 1.6,
                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                        maxWidth: 600,
                        mb: 4,
                        opacity: 0.9
                      }}
                    >
                      Yüksek kalite standartlarında PCB üretimi, hızlı teslimat ve 
                      rekabetçi fiyatlarla yanınızdayız.
                    </Typography>


                    <Stack 
                      direction="row" 
                      spacing={4} 
                      sx={{ mb: 6 }}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {[
                        'Ücretsiz Dosya Kontrolü',
                        'Aynı Gün Kargo',
                        'Kalite Garantisi'
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: '#FFFFFF'
                          }}
                        >
                          <CheckCircle sx={{ color: '#FFB74D' }} />
                          <Typography>{item}</Typography>
                        </Box>
                      ))}
                    </Stack>

                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={3}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        onClick={() => navigate('/upload')}
                        sx={{
                          bgcolor: '#FFA726',
                          color: '#0A1929',
                          py: 2.5,
                          px: 6,
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: '#FF9800',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 10px 20px rgba(255,167,38,0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Projeye Başla
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        endIcon={<Calculate />}
                        onClick={() => navigate('/calculator')}
                        sx={{
                          color: '#FFFFFF',
                          borderColor: '#FFB74D',
                          py: 2.5,
                          px: 6,
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#FFA726',
                            bgcolor: 'rgba(255,167,38,0.1)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        Fiyat Hesapla
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>


              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '600px',
                    overflow: 'hidden',
                    borderRadius: '30px',
                    '&:hover': {
                      '& .overlay': {
                        opacity: 1
                      },
                      '& img': {
                        transform: 'scale(1.1)',
                        filter: 'brightness(0.8)'
                      }
                    }
                  }}
                >
                  <OptimizedImage 
                    src="img/banner.jpg"
                    alt="PCB Tasarım Banner"
                    width={1200}
                    height={800}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(255,167,38,0.2)',
                      opacity: 0,
                      transition: 'all 0.5s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: '#FFFFFF',
                        textAlign: 'center',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        fontWeight: 700
                      }}
                    >
                      Profesyonel PCB Üretimi
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Home 