
//METHOD FOR CURRENT DATE 
exports.currentDateTime = () =>{

    var currentdate = new Date().toLocaleString("en-US", {timeZone:"Asia/Kolkata"}); //TODO SET Default Timezone
    currentdate = new Date(currentdate);
    
    var datetime =currentdate.getFullYear() + "-" +  currentdate.getMonth() + "-" + currentdate.getDay() + " "
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();  


    return datetime;

}

//TODO Encryption Method
exports.encryptDecrypt = (value, type) => {

    const CryptoJS = require('crypto-js');


    switch (type) {
        case "Encrypt": 
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));

        case "Decrypt":
            return CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8);
       
      }

}

exports.check = () => {
    console.log("middelware");
}