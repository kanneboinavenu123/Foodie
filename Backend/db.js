require("dotenv").config({
    path: require("path").join(__dirname, ".env")
});

const mysql = require("mysql2");

const dbConfig = {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD ?? process.env.DB_PASSWORD ?? "",
    database: process.env.MYSQLDATABASE || process.env.DB_NAME
};

if (!dbConfig.host || !dbConfig.user || !dbConfig.database) {
    throw new Error("Missing MySQL database configuration");
}

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("MySQL Connected Successfully!");
    }
});

module.exports = db;
