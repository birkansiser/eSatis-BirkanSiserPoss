export const allowedFileTypes = {
  gerber: ['.gbr', '.gbl', '.gtl', '.gbs', '.gts', '.gbo', '.gto'],
  excellon: ['.drl', '.txt', '.xln'],
  odbpp: ['.tgz', '.tar.gz'],
  zip: ['.zip']
}

export const validateFile = (file) => {
  const errors = []
  
  
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase()

  
  const allAllowedExtensions = Object.values(allowedFileTypes).flat()
  
  
  if (!allAllowedExtensions.includes(fileExtension)) {
    errors.push(`Desteklenmeyen dosya formatı. Desteklenen formatlar: ${allAllowedExtensions.join(', ')}`)
  }

  
  if (file.size > 50 * 1024 * 1024) {
    errors.push('Dosya boyutu çok büyük (maksimum 50MB)')
  }

  
  if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
    errors.push('Dosya adında sadece harf, rakam ve (._-) karakterleri kullanılabilir')
  }

  return errors
}


export const getFileType = (fileName) => {
  const extension = '.' + fileName.split('.').pop().toLowerCase()
  
  for (const [type, extensions] of Object.entries(allowedFileTypes)) {
    if (extensions.includes(extension)) {
      return type
    }
  }
  
  return 'unknown'
} 