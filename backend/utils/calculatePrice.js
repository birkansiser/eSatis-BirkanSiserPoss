const calculatePCBPrice = (specs) => {
  const { width, height, layers, quantity } = specs
  
  // Temel fiyat hesaplama (cm² başına)
  const area = (width * height) / 100 // mm² to cm²
  const basePrice = area * 0.5 // 0.5 TL per cm²
  
  // Katman çarpanı
  const layerMultiplier = layers <= 2 ? 1 : layers * 0.8
  
  // Adet indirimi
  const quantityDiscount = quantity >= 10 ? 0.9 : 1
  
  // Toplam fiyat
  const subtotal = basePrice * layerMultiplier * quantity * quantityDiscount
  const shipping = 50 // Sabit kargo ücreti
  const total = subtotal + shipping
  
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping,
    total: parseFloat(total.toFixed(2)),
    currency: 'TRY'
  }
}

module.exports = {
  calculatePCBPrice
} 