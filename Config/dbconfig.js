// const mysql = require('mysql');
// require("dotenv").config(); //TODO USE ENVIRONMENT VARIABLE

// //TODO: DATABASE CREDENTIAL
// // const dbconnect = mysql.createConnection({
   
// //    host:"217.21.90.16",
// //    user:"u586670680_poppy_ecom" ,
// //    password: "Poppy@123",
// //    database: "u586670680_poppy_ecom",
// // })

// const dbconnect = mysql.createConnection({
//     host:"217.21.90.16",
//     user:"u586670680_poppy_ecom" ,
//     password: "Poppy@123",
//     database: "u586670680_poppy_ecom",
//     port: 3306,
//   });

// //TODO: DATABA CONNECTION
// dbconnect.connect(function(err) {
//     if(err) throw err; //TODO: THROW IF ANY ERROR WHILE CONNECTING DB
//     console.log(`db connection is successfull`);//TODO: SUCCESS OF DB CONNECTION
// });




var db_config = {
  host:"217.21.90.16",
    user:"u586670680_poppy_ecom" ,
    password: "Poppy@123",
    database: "u586670680_poppy_ecom",
    port: 3306,
};

var dbconnect;

function handleDisconnect() {
  dbconnect = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  dbconnect.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  dbconnect.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();


module.exports = dbconnect;

