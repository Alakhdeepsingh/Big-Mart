const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../modals/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "this is a sample id",
        url: "profilepicUrl",
      },
    });
    sendToken(user,201,res);
    });
    

//Login User

exports.loginUser=catchAsyncErrors(async(req, res, next)=>{
  const { email, password } = req.body;


  if(!email || !password){
    return next(new ErrorHander("Please Enter Email & Password",400));
  }

  const user= await User.findOne({email}).select("+password");

  if(!user){
    return next(new ErrorHander("Invalid Email or Password",401));
  }
console.log(user);
  const isPasswordMatched= await user.comparePassword(password);

  if(!isPasswordMatched){
    return next(new ErrorHander("Invalid Email or Password",401));
  }
  sendToken(user,200,res);

  });
    


//logout user 

exports.logout=catchAsyncErrors(async(req, res, next)=>{

    res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true,
    })

  res.status(200).json({
    success:true,
    message:"Logged Out",
  });
});


//Forget password
exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
  const user=await User.findOne({email:req.body.email});

  if(!user){
    return next(new ErrorHander("User not found",404));
  }

  //Get ResetPassword Token
  const resetToken=user.getResetPasswordToken();

  await user.save({validateBeforeSave:false,resetToken:resetToken});


  const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

const message=`Your password reset token is :- \n\n ${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it`;


try{
    await sendEmail({
      email:user.email,
      subject:`BigMart Password Recovery`,
      message,
    });
    res.status(200).json({
      success:true,
      message:`Email send to ${user.email} successfully`,
    })


}catch(error){
  user.resetPasswordToken=undefined;
  user.resetPasswordExpire=undefined;

  await user.save({validatorBeforeSave: false,resetToken:resetToken});
  return next(new ErrorHander(error.message,500));

}


});


// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});




