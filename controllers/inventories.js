// https://www.tabnine.com/code/javascript/functions/json2csv/json2csv
const { Parser } = require('json2csv')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Inventory = require('../models/Inventory')
require('colors')
// const { clearKey } = require('../middleware/cache')

// @desc    Export all Inventories
// @route   Export /api/v1/inventories/export
// @access  Public
exports.exportInventories = asyncHandler(async (req, res, next) => {
  const inventories = await Inventory.find()
  var filename = ['Inventories-', Date.now()].join('')
  var fields = [
    '_id',
    'itemCode',
    'itemName',
    'price',
    'unit',
    'totalStockValue',
    'createdAt',
    'updatedAt',
  ]
  var fieldNames = [
    '#',
    'Item Code',
    'Item Name',
    'Price/Unit ($)',
    'Units',
    'Total Stock Values ($)',
    'Created At',
    'Updated At',
  ]
  const json2csvParser = new Parser({ fields })
  const csv = json2csvParser.parse(inventories)
  res.set(
    'Content-Disposition',
    ['attachment; filename=', filename, '.csv'].join('')
  )
  res.end(csv)
})

// @desc    Get all Inventories
// @route   GET /api/v1/inventories
// @access  Public
exports.getInventories = asyncHandler(async (req, res, next) => {
  const inventories = await Inventory.find()
  // const inventories = await Inventory.find().cache({
  //   time: 10,
  // })

  res.status(200).json({
    success: true,
    count: inventories.length,
    data: inventories,
  })
})

// @desc    Export single Inventory
// @route   Export /api/v1/inventories/:id/export
// @access  Public
exports.exportInventory = asyncHandler(async (req, res, next) => {
  const inventory = await Inventory.findById(req.params.id)

  if (!inventory) {
    return next(
      new ErrorResponse(`Inventory not found with id of ${req.params.id}`, 404)
    )
  }
  var filename = ['Inventory-', Date.now()].join('')
  var fields = [
    '_id',
    'itemCode',
    'itemName',
    'price',
    'unit',
    'totalStockValue',
    'createdAt',
    'updatedAt',
  ]
  var fieldNames = [
    '#',
    'Item Code',
    'Item Name',
    'Price/Unit ($)',
    'Units',
    'Total Stock Values ($)',
    'Created At',
    'Updated At',
  ]

  const json2csvParser = new Parser({ fields })
  const csv = json2csvParser.parse(inventory)
  res.set(
    'Content-Disposition',
    ['attachment; filename=', filename, '.csv'].join('')
  )
  res.end(csv)
})

// @desc    Get single Inventory
// @route   GET /api/v1/inventories/:id
// @access  Public
exports.getInventory = asyncHandler(async (req, res, next) => {
  const inventory = await Inventory.findById(req.params.id)
  // const inventory = await Inventory.findById(req.params.id).cache({
  //   time: 10,
  // })

  if (!inventory) {
    return next(
      new ErrorResponse(`Inventory not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: inventory,
  })
})

// @desc    Create new Inventory
// @route   POST /api/v1/inventories
// @access  Public
exports.createInventory = asyncHandler(async (req, res, next) => {
  const inventory = await Inventory.create(req.body)

  res.status(201).json({
    success: true,
    data: inventory,
  })
})

// @desc    Update Inventory
// @route   PUT /api/v1/inventories/:id
// @access  Public
exports.updateInventory = asyncHandler(async (req, res, next) => {
  const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!inventory) {
    return next(
      next(
        new ErrorResponse(
          `Inventory not found with id of ${req.params.id}`,
          404
        )
      )
    )
  }

  res.status(200).json({
    success: true,
    data: inventory,
  })
})

// @desc    Delete Inventory
// @route   DELETE /api/v1/inventories/:id
// @access  Public
exports.deleteInventory = asyncHandler(async (req, res, next) => {
  const inventory = await Inventory.findByIdAndDelete(req.params.id)

  if (!inventory) {
    return next(
      next(
        new ErrorResponse(
          `Inventory not found with id of ${req.params.id}`,
          404
        )
      )
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})
