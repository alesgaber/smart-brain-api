// grab the env variables
require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

// database init
const db = knex({
  client: 'pg',
  connection: process.env.LOCAL
    ? {
      host: '127.0.0.1',
      user: 'appuser',
      password: '1q2w3E*',
      database: 'smart-brain'
    }
    : {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
})

const app = express()

// midleware, dodamo json parser
app.use(cors())
app.use(express.json())

// methods
app.get('/', (req, res) => {
  res.json('wellcome')
})

// endpoints
app.post('/signin', signin.handleSignin(db, bcrypt)) // app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt)); look at signin.js
app.post('/register', (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
)
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))
app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}.`)
})
