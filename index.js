const express = require('express')
const compression = require('compression')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
require('dotenv').config()
require('./middlewares/passport')(passport)
const routes = require('./routes');
const PORT = process.env.PORT || 5000

mongoose.Promise = global.Promise
mongoose.connect(
  process.env.mongoURI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  },
)

//init app
const app = express()

//set up midwares
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 15,
    keys: [process.env.cookieKey],
  }),
)

app.use(passport.initialize())
app.use(passport.session())

// use routes
app.use(routes)

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
})
