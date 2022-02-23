 const express = require("express");
 const { registerUser }=require("../controllers/usercontroller");
 const { loginUser }=require("../controllers/usercontroller")
 const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);


module.exports = router;
