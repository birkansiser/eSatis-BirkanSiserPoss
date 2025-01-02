import { 
  AppBar, Toolbar, Typography, Button, Box, Container, 
  IconButton, Drawer, List, ListItem, ListItemText,
  Avatar, Menu, MenuItem, Divider
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Menu as MenuIcon, AccountCircle, AdminPanelSettings } from '@mui/icons-material'
import { useState } from 'react'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('userRole')
  const isAdmin = userRole === 'admin'

  // Normal kullanıcılar için menü öğeleri
  const userMenuItems = [
    { text: 'Ana Sayfa', path: '/' },
    { text: 'Hizmetler', path: '/services' },
    { text: 'Tasarım Yükle', path: '/upload' },
    { text: 'Fiyat Hesapla', path: '/calculator' },
    { text: 'Siparişlerim', path: '/orders' },
    { text: 'İletişim', path: '/contact' }
  ]

  // Admin için ekstra menü öğesi
  const menuItems = isAdmin ? [
    ...userMenuItems,
    { text: 'Admin Panel', path: '/admin' }
  ] : userMenuItems

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    navigate('/login')
    handleMenuClose()
  }

  const handleProfile = () => {
    navigate('/profile')
    handleMenuClose()
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ padding: { xs: '0.5rem 0', md: '0' } }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700
            }}
          >
            PCB Tasarım
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}

            {token ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMenuClick}
                  sx={{ ml: 2 }}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32,
                      bgcolor: '#1565c0',
                      border: '2px solid #fff'
                    }}
                  >
                    <AccountCircle sx={{ fontSize: 20 }} />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      }
                    },
                  }}
                >
                  <MenuItem onClick={handleProfile}>
                    <Avatar 
                      sx={{ 
                        bgcolor: '#1565c0',
                        width: 32,
                        height: 32
                      }}
                    >
                      <AccountCircle sx={{ fontSize: 20 }} />
                    </Avatar>
                    Profilim
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    Çıkış Yap
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                <Button
                  color="inherit"
                  variant="outlined"
                  component={Link}
                  to="/login"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Giriş Yap
                </Button>
                <Button
                  color="inherit"
                  variant="contained"
                  component={Link}
                  to="/register"
                  sx={{
                    bgcolor: '#FF5722',
                    '&:hover': {
                      bgcolor: '#F4511E'
                    }
                  }}
                >
                  Kayıt Ol
                </Button>
              </Box>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          {token ? (
            <ListItem onClick={handleLogout}>
              <ListItemText primary="Çıkış Yap" />
            </ListItem>
          ) : (
            <>
              <ListItem
                component={Link}
                to="/login"
                onClick={handleDrawerToggle}
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                <ListItemText primary="Giriş Yap" />
              </ListItem>
              <ListItem
                component={Link}
                to="/register"
                onClick={handleDrawerToggle}
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                <ListItemText primary="Kayıt Ol" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  )
}

export default Navbar 