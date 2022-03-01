//this is for user 

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
//crypto is build in module , phele se hii aata hai yehh jesse ki yaad hogha fs
const userSchema=new mongoose.Schema({
    name:{
        type: 'string',
        required: [true,"Please Enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLenght:[4,"Name should have more than 4 characters"]

    },
    email:{
        type:String,
        required: [true,"Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail,"Please Enter a valid Email"]
        //validate meaning ki email sahi hai naa
    },
    password:{
        type:String,
        required: [true,"Please Enter your password"],
        minLength:[8,"Password must be at least 8 characters"],
        select:false,
        //select false isliye likha hai kyoki user ka password chodh kar hamm saraa info le sakte hai
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      role: {
        type: String,
        default: "user",
      },
      createdAt:{
        type: Date,
        default: Date.now,
      },
    
      resetPasswordToken: String,
      resetPasswordExpire: Date,
    });
    userSchema.pre("save",async function(next){

        if(!this.isModified("password")){
            next();
            //jabh user keval name and mail ujpdate karna hogha tabh yehh if condition kam aaega
        }
        
        this.password=await bcrypt.hash(this.password,10);
    })

    //JWT TOKEN

userSchema.methods.getJWTToken=function(){
  return jwt.sign({id: this._id},process.env.JWT_SECRET, {
    expiresIn : process.env.JWT_EXPIRE,
  });
};


//Compare Passwords 

userSchema.methods.comparePassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
};

//Generating password Reset Token
userSchema.methods.getResetPasswordToken=function(){

  //Generate Token
const resetToken=crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire=Date.now()+15*60*1000;
return resetToken;
};



module.exports = mongoose.model("User", userSchema);