const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
require("dotenv").config(); 
const fileUpload = require("express-fileupload");
const sql = require("./Config/dbconfig");

const date_get = require("./Helper/common.js");
const app = express();
const port = process.env.PORT || 80

const nodemailer = require("nodemailer");
//IMPORT ROUTESn
const userRouts = require('./Routes/user');
 const smtpTransport = require('nodemailer-smtp-transport');


//MIDDLEWARE
app.use(cors());


app.use(bodyparser.json());

app.use(fileUpload());


app.use('/user', userRouts);

app.get('/api', (req, res) => {
	res.send("Working")
	
}
app.get('/', (req, res) => {










//setup nodemailer

let transporter = nodemailer.createTransport(smtpTransport({    
     service: 'gmail',
     host: 'smtp.gmail.com', 
     port:587,
     auth: {        
          user: 'vvr@vvresidency.in',        
          pass: 'jb1Pa}x6?-2M'    
     }
}));
//get route to send mail, from form

 
     //options
     const mailOptions = {
         from: 'mjavahar56@gmail.com',
	       to: 'mjavahar56@gmail.com',
	       subject: 'Test mail',
	      text: 'Node.js testing mail for GeeksforGeeks'            //from req.body.message
      };




     //delivery
     transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);  
          } else {     
              console.log('Email sent: ' + info.response);  
          }   
     });

})


app.post("/upload", (req, res) => {

    
//    const filename = req.files.val.name;


    var customer= req.body.customer_name;
    var email=req.body.email;
         var mobile=req.body.mobile;
         var dob=req.body.dob;
  var state=req.body.state;
            var district=req.body.district;
   const filename =req.files.val.name;

   const file = req.files.val;
   let uploadPath = __dirname + "/uploads/" + filename;
   file.mv(uploadPath, (err) => {
     if (err) {
       return res.send(Err);
     }
   });


   let created  = date_get.currentDateTime();;

   sql.query("INSERT INTO warranty_register (date_time,customer_name,email,invoice_image,date_of_birth,mobile_number,state,district) VALUES ('"+created+"','"+customer+"','"+email+"','"+filename+"','"+dob+"','"+mobile+"','"+state+"','"+district+"')", (err) => {
    if (err) {
      
    } else {
      
    }
  })



   res.send(200);



   


  });




  app.post("/upload_claim", (req, res) => {


 

    
    //    const filename = req.files.val.name;
    
    
        var customer= req.body.customer_name_claim;
             var mobile=req.body.mobile_claim;
             var date=req.body.date_claim;
             var state=req.body.state_claim;
            var district=req.body.district_claim;

            console.log("BACKEND" +state+" "+district);
    //File One 
       const filename1 =req.files.val1.name;
    
       const file1 = req.files.val1;
       let uploadPath1 = __dirname + "/uploads/" + filename1;
       file1.mv(uploadPath1, (err) => {
         if (err) {
           return res.send(Err);
         }
       });

//File two
const filename2 =req.files.val2.name;
       const file = req.files.val2;
       let uploadPath2 = __dirname + "/uploads/" + filename2;
       file.mv(uploadPath2, (err) => {
         if (err) {
           return res.send(Err);
         }
       });
    
       let curent_date = date_get.currentDateTime();
    
    
       sql.query("INSERT INTO warranty_claim (date_time,customer_name,invoice_image,damage_image,customer_mobile,date,state,district) VALUES ('"+curent_date+"','"+customer+"','"+filename1+"','"+filename2+"','"+mobile+"','"+date+"','"+state+"','"+district+"')", (err) => {
        if (err & err != "ER_DUP_ENTRY" ) {

          res.send({
            ResponseCode: 401,
            Result: "false",
            ResponseMsg: "Exxxis",
          });
       
        } else {
          res.send("Fine")
          
        }
      })
    
    
    
      
    
    
    
       
    
    
      });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
