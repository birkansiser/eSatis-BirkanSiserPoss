import { useState } from 'react'
import {
  Container, Paper, Typography, Tabs, Tab, Box
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  Star as CustomOrderIcon,
  People as UsersIcon
} from '@mui/icons-material'
import StatsPanel from './panels/StatsPanel'
import CustomOrders from './CustomOrders'

function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState('overview')

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  const tabs = [
    { value: 'overview', label: 'Genel Bakış', icon: <DashboardIcon /> },
    { value: 'orders', label: 'Siparişler', icon: <OrdersIcon /> },
    { value: 'custom-orders', label: 'Özel Siparişler', icon: <CustomOrderIcon /> },
    { value: 'users', label: 'Kullanıcılar', icon: <UsersIcon /> }
  ]

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return <StatsPanel />
      case 'custom-orders':
        return <CustomOrders />
 
      default:
        return <StatsPanel />
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Paneli
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3 }}>
        {renderContent()}
      </Box>
    </Container>
  )
}

export default AdminDashboard 