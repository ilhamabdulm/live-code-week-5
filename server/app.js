if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const errHandler = require('./middlewares/errHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.use(errHandler)

app.listen(PORT, function() {
  console.log('app listening on port', PORT)
})
