const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();
  const trimmedMessage = message.trim();
  const phoneDigits = trimmedPhone.replace(/\D/g, "");

  if (
    trimmedName.length > 100 ||
    trimmedEmail.length > 254 ||
    trimmedPhone.length > 30 ||
    trimmedMessage.length > 2000 ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail) ||
    phoneDigits.length < 10 ||
    phoneDigits.length > 15
  ) {
    return res.status(400).json({ message: "Please provide valid contact details" });
  }

  const sql =
    "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [trimmedName, trimmedEmail, trimmedPhone, trimmedMessage], (err) => {
    if (err) {
      console.error("Contact message insert failed:", err.code, err.message);
      return res.status(500).json({ message: "Could not save your message" });
    }

    return res.status(201).json({ message: "Message received successfully" });
  });
});

module.exports = router;
