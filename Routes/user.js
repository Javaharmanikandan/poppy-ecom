const express = require('express');
const dbconnect = require('../Config/dbconfig');
const userController = require('../Controller/UserController');
const router = express.Router();


router.post('/', userController.userRegister)
router.post('/login',userController.userLogin);
router.get('/category',userController.Product_serious);
router.post('/coupon_get',userController.COUPON_DATA);

router.get('/acc_category',userController.Accessories_serious);
router.get('/testimonials',userController.Testimonials);
router.get('/festivebanner',userController.FESTIVEBANNER);
router.get('/festivebanner_settings',userController.FESTIVEBANNER_SETTINGS);
router.post('/product_list',userController.Product_list);
router.post('/accessories_list',userController.AccessoriesList);
 router.post('/category_id_finder',userController.Find_category_id);
 router.post('/accessories_details',userController.Accessories_details);
 
 router.post('/product_details',userController.Product_details);

 router.post('/product_review',userController.Product_review);

 router.post('/product_review_list',userController.Product_review_list);

 router.post('/wishlist_add',userController.Wishlist_add);
 router.post('/wishlist_list_view',userController.Wishlist_list_view);
 router.post('/remove_wishlist',userController.wishlist_remove);

 router.post('/product_height_size',userController.Product_height_size);

 router.post('/product_dimension',userController.Product_dimension);

 router.post('/price_data',userController.Product_price);

  router.post('/acc_price_data',userController.AccProduct_price);

 router.post('/price_customise_data',userController.PRODUCT_CUSTOMISE_PRICE);
 
 router.post('/Payment',userController.Payment_integration);
 
 router.post('/success',userController.Payment_verification);

 router.post('/order_view',userController.All_orders);
 
router.post('/order_track', userController.Order_track);
 
router.get('/slogans',userController.Header_slogan);
router.get('/popup',userController.Popup_image);
 //Dynamic Content

 router.get('/bottom_banner',userController.Bottom_banner);
 router.get('/product_name_list',userController.Product_Name_list);

 router.get('/blog_view',userController.Blog_view);
  router.post('/blog_details_view',userController.Blog_Detailsview);

 router.post('/warrenty_register',userController.Warrenty_register);
 router.post('/newsletter',userController.Newsletter);

 router.post('/product_id_find',userController.Product_id_Find);
router.post('/product_id_acc',userController.Product_id_Find_Acc);
// router.get('/category',(req, res) =>{

//     dbconnect.query("SELECT * FROM tbl_category ORDER BY  view_type",(err, result)=>{
//         if(err)
//          console.log(err)
//         else
//             console.log(result)
//             res.send(result);
  
//     })

// });
// router.get('/category', (req, res) => res.send('Hello World!'));

router.post("/upload", (req, res) => {

    const filename = req.files.val.name;

    console.log(filename);
    const file = req.files.screenshot;
    let uploadPath = __dirname + "/uploads/" + filename;
    file.mv(uploadPath, (err) => {
      if (err) {
        return res.send(Err);
      }
    });
    res.send(200);
  });



router.delete('/dlt/:id',(req, res) =>{
    const id = req.params.id;
    dbconnect.query("DELETE FROM `stud` WHERE `id` = ?",id, (err,result)=>{
        if(err)
            console.log(err);
        else
        res.send("success");
    })
})

module.exports = router;