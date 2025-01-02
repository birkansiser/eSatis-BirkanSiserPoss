import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { Calculate as CalculateIcon } from '@mui/icons-material'
import api from '../services/api'

const PCBCalculator = () => {
  const [specs, setSpecs] = useState({
    width: '0',
    height: '0',
    layers: '2',
    quantity: '1',
    leadTime: 'normal',
    material: 'FR4',
    thickness: '1.6',
    copper: '1oz'
  })

  const [price, setPrice] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    const parsedValue = ['width', 'height', 'quantity'].includes(name) 
      ? parseFloat(value) || 0 
      : value

    setSpecs(prev => ({
      ...prev,
      [name]: parsedValue
    }))
  }

  const calculatePrice = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await api.post('/api/calculator', {
        width: specs.width,
        height: specs.height,
        layers: specs.layers,
        quantity: specs.quantity,
        leadTime: specs.leadTime,
        material: specs.material,
        thickness: specs.thickness,
        copper: specs.copper
      })

      setPrice(response.data)
    } catch (error) {
      console.error('Hesaplama hatası:', error)
      setError('Fiyat hesaplanırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        PCB Fiyat Hesaplama
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
    
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Genişlik (cm)"
              name="width"
              type="number"
              value={specs.width}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Yükseklik (cm)"
              name="height"
              type="number"
              value={specs.height}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>

       
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Katman Sayısı</InputLabel>
              <Select
                name="layers"
                value={specs.layers}
                onChange={handleChange}
                label="Katman Sayısı"
              >
                <MenuItem value="2">2 Katman</MenuItem>
                <MenuItem value="4">4 Katman</MenuItem>
                <MenuItem value="6">6 Katman</MenuItem>
                <MenuItem value="8">8 Katman</MenuItem>
              </Select>
            </FormControl>
          </Grid>

     
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Adet"
              name="quantity"
              type="number"
              value={specs.quantity}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>

      
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Üretim Süresi</InputLabel>
              <Select
                name="leadTime"
                value={specs.leadTime}
                onChange={handleChange}
                label="Üretim Süresi"
              >
                <MenuItem value="normal">Normal (5-7 gün)</MenuItem>
                <MenuItem value="fast">Hızlı (3-4 gün)</MenuItem>
                <MenuItem value="urgent">Acil (1-2 gün)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

    
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Malzeme</InputLabel>
              <Select
                name="material"
                value={specs.material}
                onChange={handleChange}
                label="Malzeme"
              >
                <MenuItem value="FR4">FR4</MenuItem>
                <MenuItem value="aluminum">Alüminyum</MenuItem>
                <MenuItem value="flexible">Esnek PCB</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>PCB Kalınlığı</InputLabel>
              <Select
                name="thickness"
                value={specs.thickness}
                onChange={handleChange}
                label="PCB Kalınlığı"
              >
                <MenuItem value="0.8">0.8mm</MenuItem>
                <MenuItem value="1.6">1.6mm</MenuItem>
                <MenuItem value="2.0">2.0mm</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Bakır Kalınlığı</InputLabel>
              <Select
                name="copper"
                value={specs.copper}
                onChange={handleChange}
                label="Bakır Kalınlığı"
              >
                <MenuItem value="1oz">1 oz (35µm)</MenuItem>
                <MenuItem value="2oz">2 oz (70µm)</MenuItem>
                <MenuItem value="3oz">3 oz (105µm)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={calculatePrice}
          disabled={loading}
          startIcon={<CalculateIcon />}
          sx={{ mt: 4 }}
        >
          Fiyat Hesapla
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {price && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Fiyat Detayları
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {price.dimensions && (
                  <>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      PCB Boyutları
                    </Typography>
                    <Typography variant="body1">
                      {price.dimensions.width} x {price.dimensions.height} cm 
                      ({price.dimensions.area} cm²)
                    </Typography>
                  </>
                )}

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Temel Fiyat: {price.basePrice} TL
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Çarpanlar:
                </Typography>
                <List dense>
                  {price.multipliers && (
                    <>
                      <ListItem>
                        <ListItemText 
                          primary={`Katman: x${price.multipliers.layers}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={`Adet: x${price.multipliers.quantity}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={`Üretim Süresi: x${price.multipliers.leadTime}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={`Malzeme: x${price.multipliers.material}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={`PCB Kalınlığı: x${price.multipliers.thickness}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={`Bakır Kalınlığı: x${price.multipliers.copper}`}
                        />
                      </ListItem>
                    </>
                  )}
                </List>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" color="primary" align="center">
                  Toplam: {price.totalPrice} TL
                </Typography>
                {specs.quantity > 0 && (
                  <Typography variant="caption" color="text.secondary" align="center" display="block">
                    Birim Fiyat: {Math.round(price.totalPrice / specs.quantity)} TL/adet
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default PCBCalculator 