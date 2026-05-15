// const sql = require("mssql");
const sql = require("mssql/msnodesqlv8");
// const config = {
//     server: "DESKTOP-33RGNJK",
//     database: "POSDB", // Jo aapka DB name hai
//     Authentication: {
//         Option:{
//             userName:'sos',
//             password:'sos1'
      
//     }},

//     Options:{
//        trustServerCertificate: true
//     }
// };


// module.exports = config

// const config = {
//     server: 'DESKTOP-33RGNJK', 
//     database: 'POSDB', // Apna DB name check kar lein
//     options: {
//         encrypt: false,
//         trustServerCertificate: true,
//         integratedSecurity: true // Ye line Windows login enable karegi
//     },
//     port: 1433
// };

// module.exports = config;
const config = {
    server: 'DESKTOP-33RGNJK',
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server};Server=DESKTOP-33RGNJK;Database=POSDB;Trusted_Connection=yes;'
};



module.exports = config;

// const config = {
//     server: 'DESKTOP-33RGNJK', // Ya 'DESKTOP-33RGNJK' likh do
//     database: 'POSDB',   // Apne database ka naam confirm rakhna
//     driver: 'msnodesqlv8',
//     options: {
//         trustedConnection: true, // Ye password ke bina connect karwayega
//         trustServerCertificate: true,
//         encrypt: false
//     }
// };

// module.exports = config;

// const sql = require("mssql");

// const config = {
//   user: "sos",
//   password: "sos1",
//   server: "localhost", // ya IP address
//   database: "POSDB",
//   options: {
//     encrypt: false, // local SQL Server ke liye
//     trustServerCertificate: true,
//   },
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000,
//   },
// };

// const poolPromise = new sql.ConnectionPool(config)
//   .connect()
//   .then((pool) => {
//     console.log("Database Connected Successfully");
//     return pool;
//   })
//   .catch((err) => {
//     console.log("Database Connection Failed:", err);
//   });

// module.exports = {
//   sql,
//   poolPromise,
// };