const express = require("express");
const router = express.Router();
const cors = require("cors");
const sql = require("mssql");
const config = require('../db');


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




 module.exports = router;