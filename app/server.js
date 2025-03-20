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
const Razorpay = require('razorpay');

const app = express()

mongoose.connect(DATABASE_URL);

const store = new mongoDBStrore({
  uri: DATABASE_URL,
  collection: "session"
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const allowedOrigins = [
  "https://gocargo-1.netlify.app",
  "http://localhost:3000",
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

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

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Amount in paise (INR)
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

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