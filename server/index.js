const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
// require('./db/db-connect')

// const database = require('./database/db')
const path = require('path')
const app = express()

// require('./database')

app.use(bodyParser.json())
app.use(cors())


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

const userRoute = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
app.use('/users', userRoute)
app.use('/auth', authRouter)
// API
// const users = require('/api/users');
// app.use('/api/users', users);

// app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build'))
// })
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`)
})
