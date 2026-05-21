// const express = require("express");
// const cors = require("cors");
// const sql = require("mssql");
// const config = require('./db');
// const { use } = require("react");
// const app = express();
// app.use(express.json())
// app.use(cors());
// //app.use(express.json());



// app.get("/TotalOrders", async (req, res) => {

//     try {

//         let pool = await sql.connect(config)

//         let result = await pool.request().query("SELECT COUNT(*) AS TotalOrders FROM MenuItems");

//         res.json(result.recordset[0].TotalOrders);
//     }
//     catch (err) {
//         res.send(error.message)
//     }
// });

// // MenuItems


// app.get("/MenuItems", async (req, res) => {

//     try {

//         let pool = await sql.connect(config)

//         let result = await pool.request().query("SELECT COUNT(*) AS TotalOrders FROM MenuItems");

//         res.json(result.recordset[0].TotalOrders);
//     }
//     catch (err) {
//         res.send(error.message)
//     }
// });





// // app.get("/username", async (req, res) => {

// //     try {
// //         const pool = await sql.connect(config);
// //         let result = await pool.request().query("select NAME , CUSID from CUSTOMER")
// //         res.json(result.recordset[0]);
// //     }
// //     catch (err) {
// //         return res.status(500).send(err.message);
// //     }


// // })

// app.get("/getcurrentid", async (req, res) => {
//     try {
//         const pool = await sql.connect(config);

//         let result = await pool
//             .request()
//             .query("SELECT MAX(CUSID)  AS currentId FROM CUSTOMER");

//         res.json({ 
//             currentId: result.recordset[0].currentId || 0 
//         });

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
// // /api/get-Phone-number

// app.get("/getPhonenumber", async (req, res) => {
//     try {
//         const pool = await sql.connect(config);

//         let result = await pool
//             .request()
//             .query("SELECT PHONENUMBER AS PHONE FROM CUSTOMER where CUSID = (SELECT MAX(CUSID) FROM CUSTOMER)");

//         res.json({ currentId: result.recordset[0] });

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });


// app.get("/getOrderID", async (req, res) => {
//     try {
//         const pool = await sql.connect(config);

//         let result = await pool
//             .request()
//             .query("SELECT MAX(Order_ID) AS currentId FROM Orders");

//         res.json({ 
//             currentId: result.recordset[0].currentId || 0 
//         });

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// //getname
// app.get("/getname", async (req, res) => {
//     try {
//         const pool = await sql.connect(config);

//         let result = await pool
//             .request()
//             .query("SELECT NAME FROM CUSTOMER where CUSID = (SELECT MAX(CUSID) FROM CUSTOMER)");

//         res.json(result.recordset[0]);

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });



// // sendquantity

// // app.post("/sendOrderItems", async (req, res) => {
// //     try {
// //         const { CustomerID, ItemCode, Quantity } = req.body;

// //         let pool = await sql.connect(config);

// //         await pool.request()
// //             .input("CustomerID", sql.Int, CustomerID)
// //             .input("ItemCode", sql.Int, ItemCode)
// //             .input("Quantity", sql.Int, Quantity)
// //             .query(` INSERT INTO Orders (CustomerID ,ItemCode, Quantity)VALUES (@CustomerID ,@ItemCode, @Quantity)`);

// //         res.json({ message: "Order saved" });

// //     } catch (err) {
// //         res.status(500).send(err.message);
// //     }
// // });
// app.post("/sendOrderItems", async (req, res) => {
//     try {
//         const { Order_ID , ItemCode ,Quantity } = req.body;

//         let pool = await sql.connect(config);

//         for (let item of OrderItems) {
//             await pool.request()
//                 .input("Order_ID", sql.BigInt, item.Order_ID)
//                 .input("ItemCode", sql.Int, item.ItemCode)
//                 .input("Quantity", sql.Int, item.Quantity)
//                 .query(`
//                     INSERT INTO OrderItems (Order_ID, ItemCode, Quantity)  VALUES (@Order_ID, @ItemCode, @Quantity)
//                 `);
//         }

//         res.json({ message: "Order items saved" });

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });


// app.post("/getCustomerID", async (req, res) => {
//     try {
//         const { CustomerID } = req.body;

//         let pool = await sql.connect(config);

//         const result = await pool.request()
//             .input("CustomerID", sql.Int, CustomerID)
//             .query(`
//                 INSERT INTO Orders (CustomerID)
//                 OUTPUT INSERTED.Order_ID
//                 VALUES (@CustomerID)
//             `);

//         res.json({ orderId: result.recordset[0].Order_ID });

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
// // app.post("/getCustomerID", async (req, res) => {
// //     try {
// //         const { CustomerID } = req.body;

// //         let pool = await sql.connect(config);

// //         const result = await pool.request()
// //             .input("CustomerID", sql.Int, CustomerID)
// //             .query(`
// //                 INSERT INTO Orders (CustomerID)
// //                 VALUES (@CustomerID)
// //             `);

// //         res.json({ message: "Order saved successfully" });

// //     } catch (err) {
// //         res.status(500).send(err.message);
// //     }
// // });
// // app.post("/getCustomerID", async (req, res) => {
// //     try {
// //         const { CustomerID } = req.body;

// //         let pool = await sql.connect(config);

         
// //             await pool.request()
// //                 .input("CustomerID", sql.Int, CustomerID)
// //                 .query(`
// //                     INSERT INTO Orders (CustomerID) VALUES (@CustomerID)`);
        

// //         res.json({ message: "Order saved successfully" });

// //     } catch (err) {
// //         res.status(500).send(err.message);
// //     }
// // });



// //date-api
// app.get("/date-api", async (req, res) => {
//     try {
//         const pool = await sql.connect(config);

//         let result = await pool
//             .request()
//             .query("SELECT MAX(OrderDate) AS currentId FROM Orders");

//         res.json({ 
//             currentId: result.recordset[0].currentId || 0 
//         });

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.post("/api/adduserdetail", async (req, res) => {

//     try {
//         const { NAME, PHONENUMBER } = req.body;

//         let pool = await sql.connect(config);
//         await pool.request()
//             .input("NAME", sql.VarChar, NAME)
//             .input("PHONENUMBER", sql.Int, PHONENUMBER)
//             .query(`INSERT INTO CUSTOMER (NAME,PHONENUMBER) VALUES (@NAME,@PHONENUMBER) `)

//         return res.json({ message: "Inserted successfully" });
//     }
//     catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// })


// app.get("/totalsales", (req, res) => {

//     res.send("1,240")
// })

// app.get("/products", async (req, res) => {
//     try {
//         let pool = await sql.connect(config);

//         let result = await pool.request().query("SELECT TOTALSALE FROM POSADMINTB");

//         res.json(result.recordset);
//     }
//     catch (err) {
//         res.send(err.message);
//     }
// });

// app.get("/item", async (req, res) => {
//     try {
//         let pool = await sql.connect(config);
//         let result = await pool.request().query("SELECT * FROM MenuItems");


//         return res.json(result.recordset);

//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// });

// //Inventoryitem

// app.get("/Inventoryitem", async (req, res) => {
//     try {
//         let pool = await sql.connect(config);
//         let result = await pool.request().query("SELECT * FROM MenuItems");


//         return res.json(result.recordset);

//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// });


// app.use(express.json());


// app.post("/post", async (req, res) => {
//     try {

//         const { ItemName, Price, Category, Description, IMAGEURL, IsAvailable } = req.body;

//         let pool = await sql.connect(config);

//         await pool.request()
//             .input("ItemName", sql.VarChar, ItemName)
//             .input("Price", sql.Int, Price)
//             .input("Category", sql.VarChar, Category)
//             .input("Description", sql.VarChar, Description)
//             .input("IsAvailable", sql.VarChar, IsAvailable)
//             .input("IMAGEURL", sql.VarChar, IMAGEURL)

//             .query(`
//     INSERT INTO MenuItems (ItemName, Price, Category,Description, IMAGEURL, IsAvailable) VALUES (@ItemName, @Price, @Category, @Description,@IMAGEURL,@IsAvailable)
//   `);
//         return res.json({ message: "Inserted successfully" });

//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// });




// app.use(express.json());

// const users = [
//     { email: "admin@gmail.com", password: "1234", role: "admin" },
//     { email: "user@gmail.com", password: "1234", role: "user" }
// ];

// app.post("/login", (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = users.find(
//             u => u.email === email && u.password === password
//         );

//         if (!user) {
//             return res.status(401).json({ message: "Invalid Credentials" });
//         }

//         return res.json({
//             email: user.email,
//             role: user.role
//         });

//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// });


// app.get("/foodquantity", async (req, res) => {
//     try {
//         let pool = await sql.connect(config);
//         let result = await pool.request().query("select ORDERquantity from quantity");


//         return res.json(result.recordset);

//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// });




// app.listen(5000, () => {
//     console.log("running");
// });













// // app.post("/post", async (req, res) => {




// //   try {

// //    const {
// //       ItemName,
// //       Price,
// //       IMAGEURL,
// //       Category,
// //       Description,
// //       IsAvailable
// //     } = req.body;

// //     if (!ItemName || !Price) {
// //       return res.status(400).json({ message: "Missing required fields" });
// //     }
// //     let pool = await sql.connect(config);

// //     await pool.request()
// //       .input("ItemName", sql.VarChar(100), ItemName)
// //   .input("Price", sql.Int, Price)
// //   .input("IMAGEURL", sql.VarChar(250), IMAGEURL)
// //   .input("Category", sql.VarChar(50), Category)
// //   .input("Description", sql.VarChar(150), Description)
// //   .input("IsAvailable", sql.Bit, IsAvailable)
// //       .query("INSERT INTO MenuItems (ItemName, Price, IMAGEURL, Category, Description, IsAvailable) VALUES (@ItemName, @Price , @ItemName,@IMAGEURL ,@Category, @Description, @IsAvailable)");

// //     return res.json({ message: "Inserted successfully" });

// //   } catch (err) {
// //     return res.status(500).json({ error: err.message });
// //   }
// // });



const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const config = require('./db');
const { use } = require("react");
const app = express();
app.use(express.json())
app.use(cors());
app.use(express.json());

const loginRouts = require("./routes/user")
const userRouts = require("./routes/login")


app.use("/",loginRouts)
app.use("/user",userRouts)

app.listen(5000, () => {
    console.log("running");
});