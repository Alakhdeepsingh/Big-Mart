const express = require("express");
const { getAllProducts,createProduct } = require("../controllers/productController");
const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
//getting all the things from getAllProducts over here and using get request on it

module.exports=router

//create  read  update  delete 
// post   get    put    delete


//uss url mai jakar data send kar sakeghe yaa
//create kar sakege 

//post ka mtb hai ham bhejege data create karne ke liye

//get hii khulta hai brower mai by default isliye postman ka use karte hai