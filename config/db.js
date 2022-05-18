const mongoose = require('mongoose')

const connectDB = async () => {
  // const conn = await mongoose.connect(process.env.MONGO_URI, {
  const conn = await mongoose.connect(process.env.LOCAL_MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
  // const conn = await mongoose
  //   .createConnection(process.env.MONGO_URI)
  //   .asPromise()
  // const conn = await mongoose
  //   .createConnection(process.env.LOCAL_MONGO_URI)
  //   .asPromise()

  // console.log(`MongoDB Connected: ${conn.host}`.cyan.underline.bold)
}

module.exports = connectDB
