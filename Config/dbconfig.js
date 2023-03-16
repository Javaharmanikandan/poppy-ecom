const mysql = require('mysql');
require("dotenv").config(); //TODO USE ENVIRONMENT VARIABLE

//TODO: DATABASE CREDENTIAL
// const dbconnect = mysql.createConnection({
   
//    host:"68.178.145.117",
//    user:"poppy_ecom" ,
//    password: "poppy_ecom",
//    database: "poppy_ecom",

// })

// //TODO: DATABA CONNECTION
// dbconnect.connect(function(err) {
//     if(err) throw err; //TODO: THROW IF ANY ERROR WHILE CONNECTING DB
//     console.log(`db connection is successfull`);//TODO: SUCCESS OF DB CONNECTION
// });

// module.exports = dbconnect;
var db_config = {
   host:"68.178.145.117",
   user:"poppy_ecom" ,
   password: "poppy_ecom",
   database: "poppy_ecom",
  };
  
  var dbconnect;
  
  function handleDisconnect() {
    dbconnect = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    dbconnect.connect(function(err) {   
                   // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }  
      console.log(`db connection is successfull`);//TODO: SUCCESS OF DB CONNECTION                                   // to avoid a hot loop, and to allow our node script to
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

  module.exports = dbconnect
