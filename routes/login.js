const express = require("express");
const router = express.Router();
const cors = require("cors");
const sql = require("mssql");
const config = require('../db');




const users = [
    { email: "admin@gmail.com", password: "1234", role: "admin" },
    { email: "user@gmail.com", password: "1234", role: "user" }
];
router.post("/loginuser/login", (req, res) => {
    try {
        const { email, password } = req.body;
        
   
        console.log("Frontend se ye data aaya:", { email, password });

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        return res.json({ email: user.email, role: user.role });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});



 module.exports = router;