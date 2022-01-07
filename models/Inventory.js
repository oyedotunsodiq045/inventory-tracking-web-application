const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InventorySchema = new Schema(
  {
    itemCode: { type: String, required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: Number, required: true },
    totalStockValue: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Inventory', InventorySchema)
