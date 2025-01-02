const calculatePCBPrice = (specs) => {
  // Sayısal değerleri kontrol et ve dönüştür
  const width = parseFloat(specs.width) || 0
  const height = parseFloat(specs.height) || 0
  const quantity = parseInt(specs.quantity) || 1

  let basePrice = 0
  let multipliers = {
    size: 1,
    layers: 1,
    quantity: 1,
    leadTime: 1,
    material: 1,
    thickness: 1,
    copper: 1
  }

  // PCB Boyutu Hesaplama (cm²)
  const area = (width * height)
  if (area <= 50) {
    basePrice = area * 2  // 2 TL/cm²
  } else if (area <= 100) {
    basePrice = area * 1.8  // 1.8 TL/cm²
  } else {
    basePrice = area * 1.5  // 1.5 TL/cm²
  }

  // Katman Sayısı
  switch (specs.layers) {
    case '2':
      multipliers.layers = 1
      break
    case '4':
      multipliers.layers = 1.8
      break
    case '6':
      multipliers.layers = 2.5
      break
    case '8':
      multipliers.layers = 3.2
      break
  }

  // Adet
  if (quantity <= 5) {
    multipliers.quantity = 1
  } else if (quantity <= 10) {
    multipliers.quantity = 1.8
  } else {
    multipliers.quantity = 2.5
  }

  // Üretim Süresi
  switch (specs.leadTime) {
    case 'normal': // 5-7 gün
      multipliers.leadTime = 1
      break
    case 'fast': // 3-4 gün
      multipliers.leadTime = 1.3
      break
    case 'urgent': // 1-2 gün
      multipliers.leadTime = 1.8
      break
  }

  // Toplam fiyat hesaplama
  const totalPrice = basePrice * 
    multipliers.layers * 
    multipliers.quantity * 
    multipliers.leadTime * 
    multipliers.material * 
    multipliers.thickness * 
    multipliers.copper

  return {
    basePrice,
    multipliers,
    totalPrice: Math.round(totalPrice),
    dimensions: {
      width,
      height,
      area: Math.round(area * 100) / 100
    }
  }
}

const calculateCustomOrderPrice = (specs) => {
  let basePrice = 0
  let multipliers = {
    service: 1,
    complexity: 1,
    urgency: 1
  }

  // Hizmet tipine göre temel fiyat
  switch (specs.serviceType) {
    case 'pcb_design':
      basePrice = 500
      break
    case 'pcb_assembly':
      basePrice = 1000
      break
    case 'pcb_prototype':
      basePrice = 750
      break
    case 'full_service':
      basePrice = 2000
      break
    default:
      basePrice = 500
  }

  // Dosya boyutuna göre karmaşıklık çarpanı
  if (specs.fileSize) {
    if (specs.fileSize > 10 * 1024 * 1024) { // 10MB üzeri
      multipliers.complexity *= 1.5
    } else if (specs.fileSize > 5 * 1024 * 1024) { // 5MB üzeri
      multipliers.complexity *= 1.2
    }
  }

  // Aciliyet durumu
  if (specs.urgency === 'high') {
    multipliers.urgency = 1.5
  } else if (specs.urgency === 'medium') {
    multipliers.urgency = 1.2
  }

  // PCB özellikleri
  if (specs.pcbSpecs) {
    const { layers, size, quantity } = specs.pcbSpecs

    // Katman sayısına göre
    if (layers > 4) {
      multipliers.complexity *= 1.5
    } else if (layers > 2) {
      multipliers.complexity *= 1.2
    }

    // Boyuta göre (cm²)
    const area = size.width * size.height
    if (area > 100) {
      multipliers.complexity *= 1.4
    } else if (area > 50) {
      multipliers.complexity *= 1.2
    }

    // Adet sayısına göre indirim
    if (quantity >= 100) {
      multipliers.service *= 0.7
    } else if (quantity >= 50) {
      multipliers.service *= 0.8
    } else if (quantity >= 20) {
      multipliers.service *= 0.9
    }
  }

  // Toplam fiyat hesaplama
  const totalMultiplier = Object.values(multipliers).reduce((a, b) => a * b, 1)
  const totalPrice = basePrice * totalMultiplier

  return {
    basePrice,
    multipliers,
    totalPrice: Math.round(totalPrice * 100) / 100 // 2 decimal
  }
}

module.exports = {
  calculatePCBPrice,
  calculateCustomOrderPrice
} 