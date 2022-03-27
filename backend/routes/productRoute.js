const express = require("express");
const { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails,createProductReview, getProductReviews,deleteReview,getAdminProducts } = require("../controllers/productController");
const router=express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")
router.route("/product").get( getAllProducts);
router.route("/admin/product/new")
.post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
//getting all the things from getAllProducts over here and using get request on it
router
.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);
// isAuthenticatedUser ekk condition hai jho batati hai ki user ko login honna jaruri hai 
//url will be same that is why update and delete are together written
module.exports=router;

//create  read  update  delete  
// post   get    put    delete


//uss url mai jakar data send kar sakeghe yaa
//create kar sakege 

//post ka mtb hai ham bhejege data create karne ke liye

//get hii khulta hai brower mai by default isliye postman ka use karte hai