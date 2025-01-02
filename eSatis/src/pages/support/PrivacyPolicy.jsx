import { Container, Typography, Paper, Box } from '@mui/material'

function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Gizlilik Politikası
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Kişisel Verilerin Korunması
          </Typography>
          <Typography paragraph>
            Kişisel verileriniz 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında korunmaktadır. 
            Toplanan veriler sadece hizmet kalitemizi artırmak ve yasal yükümlülüklerimizi yerine getirmek 
            için kullanılmaktadır.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. Veri Toplama
          </Typography>
          <Typography paragraph>
            Sitemizde sipariş oluşturma, üyelik ve iletişim formları aracılığıyla toplanan veriler 
            şifrelenmiş ve güvenli bir şekilde saklanmaktadır.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Çerezler
          </Typography>
          <Typography paragraph>
            Sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. 
            Bu çerezler tercihleri kaydetmek ve istatistiksel veriler toplamak için kullanılır.
          </Typography>

          {/* Daha fazla bölüm eklenebilir */}
        </Box>
      </Paper>
    </Container>
  )
}

export default PrivacyPolicy 