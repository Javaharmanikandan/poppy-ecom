const responseMsg = require("../response");
const crud = require("../Helper/crud");
const sql = require("../Config/dbconfig");
const commonJs = require("../Helper/common");
require("dotenv").config(); //TODO USE ENVIRONMENT VARIABLE
const crypto = require('crypto');
const Razorpay = require("razorpay");

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`)
  }
})
let upload = multer({ dest: './' })




//TODO: USER REGISTRATION
exports.userRegister = async (req, res) => {
  if (
    req.body.name === "" ||
    req.body.mobile === "" ||
    req.body.email === "" ||
    req.body.password === "" ||
    Object.keys(req.body).length === 0
    ) {
      res.send(responseMsg.request_missing);
    } else {
      var name = req.body.name;
      var mail = req.body.email;
      var mobile = req.body.mobile;
      var password = commonJs.encryptDecrypt(req.body.password, 'Encrypt');
      var currentDate = commonJs.currentDateTime();
      
      
      var table = "tbl_user";
      var field = [
        "uname",
        "email",
        "mobile",
        "password",
        "status",
        "created_at",
      ];
      var data = [name, mail, mobile, password, 1, currentDate];
      
      var email_count = await crud.DB_NUM_ROWS(
        "tbl_user",
        "where email='" + mail + "'"
        );
        var mobile_count = await crud.DB_NUM_ROWS(
          "tbl_user",
          "where mobile='" + mobile + "'"
          );
          
          //TODO CHECK DUPLICATE USER
          
          if (email_count === 0 && mobile_count === 0) {
            if (await crud.DB_INSERT(table, field, data)) {

              var object = await crud.DB_FETCH_OBJECT("tbl_user", "where email='" + mail + "'");



              //TODO INSERT USING HELPER
           //  res.send(responseMsg.success_insert);

              res.send({
                ResponseCode: 200,
                Result: "true",
                ResponseMsg: "Registered SuccessFully",
                ResponseData: object[0]
              });


            } else {
              res.send(responseMsg.failed_insert);
            }
          } else {
            
            
            res.send({
              ResponseCode: "401",
              Result: "false",
              ResponseMsg: "Email or Mobile Already Used",
            });
          }
        }
      };
      
      //TODO USER LOGIN
      exports.userLogin = async (req, res) => {
        

        console.log("Entered");
        if (req.body.uname === '' || req.body.password === '' || Object.keys(req.body).length === 0) {
          res.send(responseMsg.request_missing);
        } else {
          var mail = req.body.uname;
          var password = req.body.password;

        console.log(mail);
          var email_count = await crud.DB_NUM_ROWS("tbl_user", "where email='" + mail + "' OR mobile='" + mail+"'");
          
          
          if (email_count === 0) {
            res.send({
              ResponseCode: "401",
              Result: "false",
              ResponseMsg: "Please Register First",
            });
          } else {
            
            //TODO PASSWORD CHECK
            var object = await crud.DB_FETCH_OBJECT("tbl_user", "where email='" + mail + "' OR mobile='" + mail+"'");
            var decrypt_password = commonJs.encryptDecrypt(object[0].password, 'Decrypt');
            if (password === decrypt_password) {
              
              res.send({
                ResponseCode: 200,
                Result: "true",
                ResponseMsg: "Successfully Logged In",
                ResponseData: object[0]
              });
              
            } else {
              
              res.send({
                ResponseCode: 401,
                Result: "false",
                ResponseMsg: "Password Enterd Incorrectly",
              });
              
            }
            
            
            
          }
          
          
          
          
        }
        
      };
      
      
      
     
        exports.COUPON_DATA = async (req, res) => {
        
        
 
var c_for=req.body.c_for;
   


  data = await crud.DB_FETCH_OBJECT("coupen_code", "where c_for='"+c_for+"'  order by id desc limit 1");



          res.send({
            data: data,
      
          });
 
        
      };
      
      
      //TODO USER LOGIN
      exports.Product_serious = async (req, res) => {
        
        
        
        sql.query("SELECT category_name,id,category_id FROM tbl_category ORDER BY  view_type", function (err, result) {
          if (err) throw err;
         
          res.send({
            data: result
            
          });
          
        });
        
        
        
        
        
      };
      
      
        exports.Accessories_serious = async (req, res) => {
        try{

        
        
  const pillows = await crud.DB_FETCH_OBJECT("accessories", "where serious='PILLOWS' GROUP BY sub_serious order by id asc");

  const protector = await crud.DB_FETCH_OBJECT("accessories", "where serious='PROTECTOR' GROUP BY sub_serious order by id asc");


          res.send({
            pillows: pillows,
            protector:protector
            
          });
          
        }
        catch(err){

        }
        
        
        
        
        
      };
      
      
      
      
      
      
      
      //TODO USER LOGIN
      exports.Testimonials = async (req, res) => {
        
       
        
        sql.query("SELECT * FROM tbl_testimonial order by id desc", function (err, result) {
          if (err) throw err;
          
          res.send({
            data: result
            
          });
          
        });
        
        
        
        
        
      };
      



          exports.FESTIVEBANNER = async (req, res) => {
        
       
        
        sql.query("SELECT * FROM festive_banner order by id desc limit 3", function (err, result) {
          if (err) throw err;
          
          res.send({
            data: result
            
          });
          
        });
        
        
        
        
        
      };

   
     exports.FESTIVEBANNER_SETTINGS = async (req, res) => {

        sql.query("SELECT * FROM festive_settings order by id desc limit 1", function (err, result) {
          if (err) throw err;
          
          res.send({
            data: result
            
          });
          
        });
     
      };
  
      
      exports.Find_category_id = async (req, res) => {
        
        
        var view_id = req.body.view_id;
        
        
        var query_lim = "SELECT id,category_id FROM tbl_category WHERE view_type=" + view_id + " order by id desc limit 1";
        
        
        sql.query(query_lim, function (err, result) {
          if (err) throw err;
       
          res.send({
            data: result
            
          });
          
        });
        
      };
      
      
      
      
      
      exports.Product_list = async (req, res) => {
        
        
        var category_id = req.body.category_id;
        
        if (category_id === "all") {

          var query1 = "SELECT discount_percentage,id,category_id,product_name,product_imageurl,product_imageurl_1,product_imageurl_2,product_imageurl_3,product_type,product_id FROM product_information order by category_id asc";
        
        }
        else {

         

          var query1 = "SELECT discount_percentage,id,category_id,product_name,product_imageurl,product_imageurl_1,product_imageurl_2,product_imageurl_3,product_type,product_id FROM product_information WHERE category_name='" + category_id + "' order by id asc";

        }
        sql.query(query1, function (err, result) {
          if (err) throw err;
        
          res.send({
            data: result
            
          });
          
        });
        
      };
      
      
            exports.AccessoriesList = async (req, res) => {
        
        
        var category_name = req.body.category_name;
        
        if (category_name === "all") {

         
        
       
          var query1 = "SELECT * FROM accessories order by id asc";
        
        }
        else {

         

          var query1 = "SELECT * FROM accessories WHERE sub_serious='"+ category_name + "' order by id asc";

        }
        sql.query(query1, function (err, result) {
          if (err) throw err;
        
          res.send({
            data: result
            
          });
          
        });
        
      };
      
  
            exports.Accessories_details = async (req, res) => {
 
        var product_name = req.body.product_name;
          var product_id = req.body.product_id;
        //PRODUCT_BINDER
        
        
        var PRODUCT_BINDER = await crud.DB_FETCH_OBJECT("accessories", "where accessories_name='" + product_name + "'");

        var PRODUCT_SPECS = await crud.DB_FETCH_OBJECT("accessories_specification", "where product_id='" + product_id + "'");



             res.send({
          product_specs:PRODUCT_SPECS,
         
          product_data:PRODUCT_BINDER,
                
        });

            }

      
      //PRODUCT DETAILS PAGE 
      
      exports.Product_details = async (req, res) => {
 
        var product_id = req.body.product_id;
        var product_name =req.body.name;
        
        var bed_type = req.body.bed_type;
        
        var dimension =req.body.dimension;
        
        var height =req.body.height;
        
        var sub_type =req.body.type_devision;

        //PRODUCT_BINDER
                
        var PRODUCT_BINDER = await crud.PRODUCT_BIND("product_information", "where product_name='" + product_name + "'");
        
        
        //PRODUCT_BINDER_SubDIVISION
 
        var COUPEN = await crud.COUPEN_BIND("coupen_code", "where mode='public' ");
         
        var PRODUCT_SUB_ALL = await crud.PRODUCT_SUB_ALL("product_specification", "where product_id='" + product_id + "'");
        
        
        if(sub_type==="" && sub_type!=0 )
        {
          var PRODUCT_SUB = await crud.PRODUCT_SUB("product_specification", "where product_id='" + product_id + "'");
        }
        else
        {
          
          var PRODUCT_SUB = await crud.PRODUCT_SUB("product_specification", "where product_id='" + product_id + "'"+" And  subdivision='" + sub_type + "'");
          
        }
        
   

        //BED TYPE BINDER
        
        
        
        
        if(bed_type==="" &&  dimension ===""  &&  height==="")
        {
          
          
          //BED TYPE BINDER 
          
          var BED_BINDER = await crud.PRODUCT_BEDBIND("product_specification", "where product_id='" + product_id + "'");
          
          //DIMENTION BINDER
          
          var DIMENTION_BINDER = await crud.DIMENSION_BIND("product_specification", "where product_id='" + product_id + "'");
          
          
          //THICKNESS BINDERR
          
          
          // var THICKNESS_BINDER = await crud.THICKNESS_BIND("product_specification", "where product_id='" + product_id + "' And  subdivision='" + sub_type + "'");
          
          if(sub_type==="" )
          {
            
            var THICKNESS_BINDER = await crud.PRODUCT_SUB("product_specification", "where product_id='" + product_id + "'");
            
          }
          else
          {
            
            var THICKNESS_BINDER = await crud.PRODUCT_SUB("product_specification", "where product_id='" + product_id + "'"+" And  subdivision='" + sub_type + "'");
            
          }
          
        }
        
        else
        {
   
          
          //BIND HEIGHT BASED ON SUBDIVISION SIDE 
          
          var THICKNESS_BINDER = await crud.THICKNESS_BIND_VAL("product_specification", "where product_id='" + product_id + "'","And  subdivision='" + sub_type + "'");
          
          //Bed TYPE Binder Based On Hight 
          
          var BED_BINDER = await crud.PRODUCT_BEDBIND("product_specification", "where product_id='" + product_id + "'","And  thickness='" + height + "' AND subdivision='" + sub_type + "'");
          
          
          //BIND DIMENSION BASED ON BED SIZE 
          
          
          var DIMENTION_BINDER = await crud.DIMENSION_BIND_VAL("product_specification", "where product_id='" + product_id + "'"," And  bed_type='" + bed_type + "' And  subdivision='" + sub_type + "' And  thickness='" + height + "'");
          

          
          // if(dimension=="")
          // {
          
          //   var THICKNESS_BINDER = await crud.THICKNESS_BIND_VAL("product_specification", "where product_id='" + product_id + "'","And  bed_type='" + bed_type + "'");
          
          // }
          
          
        }
        

        res.send({
          product_sub:PRODUCT_SUB_ALL,
          product_sub_single:PRODUCT_SUB,
          product_data:PRODUCT_BINDER,
          bed_type:BED_BINDER,
          dimentions:DIMENTION_BINDER,
          thickness:THICKNESS_BINDER,
          coupen_code:COUPEN         
        });
        
        
        
        
      };
      
      
      
      
      
      
      
      
      
      //PRODUCT DETAILS PAGE 
      
      exports.Product_height_size = async (req, res) => {
        
        
        
        
        
        var product_id = req.body.product_id;
        
        var sub_type =req.body.type_devision;              
        
        var THICKNESS_BINDER = await crud.THICKNESS_BIND_VAL("product_specification", "where product_id='" + product_id + "'","And  subdivision='" + sub_type + "'");
        
        //Bed TYPE Binder Based On Hight 
        
        var BED_BINDER = await crud.PRODUCT_BEDBIND("product_specification", "where product_id='" + product_id + "'"," AND subdivision='" + sub_type + "'");
        
        
        
        
        
        res.send({
          
          bed_type:BED_BINDER,  
          thickness:THICKNESS_BINDER         
        });
        
        
        
        
      };
      
      
      
      
      
      //PRODUCT DETAILS PAGE 
      
      exports.Product_dimension = async (req, res) => {
        
        
        var product_id = req.body.product_id;
        
        var type_devision = req.body.type_devision;
        
        var height =req.body.height;
        
        var size =req.body.size;
        
        
        
        var DIMENTION_BINDER = await crud.DIMENSION_BIND_VAL("product_specification", "where product_id='" + product_id + "'"," And  bed_type='" + size + "' And  subdivision='" + type_devision + "' And  thickness='" + height + "'");
        
        
        
        
        
        
        res.send({
          
          dimentions:DIMENTION_BINDER       
        });
        
        
        
        
      };
      
      
            //TODO USER LOGIN
      exports.AccProduct_price = async (req, res) => {
    
        var product_id = req.body.product_id;;
        var size =req.body.size;

          var query ="SELECT price FROM accessories_specification where product_id='"+product_id+"' and size='"+size+"'  order by id asc ";
  console.log(query)
        sql.query(query, function (err, result) {
          if (err) throw err;
          
          res.send({
            data: result
            
          });
          
        });
        
        
      };
      
      
      
      
      //TODO USER LOGIN
      exports.Product_price = async (req, res) => {
        
        
        
        
        
        
        var product_id = req.body.product_id;;
        var bed_type = req.body.bed_type;
        var dimension =req.body.dimension;
        var thickness =req.body.thickness;
        var type =req.body.type;
        
        
        
        
        
        
        
        if(dimension==="" || bed_type==="" || thickness=="")
        {
          var query ="SELECT product_price FROM product_specification where product_id='"+product_id+"'   order by id asc ";
        }
        else{
          
          var query ="SELECT product_price FROM product_specification where product_id='"+product_id+"' and bed_type='"+bed_type+"' and product_dimensions ='"+ dimension +"' and thickness='"+ thickness +"'  and subdivision='"+ type +"' order by id asc ";
        }
     
        
        sql.query(query, function (err, result) {
          if (err) throw err;
          
          res.send({
            data: result
            
          });
          
        });
        
        
      };
      
      
      
      
      
      //TODO USER LOGIN
      exports.PRODUCT_CUSTOMISE_PRICE = async (req, res) => {
        
        
        
        
        
        
        var product_id = req.body.product_id;;
        var bed_type = req.body.bed_type;
        var customise_hight =req.body.customise_hight;
        var customise_width =req.body.customise_width;
        var thickness =req.body.thickness;
        var type =req.body.type;
        
        
        
        
        
     
        
        
        
        // if(dimension==="" || bed_type==="" || thickness=="")
        // {
        //   var query ="SELECT product_price FROM product_specification where product_id='"+product_id+"'   order by id asc ";
        // }
        // else{
        
        
        //SQRT FIT RATE AREA 
        var SQR_FIT_RATE = await crud.SQRFITRATE("product_customise_rate", "where product_id='" + product_id + "' And  product_thickness='" + thickness + "'");
        
        var get_sqrfeet_rate=SQR_FIT_RATE[0].sqrfeet_rate;
        if(customise_hight <= 78  &&  customise_width <= 72)
        {
          var query ="SELECT product_price FROM product_specification where SUBSTRING(product_dimensions, 1, 2) >= '"+customise_hight+"' && SUBSTRING(product_dimensions, 4, 5) >='"+customise_width+"' and  product_id='"+product_id+"' and bed_type='"+bed_type+"'  and thickness='"+ thickness +"'  and subdivision='"+ type +"' order by id asc limit 1";
          
          
          sql.query(query, function (err, result) {
         
            
            
            res.send({
              
              data: result,
              
            });
            
          });
          
          
        }
        else
        {
          
          
     
          
          
          var sqr=customise_hight*customise_width/144;
          
          var round=Math.round(sqr, 2);
          
          var final_amount=round*get_sqrfeet_rate;
          
          
          var price=Math.round(final_amount);
          
          
          var result_arr =[ {product_price:price} ];
          
          res.send({
            
            data: result_arr,
            
          });
          
        }
        
      };
      
      
      //TODO USER LOGIN
      exports.Payment_integration = async (req, res) => {
        
        
        
        
        try {
          
          const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
          });
          
          
          
          const options = {
            amount: req.body.payment, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
          };
          
          const order = await instance.orders.create(options);
          
          if (!order) return res.status(500).send("Some error occured");
          
          res.json(order);
        } catch (error) {
          
          res.status(500).send(error);
        }
        
        
        
      }
      
      
      
      
      exports.Payment_verification = async (req, res) => {
        
        
        
        
        try {
          
          
          
          // getting the details back from our font-end
          const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            order_products,
            user_information
          } = req.body;
          
          
          
          
          
          // Creating our own digest
          // The format should be like this:
          // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
          const shasum = crypto.createHmac("sha256", "mQDtnzH4nLJEvlHtq547r2vX");
          
          shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
          
          const digest = shasum.digest("hex");
          
          // comaparing our digest with the actual signature
          if (digest !== razorpaySignature)
          return res.status(400).json({ msg: "Transaction not legit!" });
          
          // THE PAYMENT IS LEGIT & VERIFIED
          // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
          
          //TO DO INSERT INTO TABLE 
          
          
          
          
          const id_lo = crypto.randomBytes(4).toString("hex");
          
          
          const order_id="OD"+id_lo;
          
          // console.log("ORDER ID" + order_id)
          
          // console.log(JSON.parse(order_products))
          
          // console.log(JSON.parse(user_information))
          
          
          //TODO ORDER INSERT 
          //  JSON.parse(order_products).map(ad =>(
          
          
          //  sql.query("INSERT INTO orders (product_id) VALUES ('id')", (err) => {
          //   if (err) {
          
          //   } else {
          
          //   }
          // })
          
          JSON.parse(order_products).map(async (element) => {
            
            JSON.parse(user_information).map(async (user_De) => {
              
              sql.query("INSERT INTO orders (order_id,user_name,user_email,user_mobile,user_street,user_city,user_state,user_pincode,user_country,product_name,bed_type,dimension,thickness,price,total_price,product_qty,razorpay_order_id,payment_id,product_id) VALUES ('"+order_id+"','"+user_De.user_name+"','"+user_De.user_email+"','"+user_De.user_mobile+"','"+user_De.street+"','"+user_De.city+"','"+user_De.state+"','"+user_De.pincode+"','"+user_De.contry+"','"+element.title+"','"+element.bed_type+"','"+element.dimension+"','"+element.thickness+"','"+element.amount+"','"+user_De.total+"','"+element.product_count+"','"+razorpayOrderId+"','"+razorpayPaymentId+"','"+element.product_id+"')", (err) => {
                if (err) {
                  
                } else {
                  
                }
              })
              
            });
            
            
          });
          
          
          
          
          // });
          
          
          
          
          res.json({
            msg: "success",
            orderId: razorpayOrderId,
            trackorder_id:orderCreationId,
            paymentId: razorpayPaymentId,
          });
        } catch (error) {
          res.status(500).send(error);
        }
        
        
      }
      
      
      
      exports.All_orders = async (req, res) => {
        
        var  user_mobile=req.body.user_mobile;

       
        
        
        
        var query1 = "SELECT * FROM orders where  user_email='" +user_mobile+ "' OR user_mobile ='"+user_mobile +"' GROUP BY order_id order by id desc ";
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
         
          
          res.send({
            data: result
            
          });
          
        });
        
      };
      
      
      
      
      exports.Order_track = async (req, res) => {
        
        var  order_id_de=req.body.order_id;
     
        
        
        
        var query1 = "SELECT * FROM orders where order_id ='" +order_id_de+ "'  order by id desc ";
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
          
          
          res.send({
            data: result
            
          });
          
        });
        
      };
      
      
      
      
      
      
      
      
      exports.Bottom_banner = async (req, res) => {
        
        
        
        var query1 = "SELECT * FROM bottom_banner  order by id asc limit 5 ";
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
         
          res.send({
            data: result
            
          });
          
        });
        
      };
      
      
      
      exports.Blog_Detailsview = async (req, res) => {
        
         var  id=req.body.id;
        console.log(id)
        var query1 = "SELECT * FROM  blog  where id='"+id+"' order by id desc";
        
        console.log(query1)
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
         
          
          res.send({
            data: result
            
          });
          
        });
        
      };

            exports.Blog_view = async (req, res) => {
        
        
        
        var query1 = "SELECT * FROM  blog  order by id desc";
        
        
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
         
          
          res.send({
            data: result
            
          });
          
        });
        
      };
      
      exports.Warrenty_register = async (req, res) => {
        
        //  var customer= req.body.customer_name;
        //  var email=req.body.email;
        //  var mobile=req.body.mobile;
        //  var dob=req.body.dob;
        
        const newpath = '../Routes' + "/files/";
        const file = req.files.file;
        const filename = file.name;
        
   
        
        file.mv(`${newpath}${filename}`, (err) => {
          if (err) {
            res.status(500).send({ message: "File upload failed", code: 200 });
          }
          res.status(200).send({ message: "File Uploaded", code: 200 });
        });
        
        
        
        
        
      };
      
      
      
      
      exports.Product_review = async (req, res) => {
        
        
        
        var name= req.body.name;
        var email=req.body.email;
        var comments=req.body.comments;
        var product_id=req.body.product_id;
        var currentDate = commonJs.currentDateTime();
        
        
        
        
        sql.query("INSERT INTO product_customer_review (product_id,name,email,comment,date_time) VALUES ('"+product_id+"','"+name+"','"+email+"','"+comments+"','"+currentDate+"')", (err) => {
       
          if (err) throw err;
          
   
        });
        
      };
      


      exports.Product_review_list = async (req, res) => {
        
        var product_id=req.body.product_id;
        
        var query1 = "SELECT * FROM product_customer_review where product_id ='" +product_id+ "'  order by id desc ";
        
        
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
        
          
          res.send({
            data: result
            
          });
          
        });
        
      };



      exports.Wishlist_add = async (req, res) => {
        
        var product_id=req.body.product_id;
        var product_price=req.body.total_amount;
        var product_name=req.body.product_name;
        var product_image=req.body.product_image;

        var product_size=req.body.product_size;
        var product_dimen=req.body.product_dimen;
        var product_height=req.body.product_height;
        var user_id=req.body.user_id;
        
        sql.query("INSERT INTO tbl_wishlist (product_id,product_amount,product_name,product_image,height,size,dimension,user_id) VALUES ('"+product_id+"','"+product_price+"','"+product_name+"','"+product_image+"','"+product_height+"','"+product_size+"','"+product_dimen+"','"+user_id+"')", (err) => {
       
          if (err) throw err;
          
   
        });
          
     
        
      };



      exports.Wishlist_list_view = async (req, res) => {
        
        var user_id=req.body.user_id;
        
        var query1 = "SELECT * FROM tbl_wishlist where user_id ='" +user_id+ "'  order by id desc ";
        
        
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
         
          
          res.send({
            data: result
            
          });
          
        });
        
      };



      exports.wishlist_remove = async (req, res) => {
        
        var id=req.body.id;
        
        var query1 = "DELETE FROM `tbl_wishlist` WHERE id='" +id+ "'  ";
        
        
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
    
          
        });
        
      };



      exports.Product_Name_list = async (req, res) => {
        
        var user_id=req.body.user_id;
        
        var query1 = "SELECT * FROM product_information   order by id asc ";
        
        
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
       
          
          res.send({
            data: result
            
          });
          
        });
        
};
      


   exports.Header_slogan = async (req, res) => {
        
        var user_id=req.body.user_id;
        
        var query1 = "SELECT * FROM slogans   order by id desc limit 1 ";
        
        
        
        
        sql.query(query1, function (err, result) {
          if (err) throw err;
         
          
          res.send({
            data: result
            
          });
          
        });
        
};
      

  exports.Popup_image = async (req, res) => {
        
       
        var query1 = "SELECT * FROM popup order by id desc limit 1 ";
  
        sql.query(query1, function (err, result) {
          if (err) throw err;
        
          
          res.send({
            data: result
            
          });
          
        });
        
};
      


  exports.Newsletter = async (req, res) => {
        
       
        var query1 = "SELECT * FROM popup order by id desc limit 1 ";
  
        sql.query(query1, function (err, result) {
          if (err) throw err;
        
          
          res.send({
            data: result
            
          });
          
        });
        
};


exports.Product_id_Find = async(req, res) =>
{

  const product_name=req.body.product_name;



  var query1 = "SELECT id,category_name FROM product_information  where product_name ='"+product_name +"' order by id desc limit 1 ";
  
        sql.query(query1, function (err, result) {
          if (err) throw err;
        
          
          res.send({
            data: result
            
          });
          
        });
}



exports.Product_id_Find_Acc = async(req, res) =>
{

  const product_name=req.body.product_name;

  var query1 = "SELECT id,serious,sub_serious FROM accessories  where accessories_name ='"+product_name +"' order by id desc limit 1 ";
  
        sql.query(query1, function (err, result) {
          if (err) throw err;
          res.send({
            data: result
            
          });
          
        });
}