const path = require('path')
const fs = require('fs')

const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Dosya yüklenmedi' })
    }


    console.log('Yüklenen dosya:', {
      originalname: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    })

   
    res.status(200).json({
      fileId: req.file.filename,
      originalName: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
      message: 'Dosya başarıyla yüklendi'
    })
  } catch (error) {
    console.error('Dosya yükleme hatası:', error)
    

    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (unlinkError) {
        console.error('Dosya silinirken hata:', unlinkError)
      }
    }

    res.status(500).json({ 
      message: 'Dosya yüklenirken bir hata oluştu',
      error: error.message 
    })
  }
}

module.exports = {
  handleFileUpload
} 