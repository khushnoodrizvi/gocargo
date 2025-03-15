const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const bodyParser = require('body-parser');
const sessions = require('express-session')
const mongoDBStrore = require('connect-mongodb-session')(sessions)
const users = require('./routes/router')
const auth = require('./routes/auth.router')
const car = require('./routes/car.router')
const { DATABASE_URL } = require('./common/config');

const app = express()

mongoose.connect(DATABASE_URL);

const store = new mongoDBStrore({
  uri: DATABASE_URL,
  collection: "session"
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(sessions({
  name : 'gocargo.sid',
  secret: "my secret",
  saveUninitialized:true,
  resave: true,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Important for local testing
    httpOnly: true, // Prevents XSS attacks
    sameSite: "lax", // Allows cross-origin cookies for navigation
    maxAge: 1000 * 60 * 60 * 24,
    path: "/", // Cookie path 
  },
}));

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('database connected!'))

app.use((req, res, next) => {
  console.log(req.session)
  next();
})

app.use('/auth',auth)
app.use('/users',users)
app.use('/cars',car)

module.exports = app;