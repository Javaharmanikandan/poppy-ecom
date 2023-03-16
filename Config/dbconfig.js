const mysql = require('mysql');
require("dotenv").config(); //TODO USE ENVIRONMENT VARIABLE

//TODO: DATABASE CREDENTIAL
// const dbconnect = mysql.createConnection({
   
//    host:"217.21.90.16",
//    user:"u586670680_poppy_ecom" ,
//    password: "Poppy@123",
//    database: "u586670680_poppy_ecom",
// })

const dbconnect = mysql.createConnection({
    host:"217.21.90.16",
    user:"u586670680_poppy_ecom" ,
    password: "Poppy@123",
    database: "u586670680_poppy_ecom",
  });

//TODO: DATABA CONNECTION
dbconnect.connect(function(err) {
    if(err) throw err; //TODO: THROW IF ANY ERROR WHILE CONNECTING DB
    console.log(`db connection is successfull`);//TODO: SUCCESS OF DB CONNECTION
});

module.exports = dbconnect;
