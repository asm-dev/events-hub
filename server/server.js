// Importing Packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./routes/api')

// Middlewares
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api', api)


app.get('/', function (req, res) {
  res.send('Hello World')
})


// Server Port
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`Server is running on port ${port}`)
})
