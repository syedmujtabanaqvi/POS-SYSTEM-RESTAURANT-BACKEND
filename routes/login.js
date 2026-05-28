const express = require("express");
const router = express.Router();
const cors = require("cors");
const sql = require("mssql");
const config = require('../db');

router.get("/username", async (req, res) => {
    try {
        const pool = await sql.connect(config);
        let result = await pool.request().query("SELECT NAME, CUSID FROM CUSTOMER");
        res.json(result.recordset[0]);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post("/loginuser/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log("data from frontend:", { email, password });

        if (!email || !password) {
            return res.status(400).json({ message: "Email aur password zaroori hain." });
        }

        const pool = await sql.connect(config);

        const result = await pool.request()
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, password)
            .query("SELECT email, role FROM users WHERE email = @email AND password = @password");

        const rows = result.recordset;

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const user = rows[0];
        return res.json({ email: user.email, role: user.role });

    } catch (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;