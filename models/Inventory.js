const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

var connection = mongoose.createConnection('mongodb://localhost/shopify')
autoIncrement.initialize(connection)

const InventorySchema = new Schema(
  {
    sequence: { type: Number },
    itemCode: { type: String, required: true },
    itemName: { type: String, required: true },
    itemCity: {
      type: String,
      required: true,
      enum: [
        'San Francisco',
        'New York City',
        'Los Angeles',
        'Seattle',
        'Ottawa',
      ],
      default: 'San Francisco',
    }, // five possible cities only
    itemCityCurrentWeatherDescription: String,
    price: { type: Number, required: true },
    unit: { type: Number, required: true },
    totalStockValue: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

InventorySchema.plugin(autoIncrement.plugin, {
  model: 'Inventory',
  field: 'sequence',
  startAt: 1,
  incrementBy: 1,
})
module.exports = mongoose.model('Inventory', InventorySchema)
