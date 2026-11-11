const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");

const router = express.Router();

// ================= REGISTER =================

router.post("/signup", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `;

    db.query(
      sql,
      [username.trim(), email.trim(), hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
              message: "Email or username already exists",
            });
          }

          console.error("Signup error:", err);

          return res.status(500).json({
            message: "Could not create account",
          });
        }

        res.status(201).json({
          message: "User registered successfully",
        });
      },
    );
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
    });
  }
});

// ================= LOGIN =================

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const sql = `
          SELECT username, email, password
          FROM users
          WHERE email = ? OR username = ?
          LIMIT 1
    `;

  db.query(sql, [email, email], async (err, data) => {
    if (err) {
      console.error("LOGIN DATABASE ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (data.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, data[0].password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      // Never return the password or password hash.
      res.status(200).json({
        message: "Login successful",
        user: {
          username: data[0].username,
          email: data[0].email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Login failed",
      });
    }
  });
});

// ================= UPDATE PROFILE =================

// ================= UPDATE PROFILE =================

router.put("/profile", async (req, res) => {
  const { currentEmail, username, email, oldPassword, password } = req.body;

  if (!currentEmail || !username || !email || !oldPassword) {
    return res.status(400).json({
      message: "Username, email and old password are required",
    });
  }

  // Find user using their existing email
  const findUserSQL = `
    SELECT username, email, password
    FROM users
    WHERE email = ?
    LIMIT 1
  `;

  db.query(findUserSQL, [currentEmail], async (err, data) => {
    if (err) {
      console.error("PROFILE FETCH ERROR:", err);
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (data.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    try {
      // Verify old password
      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        data[0].password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Old password is incorrect",
        });
      }

      // Hash new password only if provided
      let hashedPassword = data[0].password;

      if (password && password.trim()) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Update user using existing email
      const updateSQL = `
        UPDATE users
        SET username = ?, email = ?, password = ?
        WHERE email = ?
      `;

      db.query(
        updateSQL,
        [
          username.trim(),
          email.trim(),
          hashedPassword,
          currentEmail,
        ],
        (updateError) => {
          if (updateError) {
            console.error("PROFILE UPDATE ERROR:", updateError);

            if (updateError.code === "ER_DUP_ENTRY") {
              return res.status(409).json({
                message: "Email already exists",
              });
            }

            return res.status(500).json({
              message: "Profile update failed",
            });
          }

          return res.status(200).json({
            message: "Profile updated successfully",
            user: {
              username: username.trim(),
              email: email.trim(),
            },
          });
        }
      );
    } catch (error) {
      console.error("PROFILE ERROR:", error);

      return res.status(500).json({
        message: "Profile update failed",
      });
    }
  });
});

module.exports = router;
