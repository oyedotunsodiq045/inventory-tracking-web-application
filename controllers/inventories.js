const { Parser } = require('json2csv')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Inventory = require('../models/Inventory')
require('colors')
const moment = require('moment')
const weather = require('openweather-apis')
weather.setLang('en')
// const { clearKey } = require('../middleware/cache')

// @desc    Get all Inventories created this month
// @route   GET /api/v1/inventories/month
// @access  Public
// @resource https://momentjscom.readthedocs.io/en/latest/moment/03-manipulating/03-start-of/
exports.getInventoriesCreatedThisMonth = asyncHandler(
  async (req, res, next) => {
    let start = moment().startOf('month') // set to the first of this month, 12:00 am
    let end = moment().endOf('month') // set to the last day of this month, 23:59 pm

    const inventories = await Inventory.find({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    })

    // const inventories = await Inventory.find({
    //   createdAt: {
    //     $gte: start,
    //     $lt: end,
    //   },
    // }).cache({
    //   time: 10,
    // })

    res.status(200).json({
      success: true,
      count: inventories.length,
      data: inventories,
    })
  }
)

// @desc    Get all Inventories created this week
// @route   GET /api/v1/inventories/week
// @access  Public
exports.getInventoriesCreatedThisWeek = asyncHandler(async (req, res, next) => {
  let start = moment().startOf('week') // set to the first day of this week, 12:00 am
  let end = moment().endOf('week') // set to the last day of this week, 23:59 pm

  const inventories = await Inventory.find({
    createdAt: {
      $gte: start,
      $lt: end,
    },
  })

  // const inventories = await Inventory.find({
  //   createdAt: {
  //     $gte: start,
  //     $lt: end,
  //   },
  // }).cache({
  //   time: 10,
  // })

  res.status(200).json({
    success: true,
    count: inventories.length,
    data: inventories,
  })
})

// @desc    Get all Inventories created today
// @route   GET /api/v1/inventories/today
// @access  Public
exports.getInventoriesCreatedToday = asyncHandler(async (req, res, next) => {
  // Using Mongoose
  // let start = new Date();
  // start.setHours(0,0,0,0);

  // let end = new Date();
  // end.setHours(23,59,59,999);

  // Using Moment
  let start = moment().startOf('day') // set to 12:00 am today
  let end = moment().endOf('day') // set to 23:59 pm today

  const inventories = await Inventory.find({
    createdAt: {
      $gte: start,
      $lt: end,
    },
  })

  // const inventories = await Inventory.find({
  //   createdAt: {
  //     $gte: start,
  //     $lt: end,
  //   },
  // }).cache({
  //   time: 10,
  // })

  res.status(200).json({
    success: true,
    count: inventories.length,
    data: inventories,
  })
})

// @desc    Export all Inventories
// @route   Export /api/v1/inventories/export
// @access  Public
// @resource // https://www.tabnine.com/code/javascript/functions/json2csv/json2csv
exports.exportInventories = asyncHandler(async (req, res, next) => {
  const inventories = await Inventory.find()
  var filename = ['Inventories-', Date.now()].join('')
  const fields = [
    {
      label: '#',
      value: '_id',
    },
    {
      label: 'Item Code',
      value: 'itemCode',
    },
    {
      label: 'Item Name',
      value: 'itemName',
    },
    {
      label: 'Item City',
      value: 'itemCity',
    },
    {
      label: 'Current Weather',
      value: 'itemCityCurrentWeatherDescription',
    },
    {
      label: 'Price/Unit ($)',
      value: 'price',
    },
    {
      label: 'Units',
      value: 'unit',
    },
    {
      label: 'Total Stock Values ($)',
      value: 'totalStockValue',
    },
    {
      label: 'Created At',
      value: 'createdAt',
    },
    {
      label: 'Updated At',
      value: 'updatedAt',
    },
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
  const fields = [
    {
      label: '#',
      value: '_id',
    },
    {
      label: 'Item Code',
      value: 'itemCode',
    },
    {
      label: 'Item Name',
      value: 'itemName',
    },
    {
      label: 'Item City',
      value: 'itemCity',
    },
    {
      label: 'Current Weather',
      value: 'itemCityCurrentWeatherDescription',
    },
    {
      label: 'Price/Unit ($)',
      value: 'price',
    },
    {
      label: 'Units',
      value: 'unit',
    },
    {
      label: 'Total Stock Values ($)',
      value: 'totalStockValue',
    },
    {
      label: 'Created At',
      value: 'createdAt',
    },
    {
      label: 'Updated At',
      value: 'updatedAt',
    },
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
  let ItemCityWeatherDescription, inventory
  // get ItemCityWeatherDescription
  function getItemCityWeatherDescription() {
    setTimeout(() => {
      // set city by name
      weather.setCity(req.body.itemCity)
      // check http://openweathermap.org/appid#get for get the APPID
      weather.setAPPID(process.env.OPEN_WEATHER_APPID)
      // get a simple JSON Object with temperature, humidity, pressure and description
      weather.getSmartJSON(async function getICWD(err, smart) {
        // console.log(smart)
        ItemCityWeatherDescription = smart.description
        // return ItemCityWeatherDescription
      })
    }, 1000)
  }
  // create inventory
  function createInventory() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        req.body.itemCityCurrentWeatherDescription = ItemCityWeatherDescription
        console.log(req.body)
        inventory = Inventory.create(req.body)

        const error = false

        if (!error) {
          resolve()
        } else {
          reject('Error: Something went wrong!')
        }
      }, 2000)
    })
  }

  async function init() {
    await getItemCityWeatherDescription()
    createInventory()
  }
  init()

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
