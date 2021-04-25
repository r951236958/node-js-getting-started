const mongoose = require('mongoose')
require('dotenv').config()

// const connection = process.env.DB_URL

// mongoose
//   .connect(connection, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log('Successfully connected to MongoDB Atlas!'))
//   .catch((error) => {
//     console.log('Unable to connect to MongoDB Atlas!')
//     console.log(error)
//   })

const URI = process.env.MONGODB_URI

mongoose.Promise = global.Promise

// use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
mongoose
  .connect(URI, {
    //   these are options to ensure that the connection is done properly
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!')
    console.log(error)
  })

const connection = mongoose.connection

connection.once('open', () =>
  console.log('MongoDB Database Extablished Successfully')
)
