require('dotenv').config()
const dns = require('dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])

const app = require('./src/app')
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`TaskFlow server running on port ${PORT}`)
  })
}

startServer()