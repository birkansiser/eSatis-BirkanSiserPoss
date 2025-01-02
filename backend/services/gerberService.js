const { exec } = require('child_process')
const path = require('path')

class GerberService {
  static async validateGerber(filePath) {
    try {
      // gerbv kullanarak Gerber dosyasını doğrulama
      const gerbvPath = path.join(__dirname, '../bin/gerbv')
      
      return new Promise((resolve, reject) => {
        exec(`${gerbvPath} --export=png --output=/dev/null ${filePath}`, (error) => {
          if (error) {
            reject(new Error('Geçersiz Gerber dosyası'))
          } else {
            resolve(true)
          }
        })
      })
    } catch (error) {
      throw new Error('Gerber doğrulama hatası')
    }
  }
}

module.exports = GerberService 