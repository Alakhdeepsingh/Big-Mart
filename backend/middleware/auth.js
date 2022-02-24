const ErrorHander=require("../utils/errorhander");
const catchAsyncErrors =require("./catchAsyncErrors");
const jwt=require("jsonwebtoken");
const User = require("../modals/userModel");
exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token} =req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHander("Please Login to access this resource",401));
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decodedData.id);
    req.user=user;
    console.log(req.user);
next();
});


exports.authorizeRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander(
                `Role:${req.user.role} is not allowed to access this resource`,
                403)
            );
        }
        next();
    };
};





