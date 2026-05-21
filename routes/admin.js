const express = require("express");
const router = express.Router();
const cors = require("cors");
const sql = require("mssql");
const config = require('../db');

// TOTAL ORDER IN ADMIN PORTL
router.get("/TOTALORDERS", async (req, res) => {

    try {

        let pool = await sql.connect(config)

        let result = await pool.request().query("SELECT COUNT(*) AS TotalOrders FROM MenuItems");

        res.json(result.recordset[0].TotalOrders);
    }
    catch (err) {
        res.send(error.message)
    }
});



// ADD FOOD items
router.post("/ADDFOODITEMS", async (req, res) => {
    try {

        const { ItemName, Price, Category, Description, IMAGEURL, IsAvailable } = req.body;

        let pool = await sql.connect(config);

        await pool.request()
            .input("ItemName", sql.VarChar, ItemName)
            .input("Price", sql.Int, Price)
            .input("Category", sql.VarChar, Category)
            .input("Description", sql.VarChar, Description)
            .input("IsAvailable", sql.VarChar, IsAvailable)
            .input("IMAGEURL", sql.VarChar, IMAGEURL)

            .query(`
    INSERT INTO MenuItems (ItemName, Price, Category,Description, IMAGEURL, IsAvailable) VALUES (@ItemName, @Price, @Category, @Description,@IMAGEURL,@IsAvailable)
  `);
        return res.json({ message: "Inserted successfully" });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
 module.exports = router;