const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  carId: {
    type: Schema.Types.ObjectId,
    ref: "car",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: 'INR'
  },

  receipt: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['created', 'paid', 'cancelled'],
    default: 'created'
  },

  fromDate: Date,
  toDate: Date,

  isBooked: {
    type: Boolean,
    default: false
  },

  paymentId: {
    type: String,
    default: null
  },

  signature: {
    type: String,
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model('orders', orderSchema);