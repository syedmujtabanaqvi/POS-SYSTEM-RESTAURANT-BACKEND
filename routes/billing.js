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
        let result = await pool.request().query("select NAME from CUSTOMER where CUSID =(SELECT MAX(CUSID)FROM CUSTOMER) ")
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
            .query("SELECT ISNULL(MAX(Order_ID), 0) AS CurrentOrderID FROM Orders");

        let latestId = result.recordset[0].CurrentOrderID;

        res.json({ currentId: latestId });

    } catch (err) {
        console.error("Database Error:", err);
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


router.get("/ORDERTOTAL", async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool
            .request()
            .query(`
                SELECT 
                    ISNULL(ROUND(SUM(oi.Quantity * m.Price) * 1.05, 0), 0) AS FinalBillWithTax 
                FROM OrderItems oi 
                INNER JOIN MenuItems m ON oi.ItemCode = m.ItemCode 
                WHERE oi.Order_ID = (SELECT MAX(Order_ID) FROM Orders);
            `);

        const totalAmount = result.recordset[0] ? result.recordset[0].FinalBillWithTax : 0;
        
        res.json({ ordertotal: totalAmount });

    } catch (err) {
        res.status(500).send(err.message);
    }
});


 module.exports = router;