const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST feedback
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;