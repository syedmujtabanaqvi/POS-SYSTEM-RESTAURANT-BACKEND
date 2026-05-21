const express = require("express");
const router = express.Router();
const cors = require("cors");
const sql = require("mssql");
const config = require('../db');



// ADD USER DETAILS NAME & PHONE NUMBER
router.post("/ADDUSERDETAILS", async (req, res) => {

    try {
        const { NAME, PHONENUMBER } = req.body;

        let pool = await sql.connect(config);
        await pool.request()
            .input("NAME", sql.VarChar, NAME)
            .input("PHONENUMBER", sql.Int, PHONENUMBER)
            .query(`INSERT INTO CUSTOMER (NAME,PHONENUMBER) VALUES (@NAME,@PHONENUMBER) `)

        return res.json({ message: "Inserted successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

// FOOD CARD API 
router.get("/FOODITEMS", async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM MenuItems");


        return res.json(result.recordset);

    } catch (err) {
        return res.status(500).send(err.message);
    }
});





// GET NAME 
router.get("/username", async (req, res) => {

    try {
        const pool = await sql.connect(config);
        let result = await pool.request().query("select NAME , CUSID from CUSTOMER")
        res.json(result.recordset[0]);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})


// GET CURRENT ID 
router.get("/GETCURRENTID", async (req, res) => {
    try {
        const pool = await sql.connect(config);

        let result = await pool
            .request()
            .query("SELECT MAX(CUSID)  AS currentId FROM CUSTOMER");

        res.json({ 
            currentId: result.recordset[0].currentId || 0 
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// SEND ORDER ITEMS TO DB 
 router.post("/SENDORDERITEMS", async (req, res) => {
    try {
        const { Order_ID , ItemCode ,Quantity } = req.body;

        let pool = await sql.connect(config);

        for (let item of OrderItems) {
            await pool.request()
                .input("Order_ID", sql.BigInt, item.Order_ID)
                .input("ItemCode", sql.Int, item.ItemCode)
                .input("Quantity", sql.Int, item.Quantity)
                .query(`
                    INSERT INTO OrderItems (Order_ID, ItemCode, Quantity)  VALUES (@Order_ID, @ItemCode, @Quantity)
                `);
        }

        res.json({ message: "Order items saved" });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET PHONE NUMBER

router.get("/GETPHONENUMBRT", async (req, res) => {
    try {
        const pool = await sql.connect(config);

        let result = await pool
            .request()
            .query("SELECT PHONENUMBER AS PHONE FROM CUSTOMER where CUSID = (SELECT MAX(CUSID) FROM CUSTOMER)");

        res.json({ currentId: result.recordset[0] });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

 module.exports = router;