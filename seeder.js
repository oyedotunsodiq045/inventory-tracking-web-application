const fs = require('fs')
const mongoose = require('mongoose')
require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({
  path: './config/config.env',
})

// Load models
const Inventory = require('./models/Inventory')

// Connect to DB
// mongoose.connect(process.env.MONGO_URI, {
mongoose.connect(process.env.LOCAL_MONGO_URI, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
})
// mongoose.createConnection(process.env.MONGO_URI).asPromise()
// mongoose.createConnection(process.env.LOCAL_MONGO_URI).asPromise()

// Read JSON files
const inventories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/inventories.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Inventory.create(inventories)

    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Inventory.deleteMany()

    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
