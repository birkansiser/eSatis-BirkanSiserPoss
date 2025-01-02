import React, { useState, useEffect } from 'react'
import {
  Grid, Paper, Typography, Box,
  Card, CardContent, IconButton,
  List, ListItem, ListItemText, Divider,
  CircularProgress, Alert, Chip
} from '@mui/material'
import {
  People, ShoppingCart, AttachMoney,
  Refresh as RefreshIcon, TrendingUp,
  CalendarToday
} from '@mui/icons-material'
import api from '../../../services/api'

function StatsPanel() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: [],
    orderStats: {
      pending: 0,
      processing: 0,
      completed: 0,
      cancelled: 0
    },
    ordersLast24h: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/api/admin/stats')
      setStats(response.data)
    } catch (error) {
      console.error('Stats error:', error)
      setError('İstatistikler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={fetchStats} title="Yenile">
          <RefreshIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#1976d2',
              color: 'white',
              position: 'relative'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AttachMoney sx={{ mr: 1 }} />
              <Typography variant="h6">Toplam Gelir</Typography>
            </Box>
            <Typography 
              variant="h4" 
              component="div"
              sx={{ 
                fontWeight: 'bold',
                animation: 'fadeIn 0.5s ease-in'
              }}
            >
              {formatCurrency(stats.totalRevenue)}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 'auto',
                opacity: 0.8,
                fontSize: '0.75rem'
              }}
            >
              Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}
            </Typography>
          </Paper>
        </Grid>

      
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ShoppingCart sx={{ mr: 1 }} />
              <Typography variant="h6">Toplam Sipariş</Typography>
            </Box>
            <Typography variant="h4" component="div">
              {stats.totalOrders}
            </Typography>
            <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
              <Chip 
                size="small" 
                label={`Son 24s: ${stats.ordersLast24h}`}
                color="primary"
              />
            </Box>
          </Paper>
        </Grid>

        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sipariş Durumları
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Bekleyen" 
                  secondary={stats.orderStats.pending} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="İşlemde" 
                  secondary={stats.orderStats.processing} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Tamamlanan" 
                  secondary={stats.orderStats.completed} 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

      
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <People sx={{ mr: 1 }} />
              <Typography variant="h6">Toplam Kullanıcı</Typography>
            </Box>
            <Typography variant="h4" component="div">
              {stats.totalUsers}
            </Typography>
          </Paper>
        </Grid>

     
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Son Siparişler
            </Typography>
            <List>
              {stats.recentOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <ListItem>
                    <ListItemText
                      primary={`Sipariş #${order.orderNumber}`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {order.user.firstName} {order.user.lastName}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.secondary">
                            {formatCurrency(order.price.total)}
                            {' - '}
                            {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

export default StatsPanel 