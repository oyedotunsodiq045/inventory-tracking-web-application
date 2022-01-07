const express = require('express')
const {
  exportInventories,
  getInventories,
  exportInventory,
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} = require('../controllers/inventories')

const router = express.Router()

router.route('/').get(getInventories).post(createInventory)

router.route('/export').get(exportInventories)

router
  .route('/:id')
  .get(getInventory)
  .put(updateInventory)
  .delete(deleteInventory)

router.route('/:id/export').get(exportInventory)

module.exports = router
