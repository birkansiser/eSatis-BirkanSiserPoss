import { Container, Typography, Paper, Box } from '@mui/material'

function Terms() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Kullanım Koşulları
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Hizmet Kullanımı
          </Typography>
          <Typography paragraph>
            Sitemiz üzerinden verilen PCB tasarım ve üretim hizmetleri belirli kullanım koşullarına 
            tabidir. Hizmetlerimizi kullanarak bu koşulları kabul etmiş sayılırsınız.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. Fikri Mülkiyet
          </Typography>
          <Typography paragraph>
            Müşterilerimizin tasarımları ve projeleri gizlilik anlaşması kapsamında korunmaktadır. 
            Paylaşılan tasarımlar üçüncü taraflarla paylaşılmaz.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Sorumluluk Sınırları
          </Typography>
          <Typography paragraph>
            Üretim sürecinde oluşabilecek hatalar ve gecikmeler için belirli sorumluluk sınırları 
            bulunmaktadır. Detaylı bilgi için müşteri hizmetleri ile iletişime geçebilirsiniz.
          </Typography>

          {/* Daha fazla bölüm eklenebilir */}
        </Box>
      </Paper>
    </Container>
  )
}

export default Terms 