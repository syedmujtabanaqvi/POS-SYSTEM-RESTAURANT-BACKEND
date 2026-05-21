const express = require("express");
const router = express.Router();
const cors = require("cors");
const sql = require("mssql");
const config = require('../db');

// TOTAL ORDER IN ADMIN PORTL
router.get("/TotalOrders", async (req, res) => {

    try {

        let pool = await sql.connect(config)

        let result = await pool.request().query("SELECT COUNT(*) AS TotalOrders FROM MenuItems");

        res.json(result.recordset[0].TotalOrders);
    }
    catch (err) {
        res.send(error.message)
    }
});
 module.exports = router;