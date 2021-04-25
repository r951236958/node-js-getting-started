const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

require('./db/dbConnect')

// const database = require('./database/db')
const path = require('path')
const app = express()

// require('./database')

app.use(bodyParser.json())
app.use(cors())

// mongoose.Promise = global.Promise

// mongoose
//   .connect(database.db, {
//     keepAlive: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(
//     () => {
//       console.log('Database connected sucessfully !')
//     },
//     (error) => {
//       console.log('Database could not be connected : ' + error)
//     }
//   )

// const connection = mongoose.connection

// connection.once('open', function () {
//   console.log('MongoDB connection established.')
// })

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
