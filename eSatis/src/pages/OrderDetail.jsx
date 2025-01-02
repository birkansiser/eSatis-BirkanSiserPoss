import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip
} from '@mui/material'
import api from '../services/api'

function OrderDetail() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  const steps = [
    'Sipariş Alındı',
    'İşleniyor',
    'Üretimde',
    'Kargoya Verildi',
    'Teslim Edildi'
  ]

  useEffect(() => {
    fetchOrderDetails()
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await api.get(`/api/orders/${orderId}`)
      setOrder(response.data)
    } catch (error) {
      console.error('Sipariş detayları yüklenemedi:', error)
    } finally {
      setLoading(false)
    }
  }

} 