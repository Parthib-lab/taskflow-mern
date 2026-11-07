const express = require('express')
const taskRoutes = require('./routes/taskRoutes')
const cors = require('cors')

// Create Express application
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
// Task API routes
app.use('/api/tasks', taskRoutes)

// Test route
app.get('/', (req, res) => {
  res.send('TaskFlow Backend is Running!')
})

module.exports = app