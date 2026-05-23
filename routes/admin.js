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

// TOTAL SALES
router.get("/TOTALSALES", async (req, res) => {
    try {
        let pool = await sql.connect(config);

        let result = await pool.request().query(`
            SELECT SUM(oi.Quantity * m.Price) AS GrandTotal 
            FROM Orders o 
            INNER JOIN OrderItems oi ON o.Order_ID = oi.Order_ID 
            INNER JOIN MenuItems m ON oi.ItemCode = m.ItemCode;
        `);

        const totalSales = result.recordset[0]?.GrandTotal || 0;

        res.json({ grandTotal: totalSales });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// //Inventoryitem
router.get("/Inventoryitem", async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM MenuItems");


        return res.json(result.recordset);

    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// MENU ITEMS

router.get("/MenuItems", async (req, res) => {

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



// ORDERS

router.get("/ALLORDERS", async (req, res) => {
    try {
        let pool = await sql.connect(config);

        let result = await pool.request().query(`
            SELECT 
                o.Order_ID,
                c.NAME AS CustomerName,
                c.PHONENUMBER,
                o.OrderDate,
                m.ItemName,
                oi.Quantity,
                m.Price,
                (oi.Quantity * m.Price) AS TotalPrice
            FROM Orders o
            INNER JOIN CUSTOMER c ON o.CustomerID = c.CUSID
            INNER JOIN OrderItems oi ON o.Order_ID = oi.Order_ID
            INNER JOIN MenuItems m ON oi.ItemCode = m.ItemCode;
        `);

        res.json(result.recordset);

    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).send(err.message);
    }
});



module.exports = router;