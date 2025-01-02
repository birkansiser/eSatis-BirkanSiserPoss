import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Link,
  Grid
} from '@mui/material'
import {
  CheckCircle as AcceptIcon,
  Cancel as RejectIcon,
  Info as InfoIcon,
  Download as DownloadIcon
} from '@mui/icons-material'
import api from '../../services/api'

function CustomOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    fetchCustomOrders()
  }, [])

  const fetchCustomOrders = async () => {
    try {
      const response = await api.get('/api/admin/orders/custom')
      setOrders(response.data)
    } catch (error) {
      setError('Siparişler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (orderId) => {
    try {
      await api.post(`/api/admin/orders/${orderId}/accept`)
      fetchCustomOrders()
    } catch (error) {
      setError('Sipariş onaylanırken bir hata oluştu')
    }
  }

  const handleReject = async (orderId) => {
    try {
      await api.post(`/api/admin/orders/${orderId}/reject`)
      fetchCustomOrders()
    } catch (error) {
      setError('Sipariş reddedilirken bir hata oluştu')
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setOpenDialog(true)
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      accepted: 'success',
      rejected: 'error',
      processing: 'info',
      completed: 'success'
    }
    return colors[status] || 'default'
  }

  const getStatusText = (status) => {
    const texts = {
      pending: 'Beklemede',
      accepted: 'Onaylandı',
      rejected: 'Reddedildi',
      processing: 'İşleniyor',
      completed: 'Tamamlandı'
    }
    return texts[status] || status
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
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        Özel Siparişler
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sipariş No</TableCell>
              <TableCell>Müşteri</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Tutar</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>
                  {order.user.firstName} {order.user.lastName}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                </TableCell>
                <TableCell>
                  {order.price.total.toLocaleString('tr-TR', {
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
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="info"
                      onClick={() => handleViewDetails(order)}
                      startIcon={<InfoIcon />}
                      title="Sipariş Detayları"
                    >
                      Detaylar
                    </Button>
                    {order.status === 'pending' && (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleAccept(order._id)}
                          startIcon={<AcceptIcon />}
                        >
                          Onayla
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleReject(order._id)}
                          startIcon={<RejectIcon />}
                        >
                          Reddet
                        </Button>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Detay Dialog'u */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon color="primary" />
            Sipariş Detayları - {selectedOrder?.orderNumber}
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              {/* Müşteri Bilgileri */}
              <Typography variant="h6" gutterBottom>
                Müşteri Bilgileri
              </Typography>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography>
                  Ad Soyad: {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}
                </Typography>
                <Typography>
                  E-posta: {selectedOrder.user?.email}
                </Typography>
              </Paper>

              {/* Tasarım Dosyası */}
              <Typography variant="h6" gutterBottom>
                Tasarım Dosyası
              </Typography>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {selectedOrder.customSpecs?.designFile ? (
                    <Link
                      href={selectedOrder.customSpecs.designFile}
                      target="_blank"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <DownloadIcon />
                      Dosyayı İndir
                    </Link>
                  ) : (
                    <Typography color="text.secondary">
                      Dosya bulunamadı
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    Yüklenme Tarihi: {new Date(selectedOrder.createdAt).toLocaleString('tr-TR')}
                  </Typography>
                </Box>
              </Paper>

              {/* PCB Özellikleri */}
              {selectedOrder.customSpecs?.pcbSpecs && (
                <>
                  <Typography variant="h6" gutterBottom>
                    PCB Özellikleri
                  </Typography>
                  <Paper sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2">Katman Sayısı</Typography>
                        <Typography>
                          {selectedOrder.customSpecs.pcbSpecs.layers || 'Belirtilmemiş'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2">Boyutlar</Typography>
                        <Typography>
                          {selectedOrder.customSpecs.pcbSpecs.size?.width || '0'} x{' '}
                          {selectedOrder.customSpecs.pcbSpecs.size?.height || '0'} cm
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2">Adet</Typography>
                        <Typography>
                          {selectedOrder.customSpecs.pcbSpecs.quantity || 'Belirtilmemiş'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </>
              )}

              {/* Müşteri Notları */}
              <Typography variant="h6" gutterBottom>
                Müşteri Notları
              </Typography>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography>
                  {selectedOrder.customSpecs?.designNotes || 'Not bulunmuyor'}
                </Typography>
              </Paper>

              {/* Fiyatlandırma */}
              <Typography variant="h6" gutterBottom>
                Fiyatlandırma Detayları
              </Typography>
              <Paper sx={{ p: 2 }}>
                <Typography>
                  Temel Fiyat: {selectedOrder.price?.details?.basePrice?.toLocaleString('tr-TR') || '0'} TL
                </Typography>
                {selectedOrder.price?.details?.multipliers && 
                  Object.entries(selectedOrder.price.details.multipliers).map(([key, value]) => (
                    <Typography key={key}>
                      {key}: x{value}
                    </Typography>
                  ))
                }
                <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
                  Toplam: {selectedOrder.price?.total?.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  }) || '0 TL'}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Kapat</Button>
          {selectedOrder?.status === 'pending' && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleAccept(selectedOrder._id)
                  setOpenDialog(false)
                }}
                startIcon={<AcceptIcon />}
              >
                Onayla
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleReject(selectedOrder._id)
                  setOpenDialog(false)
                }}
                startIcon={<RejectIcon />}
              >
                Reddet
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default CustomOrders 