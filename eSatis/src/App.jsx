import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { HelmetProvider } from 'react-helmet-async'
import { Box, CssBaseline } from '@mui/material'


import Navbar from './components/Navbar'
import LoadingSpinner from './components/LoadingSpinner'
import ChatWidget from './components/ChatWidget'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'


import theme from './theme'


const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Upload = lazy(() => import('./pages/Upload'))
const Calculator = lazy(() => import('./pages/Calculator'))
const Orders = lazy(() => import('./pages/Orders'))
const Payment = lazy(() => import('./pages/Payment'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))
const FAQ = lazy(() => import('./pages/support/FAQ'))
const Shipping = lazy(() => import('./pages/support/Shipping'))
const PrivacyPolicy = lazy(() => import('./pages/support/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/support/Terms'))

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/services" element={<Services />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/payment/:orderId" element={<Payment />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
            <ChatWidget />
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
