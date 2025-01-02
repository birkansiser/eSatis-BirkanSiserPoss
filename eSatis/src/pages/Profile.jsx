import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import api from '../services/api'

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/api/users/profile')
      setUser(response.data)
      setEditData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone || '',
        address: response.data.address || ''
      })
    } catch (error) {
      setError('Profil bilgileri yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleEditSubmit = async () => {
    try {
      setLoading(true)
      const response = await api.put('/api/users/profile', editData)
      setUser(response.data)
      setOpenEdit(false)
    } catch (error) {
      setError('Profil güncellenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
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
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    bgcolor: 'primary.main',
                    fontSize: '3rem'
                  }}
                >
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </Avatar>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                fullWidth
                onClick={() => setOpenEdit(true)}
              >
                Profili Düzenle
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profil Bilgileri
            </Typography>
            <List>
              <ListItem>
                <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
                <ListItemText
                  primary="Ad Soyad"
                  secondary={`${user?.firstName} ${user?.lastName}`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                <ListItemText
                  primary="E-posta"
                  secondary={user?.email}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                <ListItemText
                  primary="Telefon"
                  secondary={user?.phone || 'Belirtilmemiş'}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <LocationIcon sx={{ mr: 2, color: 'primary.main' }} />
                <ListItemText
                  primary="Adres"
                  secondary={user?.address || 'Belirtilmemiş'}
                />
              </ListItem>
            </List>

           
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Hesap İstatistikleri
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" align="center">
                        {user?.orderCount || 0}
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary">
                        Toplam Sipariş
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" align="center">
                        {user?.activeOrderCount || 0}
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary">
                        Aktif Sipariş
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" align="center">
                        {user?.completedOrderCount || 0}
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary">
                        Tamamlanan
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" align="center">
                        {user?.totalSpent?.toLocaleString('tr-TR', {
                          style: 'currency',
                          currency: 'TRY'
                        }) || '0 ₺'}
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary">
                        Toplam Harcama
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

     
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Profili Düzenle</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Ad"
              value={editData.firstName}
              onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Soyad"
              value={editData.lastName}
              onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Telefon"
              value={editData.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              fullWidth
            />
            <TextField
              label="Adres"
              value={editData.address}
              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>İptal</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Profile 