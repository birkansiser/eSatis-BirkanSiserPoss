import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const faqData = [
  {
    question: 'PCB tasarımı ne kadar sürede tamamlanır?',
    answer: 'PCB tasarım süresi, projenin karmaşıklığına ve boyutuna göre değişmektedir. Standart projeler genellikle 3-5 iş günü içerisinde tamamlanırken, karmaşık projeler 7-10 iş günü sürebilmektedir.'
  },
  {
    question: 'Minimum sipariş miktarı nedir?',
    answer: 'Minimum sipariş miktarımız 5 adettir. Prototip siparişleri için özel koşullar uygulanabilmektedir.'
  },
  {
    question: 'Hangi dosya formatlarını kabul ediyorsunuz?',
    answer: 'Gerber, Eagle, Altium Designer, KiCad ve OrCAD formatlarındaki dosyaları kabul ediyoruz. Ayrıca PDF formatında da tasarım dosyalarını işleyebiliyoruz.'
  },
  {
    question: 'Acil siparişler için ek ücret var mı?',
    answer: 'Evet, acil siparişler için normal fiyatın %30-50 arası ek ücret uygulanmaktadır. Kesin fiyat için lütfen iletişime geçin.'
  },
  // Daha fazla soru eklenebilir
]

function FAQ() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Sıkça Sorulan Sorular
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          {faqData.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Container>
  )
}

export default FAQ 