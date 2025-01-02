import { Box, Container, Grid, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Hakkımızda
            </Typography>
            <Typography variant="body2">
              PCB tasarım ve üretim hizmetlerinde 10 yılı aşkın tecrübemizle 
              müşterilerimize en kaliteli hizmeti sunmaktayız.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Destek
            </Typography>
            <Link component={RouterLink} to="/faq" color="inherit" display="block" sx={{ mb: 1 }}>
              Sıkça Sorulan Sorular
            </Link>
            <Link component={RouterLink} to="/shipping" color="inherit" display="block" sx={{ mb: 1 }}>
              Kargo ve Teslimat
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              İletişim
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Yasal
            </Typography>
            <Link component={RouterLink} to="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Gizlilik Politikası
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Kullanım Koşulları
            </Link>
          </Grid>
        </Grid>
        
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} PCB Tasarım. Tüm hakları saklıdır.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer 