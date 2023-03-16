const mysql = require('mysql');
// require("dotenv").config(); //TODO USE ENVIRONMENT VARIABLE

//TODO: DATABASE CREDENTIAL
const dbconnect = mysql.createConnection({
   
   port:"3306",
   host:"68.178.145.117",
   user:"poppy_ecom" ,
   password: "poppy_ecom",
   database: "poppy_ecom",

})

//TODO: DATABA CONNECTION
dbconnect.connect(function(err) {
    if(err) throw err; //TODO: THROW IF ANY ERROR WHILE CONNECTING DB
    console.log(`db connection is successfull`);//TODO: SUCCESS OF DB CONNECTION
});

module.exports = dbconnect;
