import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Fab,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  Button
} from '@mui/material'
import {
  Chat as ChatIcon,
  Send as SendIcon,
  Close as CloseIcon,
  QuestionAnswer as QuestionIcon
} from '@mui/icons-material'
import { findAnswer } from '../utils/chatbotData'

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Merhaba! Size nasıl yardımcı olabilirim? Aşağıdaki konulardan birini seçebilir veya sorunuzu yazabilirsiniz.'
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const quickQuestions = [
    'Nasıl sipariş verebilirim?',
    'PCB tasarımı yapıyor musunuz?',
    'Fiyatlar nasıl belirleniyor?',
    'İletişim bilgileriniz nedir?'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text = input) => {
    if (!text.trim()) return


    setMessages(prev => [...prev, { type: 'user', text: text }])

    try {
 
      const answer = findAnswer(text)

      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: answer }])
      }, 500)
    } catch (error) {
      console.error('Chatbot error:', error)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.'
        }])
      }, 500)
    }

    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      <Collapse in={isOpen}>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 320,
            height: 480,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            zIndex: 1000
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">PCB Asistan</Typography>
          </Box>

          {/* Messages */}
          <List
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              bgcolor: 'grey.50'
            }}
          >
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  flexDirection: 'column',
                  alignItems: message.type === 'user' ? 'flex-end' : 'flex-start',
                  p: 0,
                  mb: 1
                }}
              >
                <Paper
                  sx={{
                    p: 1,
                    bgcolor: message.type === 'user' ? 'primary.main' : 'white',
                    color: message.type === 'user' ? 'white' : 'text.primary',
                    maxWidth: '80%'
                  }}
                >
                  <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                    {message.text}
                  </Typography>
                </Paper>
              </ListItem>
            ))}

           
            {messages.length === 1 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  Örnek sorular:
                </Typography>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      display: 'block', 
                      mb: 1,
                      width: '100%',
                      justifyContent: 'flex-start',
                      textAlign: 'left'
                    }}
                    onClick={() => handleSend(question)}
                    startIcon={<QuestionIcon />}
                  >
                    {question}
                  </Button>
                ))}
              </Box>
            )}
            <div ref={messagesEndRef} />
          </List>

          <Divider />

   
          <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Mesajınızı yazın..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => handleSend()} disabled={!input.trim()}>
                    <SendIcon />
                  </IconButton>
                )
              }}
            />
          </Box>
        </Paper>
      </Collapse>
    </>
  )
}

export default ChatWidget 