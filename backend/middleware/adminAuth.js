const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw new Error('Bu işlem için yetkiniz yok')
    }
    next()
  } catch (error) {
    res.status(403).json({ message: error.message })
  }
}

module.exports = adminAuth 