const { promise, async, resolve, reject } = require("q");
const sql = require("../Config/dbconfig");

exports.DB_INSERT = (table, field, data) => {
  return new promise(async (resolve, reject) => {
    let db_field = field.join(",");
    let db_data = data.join("','");
    var query =
      "INSERT INTO " + table + " (" + db_field + ") VALUES ('" + db_data + "')";

    await sql.query(query, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

exports.DB_UPDATE = () => {
  console.log("update");
};

exports.DB_DELETE = () => {
  console.log("delete");
};

exports.DB_NUM_ROWS = async (table, where) => {

  return new Promise(async (resolve, reject) => {

    var rows_count = 0;
    var query = "SELECT * FROM " + table + " " + where + " ";
    await sql.query(query, (err, result) => {
      if (err) {
        rows_count = 0;
        reject(0);
      } else {
        rows_count = result.length;
        resolve(rows_count);
      }
    });

  });
  
};


exports.DB_FETCH_OBJECT = async(table, where) =>{

    return new promise(async (resolve,reject) =>{

        var query = "SELECT * FROM " + table + " " + where + " ";

        await sql.query(query, (err, result) => {
            if (err) {

              reject(0);
            } else {
              
              resolve(result);
            }
          });


    })


}



exports.DB_FETCH_OBJECT = async(table, where) =>{

    return new promise(async (resolve,reject) =>{

        var query = "SELECT * FROM " + table + " " + where + " ";

        await sql.query(query, (err, result) => {
            if (err) {

              reject(0);
            } else {
              
              resolve(result);
            }
          });


    })


}


//SUB DIVISION AREA 

exports.PRODUCT_SUB = async(table, where) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT * FROM " + table + " " + where + "  group by subdivision ";

     
      
      await sql.query(query, (err, result) => {
          if (err) {

            reject(0);
          } else {
            
            resolve(result);
          }
        });


  })


}


exports.PRODUCT_SUB_ALL = async(table, where) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT subdivision FROM " + table + " " + where + "  group by subdivision ";
     ;
      await sql.query(query, (err, result) => {
          if (err) {

            reject(0);
          } else {
            
            resolve(result);
          }
        });


  })


}







//PRODUCT DETAILS AREA 



exports.PRODUCT_BIND = async(table, where) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT * FROM " + table + " " + where + " ";

      await sql.query(query, (err, result) => {
          if (err) {

            reject(0);
          } else {
            
            resolve(result);
          }
        });


  })


}


exports.PRODUCT_BEDBIND = async(table, where) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT bed_type,bed_type_status FROM " + table + " " + where + "  group by bed_type order by bed_type_status asc";

      await sql.query(query, (err, bed_result) => {
        if (err) {

          reject(0);
        } else {
          
          resolve(bed_result);
        }
        });


  })


}





//DIMENSION BINDER 


exports.DIMENSION_BIND = async(table, where) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT product_dimensions FROM " + table + " " + where + "    order by bed_type_status asc";


      console.log(query)
  
      await sql.query(query, (err, dimen_result) => {
        if (err) {

          reject(0);
        } else {
          
          resolve(dimen_result);
        }
        });


  })


}

exports.THICKNESS_BIND = async(table, where) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT thickness FROM " + table + " " + where + " and  bed_type_status=2  group by thickness order by bed_type_status asc limit 1";

      await sql.query(query, (err, dimen_result) => {
        if (err) {

          reject(0);
        } else {
          
          resolve(dimen_result);
        }
        });
        });





}




exports.DIMENSION_BIND_VAL = async(table, where,and) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT product_dimensions FROM " + table + " " + where + " "+ and +" GROUP BY product_dimensions  order by id asc";

console.log(query)
     
      await sql.query(query, (err, dimen_result) => {
        if (err) {

          reject(0);
        } else {
          
          resolve(dimen_result);
        }
        });


  })


}





exports.THICKNESS_BIND_VAL = async(table, where,and,another) =>{

  return new promise(async (resolve,reject) =>{


    if(another=="" || another==undefined)
    {
      var query = "SELECT thickness FROM " + table + " " + where + " "+ and+" group by thickness order by id asc ";
    }
    else{
      var query = "SELECT thickness FROM " + table + " " + where + " "+ and+" "+ another+" group by thickness order by id asc ";
    }


   ;

    

      await sql.query(query, (err, thickenss) => {
        if (err) {

          reject(0);
        } else {
          
          resolve(thickenss);
        }
        });
        });





}









exports.DIMENSION_BIND = async(table, where) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT product_dimensions FROM " + table + " " + where + "    order by bed_type_status asc";


      console.log(query)
  
      await sql.query(query, (err, dimen_result) => {
        if (err) {

          reject(0);
        } else {
          
          resolve(dimen_result);
        }
        });


  })


}

exports.COUPEN_BIND = async(table, where) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT * FROM " + table + " " + where + " order by id desc limit 1";

      await sql.query(query, (err, dimen_result) => {
        if (err) {

          reject(0);
        } else {
          
          resolve(dimen_result);
        }
        });
        });





}



exports.SQRFITRATE = async(table, where) =>{

  return new promise(async (resolve,reject) =>{

      var query = "SELECT * FROM " + table + " " + where + " order by id desc limit 1";
console.log(query)
      await sql.query(query, (err, dimen_result) => {
        if (err) {

          reject(0);
        } else {
          
          resolve(dimen_result);
        }
        });
        });





}