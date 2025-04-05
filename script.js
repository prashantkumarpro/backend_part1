const express = require('express')
const app = express()

// middleware
app.use(function (req, res, next) {
  // req -> user's data
  // res -> server's code
  console.log('middleware working')
  next()
})

app.set('view engine', 'ejs')
app.use(express.static('./public'))

// routes
app.get('/', function (req, res) {
  res.render('index', { age: 33 })
})

app.get('/error', function (req, res, next) {
  throw Error('Pata nahi bhai')
})

app.get('/about', function (req, res) {
  res.render('about', { name: 'Prashant' })
})

app.get('/profile', function (req, res) {
  res.send('Hello from profile')
})
app.get('/profile/:username', function (req, res) {
  res.send(`Hello from ${req.params.username}`)
})

app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.listen(3000)
