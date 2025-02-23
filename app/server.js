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
app.use(cors({credentials: true}))
app.use(sessions({
  name : 'chat.sid',
  secret: "my secret",
  saveUninitialized:true,
  resave: true,
  store: store
}));

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('database connected!'))

app.use('/auth',auth)
app.use('/users',users)
app.use('/cars',car)

module.exports = app;