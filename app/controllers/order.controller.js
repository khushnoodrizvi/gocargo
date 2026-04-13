const Order = require("../models/order.model");
const Car = require("../models/car.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, userId, carId } = req.body;

    if (!amount || !userId || !carId) {
      return res
        .status(400)
        .json({ message: "amount, userId, carId required" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = new Order({
      razorpayOrderId: razorpayOrder.id,
      userId,
      carId,
      amount,
      currency: "INR",
      receipt: options.receipt,
      status: "created",
    });

    await order.save();

    res.status(201).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      dbOrderId: order._id,
      message: "Order created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        status: "paid",
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        updatedAt: Date.now(),
      },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Car.findByIdAndUpdate(order.carId, {
      isBooked: true,
    });

    res.status(200).json({
      success: true,
      message: "Payment verified + Car booked successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("userId", "name email")
      .populate("carId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order",
      error: error.message,
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("carId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("carId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};
