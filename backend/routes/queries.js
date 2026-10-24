const express = require("express");
const mongoose = require("mongoose");
const Query = require("../models/Query");
const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

const formatQuery = (q) => ({
  id: q._id.toString(),
  name: q.name,
  email: q.email,
  subject: q.subject,
  message: q.message,
  status: q.status,
  createdAt: q.createdAt,
});

// ---------------------------------------------------------
// Contact form se message bhejo (login zaroori nahi)
// ---------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const clean = (value) => String(value || "").trim();

    const data = {
      name: clean(req.body.name),
      email: clean(req.body.email),
      subject: clean(req.body.subject),
      message: clean(req.body.message),
    };

    if (Object.values(data).some((value) => !value)) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    await Query.create(data);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    // Bahut lamba text bhejne par mongoose validation error deta hai
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Message ya subject bahut lamba hai" });
    }

    console.log("SEND QUERY ERROR:", error);
    res.status(500).json({ message: "Message send nahi hua" });
  }
});

// ---------------------------------------------------------
// Admin: saare queries
// ---------------------------------------------------------
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.json(queries.map(formatQuery));
  } catch (error) {
    console.log("GET QUERIES ERROR:", error);
    res.status(500).json({ message: "Queries fetch nahi ho paayi" });
  }
});

// ---------------------------------------------------------
// Admin: New / Read status change
// body: { status: "Read" }
// ---------------------------------------------------------
router.patch("/:id/status", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid query id" });
    }

    if (!["New", "Read"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const query = await Query.findByIdAndUpdate(id, { status }, { new: true });

    if (!query) {
      return res.status(404).json({ message: "Query nahi mili" });
    }

    res.json({ id: query._id.toString(), status: query.status });
  } catch (error) {
    console.log("UPDATE QUERY ERROR:", error);
    res.status(500).json({ message: "Status update nahi hua" });
  }
});

// ---------------------------------------------------------
// Admin: query delete
// ---------------------------------------------------------
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid query id" });
    }

    const query = await Query.findByIdAndDelete(id);

    if (!query) {
      return res.status(404).json({ message: "Query nahi mili" });
    }

    res.json({ message: "Query deleted" });
  } catch (error) {
    console.log("DELETE QUERY ERROR:", error);
    res.status(500).json({ message: "Delete nahi hua" });
  }
});

module.exports = router;
