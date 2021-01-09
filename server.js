const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const items = require('./route/api/items')

//Load config
dotenv.config({ path: './config/config.env' })

const app = express()

//Bodyparser Middleware//
app.use(bodyParser.json())

connectDB()

//Serve static assets if in production
if (process.env.Node_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//Use Routes
app.use('/api/items', items)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}`)
)
