const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
require('colors')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

// Route files
const inventories = require('./routes/inventories')

// Load env vars
dotenv.config({
  path: './config/config.env',
})

// Connect DB
connectDB()

const app = express()

// Body parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/inventories', inventories)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow
      .bold
  )
)

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`.red)
  // Close server and exit process
  server.close(() => process.exit(1))
})
