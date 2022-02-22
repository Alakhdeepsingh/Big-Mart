const express = require("express");
const { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails } = require("../controllers/productController");
const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
//getting all the things from getAllProducts over here and using get request on it
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)
//url will be same that is why update and delete are together written
module.exports=router

//create  read  update  delete  
// post   get    put    delete


//uss url mai jakar data send kar sakeghe yaa
//create kar sakege 

//post ka mtb hai ham bhejege data create karne ke liye

//get hii khulta hai brower mai by default isliye postman ka use karte hai