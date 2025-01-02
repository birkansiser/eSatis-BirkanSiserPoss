import { useState, useEffect } from 'react'
import {
  Container, Paper, Typography, Box,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton,
  CircularProgress, Alert, Button, Dialog,
  DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemText, Divider
} from '@mui/material'
import { Cancel as CancelIcon, Info as InfoIcon } from '@mui/icons-material'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError('')

     
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      const response = await api.get('/api/orders')
      console.log('Orders response:', response.data)
      setOrders(response.data)
    } catch (error) {
      console.error('Orders error:', error.response || error)
      if (error.response?.status === 401) {
        setError('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.')
        navigate('/login')
      } else {
        setError('Siparişler yüklenirken bir hata oluştu')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      await api.post(`/api/orders/${orderId}/cancel`)
      fetchOrders() 
    } catch (error) {
      setError('Sipariş iptal edilirken bir hata oluştu')
    }
  }

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'warning',
      processing: 'info',
      production: 'secondary',
      shipping: 'primary',
      delivered: 'success',
      cancelled: 'error'
    }
    return statusColors[status] || 'default'
  }

  const getStatusText = (status) => {
    const statusTexts = {
      pending: 'Beklemede',
      processing: 'İşleniyor',
      production: 'Üretimde',
      shipping: 'Kargoda',
      delivered: 'Teslim Edildi',
      cancelled: 'İptal Edildi'
    }
    return statusTexts[status] || status
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setOpenDialog(true)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Siparişlerim
      </Typography>

      {orders.length === 0 ? (
        <Alert severity="info">Henüz siparişiniz bulunmamaktadır.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sipariş No</TableCell>
                <TableCell>Tarih</TableCell>
                <TableCell>Hizmet</TableCell>
                <TableCell>Tutar</TableCell>
                <TableCell>Durum</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    {order.orderType === 'custom' ? 'Özel Sipariş' : order.serviceType}
                  </TableCell>
                  <TableCell>
                    {order.price?.total?.toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(order.status)}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetails(order)}
                      title="Detaylar"
                    >
                      <InfoIcon />
                    </IconButton>
                    {order.status === 'pending' && (
                      <IconButton
                        size="small"
                        onClick={() => handleCancelOrder(order._id)}
                        title="İptal Et"
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md">
        <DialogTitle>
          Sipariş Detayları - {selectedOrder?.orderNumber}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <List>
              <ListItem>
                <ListItemText
                  primary="Sipariş Tipi"
                  secondary={selectedOrder.orderType === 'custom' ? 'Özel Sipariş' : 'Standart Sipariş'}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Hizmet"
                  secondary={selectedOrder.serviceType}
                />
              </ListItem>
              <Divider />
              {selectedOrder.orderType === 'custom' && selectedOrder.customSpecs && (
                <>
                  <ListItem>
                    <ListItemText
                      primary="Özel Sipariş Detayları"
                      secondary={
                        <Box component="div" sx={{ mt: 1 }}>
                          {selectedOrder.customSpecs.designNotes && (
                            <Typography variant="body2" component="div" gutterBottom>
                              Notlar: {selectedOrder.customSpecs.designNotes}
                            </Typography>
                          )}
                          {selectedOrder.customSpecs.pcbSpecs && (
                            <Box component="div">
                              <Typography variant="body2" component="div" gutterBottom>
                                Katman: {selectedOrder.customSpecs.pcbSpecs.layers}
                              </Typography>
                              <Typography variant="body2" component="div" gutterBottom>
                                Boyut: {selectedOrder.customSpecs.pcbSpecs.size.width}x
                                {selectedOrder.customSpecs.pcbSpecs.size.height} cm
                              </Typography>
                              <Typography variant="body2" component="div" gutterBottom>
                                Adet: {selectedOrder.customSpecs.pcbSpecs.quantity}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </>
              )}
              <ListItem>
                <ListItemText
                  primary="Fiyat Detayları"
                  secondary={
                    <Box component="div" sx={{ mt: 1 }}>
                      <Typography variant="body2" component="div" gutterBottom>
                        Toplam: {selectedOrder.price.total.toLocaleString('tr-TR', {
                          style: 'currency',
                          currency: 'TRY'
                        })}
                      </Typography>
                      {selectedOrder.price.details && (
                        <Box component="div">
                          <Typography variant="body2" component="div" gutterBottom>
                            Temel Fiyat: {selectedOrder.price.details.basePrice} TL
                          </Typography>
                          {Object.entries(selectedOrder.price.details.multipliers || {}).map(([key, value]) => (
                            <Typography key={key} variant="body2" component="div" gutterBottom>
                              {key}: x{value}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Durum Geçmişi"
                  secondary={
                    <Box component="div" sx={{ mt: 1 }}>
                      {selectedOrder.statusHistory?.map((status, index) => (
                        <Typography key={index} variant="body2" component="div" gutterBottom>
                          {getStatusText(status.status)} - {formatDate(status.date)}
                        </Typography>
                      ))}
                    </Box>
                  }
                />
              </ListItem>
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Orders 