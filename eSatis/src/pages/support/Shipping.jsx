import { Container, Typography, Paper, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { LocalShipping, Schedule, Payment, Info } from '@mui/icons-material'

function Shipping() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Kargo ve Teslimat
        </Typography>

        <Box sx={{ mt: 4 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalShipping color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Kargo Firmaları"
                secondary="Yurtiçi Kargo, MNG Kargo ve UPS ile çalışmaktayız. Siparişinizi verirken tercih ettiğiniz kargo firmasını seçebilirsiniz."
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <Schedule color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Teslimat Süreleri"
                secondary="Standart teslimat süresi 2-4 iş günüdür. Acil siparişler için aynı gün kargo seçeneği mevcuttur."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <Payment color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Kargo Ücretleri"
                secondary="300 TL üzeri siparişlerde kargo ücretsizdir. Standart kargo ücreti 30 TL'dir. Acil gönderimler için ek ücret uygulanır."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <Info color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Önemli Bilgiler"
                secondary="Kargo takip numarası siparişiniz kargolandığında SMS ve e-posta ile gönderilir. Teslimat sırasında ürün kontrolü yapabilirsiniz."
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  )
}

export default Shipping 