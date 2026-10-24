const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

const STATUSES = ["Pending", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

// Frontend ko jo shape chahiye (OrderConfirmation page isi shape pe bana hai)
const formatOrder = (order) => ({
  id: order._id.toString(),
  orderId: order.orderId,
  customer: order.customer,
  products: order.products.map((p) => ({
    id: p.productId ? p.productId.toString() : "",
    name: p.name,
    image: p.image,
    price: p.price,
    quantity: p.quantity,
  })),
  total: order.total,
  status: order.status,
  createdAt: order.createdAt,
  // admin list me populate hone par user ka naam/email milega
  user:
    order.user && order.user.name
      ? { name: order.user.name, email: order.user.email }
      : null,
});

// ---------------------------------------------------------
// Order place karo (login zaroori)
// body: { customer: {name, phone, address, city, pincode}, items: [{id, quantity}] }
// ---------------------------------------------------------
router.post("/", verifyToken, async (req, res) => {
  try {
    const { customer, items } = req.body;

    // Customer details check
    const fields = ["name", "phone", "address", "city", "pincode"];
    if (!customer || fields.some((f) => !String(customer[f] || "").trim())) {
      return res.status(400).json({ message: "Please fill all delivery details" });
    }

    // Items check
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Same product repeat ho to quantity jod do
    const qtyById = new Map();
    for (const item of items) {
      const qty = Number(item.quantity);

      if (!mongoose.isValidObjectId(item.id) || !Number.isInteger(qty) || qty < 1) {
        return res.status(400).json({ message: "Invalid cart item" });
      }

      qtyById.set(item.id, (qtyById.get(item.id) || 0) + qty);
    }

    // Price DB se lenge (frontend ke bheje price pe bharosa nahi)
    const products = await Product.find({ _id: { $in: [...qtyById.keys()] } });

    if (products.length !== qtyById.size) {
      return res.status(400).json({
        message: "Some products are no longer available. Please check your cart.",
      });
    }

    let total = 0;
    const orderProducts = products.map((product) => {
      const quantity = qtyById.get(product._id.toString());
      total += product.price * quantity;

      return {
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      };
    });

    const order = await Order.create({
      orderId: "SZ" + Date.now(),
      user: req.user.id,
      customer: {
        name: customer.name.trim(),
        phone: String(customer.phone).trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        pincode: String(customer.pincode).trim(),
      },
      products: orderProducts,
      total,
      status: "Pending",
    });

    res.status(201).json(formatOrder(order));
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    res.status(500).json({ message: "Order place nahi hua" });
  }
});

// ---------------------------------------------------------
// Logged-in user ke apne orders
// ---------------------------------------------------------
router.get("/my", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders.map(formatOrder));
  } catch (error) {
    console.log("MY ORDERS ERROR:", error);
    res.status(500).json({ message: "Orders fetch nahi ho paaye" });
  }
});

// ---------------------------------------------------------
// Admin: saare orders
// ---------------------------------------------------------
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders.map(formatOrder));
  } catch (error) {
    console.log("ALL ORDERS ERROR:", error);
    res.status(500).json({ message: "Orders fetch nahi ho paaye" });
  }
});

// ---------------------------------------------------------
// Admin: order ka status change karo
// body: { status: "Shipped" }
// ---------------------------------------------------------
router.patch("/:id/status", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    if (!STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Order nahi mila" });
    }

    res.json({ id: order._id.toString(), status: order.status });
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Status update nahi hua" });
  }
});

module.exports = router;
