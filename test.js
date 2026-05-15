// const express = require("express");
// const cors = require("cors");
// const sql = require("mssql");
// const  config = require('./db');

// const app = express();
// app.use(cors());



// async function connectandQuery() {


//     try {

//         let pool = await sql.connect(config);
//         let result = await pool.request().query('select * from POSADMINTB');
//         console.log(result.recordset);

//     } catch (error) {

//         console.log('error is ', JSON.stringify(error, null, 2));

//     } finally {
//         await sql.close();
//     }

// }

// connectandQuery();


const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const config = require('./db'); // Ensure this file is named db.js

const app = express();
app.use(cors());

async function connectandQuery() {
    try {
        let pool = await sql.connect(config);
        
        let result = await pool.request().query('SELECT * FROM POSADMINTB');
        
        console.log("Data retrieved:");
        console.table(result.recordset); 

    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        await sql.close();
    }
}

connectandQuery();