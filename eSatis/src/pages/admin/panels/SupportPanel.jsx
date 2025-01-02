import React, { useState, useEffect } from 'react'
import {
  Paper, Typography, List, ListItem, ListItemText,
  Divider, Box, Chip, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions,
  Button, TextField, Alert
} from '@mui/material'
import {
  Email as EmailIcon,
  Delete as DeleteIcon,
  Check as CheckIcon
} from '@mui/icons-material'
import api from '../../../services/api'

function SupportPanel() {
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [replyText, setReplyText] = useState('')

  const fetchMessages = async () => {
    try {
      const response = await api.get('/api/admin/support-messages')
      setMessages(response.data)
    } catch (error) {
      setError('Mesajlar yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleReply = async () => {
    try {
      await api.post(`/api/admin/support-messages/${selectedMessage._id}/reply`, {
        replyText
      })
  
      setMessages(messages.map(msg => 
        msg._id === selectedMessage._id 
          ? { ...msg, status: 'replied' }
          : msg
      ))
      
      setSelectedMessage(null)
      setReplyText('')
    } catch (error) {
      setError('Yanıt gönderilirken bir hata oluştu')
    }
  }

  const handleDelete = async (messageId) => {
    try {
      await api.delete(`/api/admin/support-messages/${messageId}`)
      setMessages(messages.filter(msg => msg._id !== messageId))
    } catch (error) {
      setError('Mesaj silinirken bir hata oluştu')
    }
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper>
        <List>
          {messages.map((message, index) => (
            <React.Fragment key={message._id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      onClick={() => setSelectedMessage(message)}
                      color="primary"
                    >
                      <EmailIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete(message._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {message.subject}
                      {message.status === 'new' && (
                        <Chip
                          label="Yeni"
                          color="error"
                          size="small"
                        />
                      )}
                      {message.status === 'replied' && (
                        <Chip
                          label="Yanıtlandı"
                          color="success"
                          size="small"
                          icon={<CheckIcon />}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {message.name} ({message.email})
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {new Date(message.createdAt).toLocaleString('tr-TR')}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < messages.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog
        open={Boolean(selectedMessage)}
        onClose={() => setSelectedMessage(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Mesaj Detayı
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Gönderen
            </Typography>
            <Typography gutterBottom>
              {selectedMessage?.name} ({selectedMessage?.email})
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>
              Konu
            </Typography>
            <Typography gutterBottom>
              {selectedMessage?.subject}
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              Mesaj
            </Typography>
            <Typography paragraph>
              {selectedMessage?.message}
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Yanıtınız"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedMessage(null)}>
            İptal
          </Button>
          <Button
            onClick={handleReply}
            variant="contained"
            disabled={!replyText.trim()}
          >
            Yanıtla
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SupportPanel 