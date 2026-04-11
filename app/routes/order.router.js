const express = require('express');
const {
  createOrder,
  verifyPayment,
  getOrderById,
  getUserOrders
} = require('../controllers/order.controller');
const router = express.Router();

// Create new order
router.post('/create-order', createOrder);

// Verify payment
router.post('/verify-payment', verifyPayment);

// Get order by ID
router.get('/:orderId', getOrderById);

// Get all orders for a user
router.get('/user/:userId', getUserOrders);

module.exports = router;
