const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../modals/userModel");
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
const token=user.getJWTToken();
    res.status(200).json({
        success: true,
        token,
      });
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

  const isPasswordMatched= await User.comparePassword(password);

  if(!isPasswordMatched){
    return next(new ErrorHander("Invalid Email or Password",401));
  }


  const token=user.getJWTToken();
    res.status(200).json({
        success: true,
        token,
      });
    });
    




