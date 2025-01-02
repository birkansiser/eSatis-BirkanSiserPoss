require('dotenv').config()
const app = require('./app')
const adminRoutes = require('./routes/admin')

const PORT = process.env.PORT || 5000

app.use('/api/admin', adminRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 