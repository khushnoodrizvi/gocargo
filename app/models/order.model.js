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
    enum: ['created', 'paid', 'pending', 'cancelled'],
    default: 'created'
  },
  paymentId: {
    type: String,
    default: null
  },
  signature: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('orders', orderSchema);
