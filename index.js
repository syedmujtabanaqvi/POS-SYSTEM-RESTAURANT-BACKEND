const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const config = require('./db');
const { use } = require("react");
const app = express();
app.use(express.json())
app.use(cors());
app.use(express.json());

const userRouts = require("./routes/user")
const LoginRouts = require("./routes/login")
const adminRouts = require("./routes/admin")
const billingRouts = require("./routes/billing")

app.use("/admin",adminRouts)
app.use("/",LoginRouts)
app.use("/user",userRouts)
app.use("/Biling",billingRouts)

app.listen(5000, () => {
    console.log("running");
});