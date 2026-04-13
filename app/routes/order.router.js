const express = require('express');

const {
  createOrder,
  verifyPayment,
  getOrderById,
  getUserOrders,
  getAllOrders
} = require('../controllers/order.controller');

const { authenticateJWT, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-order', createOrder);

router.post('/verify-payment', verifyPayment);

router.get(
  '/admin/orders',
  authenticateJWT,
  isAdmin,
  getAllOrders
);

router.get('/:orderId', getOrderById);

router.get('/user/:userId', getUserOrders);

module.exports = router;