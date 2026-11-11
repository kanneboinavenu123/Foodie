require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/foodie");
const contactRoutes = require("./routes/contact");
const db = require("./db");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Health Check
app.get("/", (req, res) => {
    res.status(200).send("Foodie API is running successfully!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 3000;

// Initialize contact_messages table
db.query(
    `CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(254) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
        if (err) {
            console.error(
                "Contact messages table initialization failed:",
                err
            );
            process.exit(1);
        }

        // Start server only once
        app.listen(PORT, "0.0.0.0", () => {
            console.log(
                `Foodie Backend running on port ${PORT}`
            );
        });
    }
);