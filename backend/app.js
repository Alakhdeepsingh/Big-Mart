const express = require("express");
// Whenever you import a module like const express = require('express') express is a module with functions or objects or variables assigned to it 
const app = express();
const cookieParser=require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");

const errorMiddleware=require("./middleware/error");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileupload());
// express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
//jabh hamm body mai kuch likhe and hamm usse get method ka use karke uss object ko le response mai tho hamme app.use(express.json()) ki jarurat paregi
// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
//routes are importing over here
const product=require("./routes/productRoute");
 const user = require("./routes/userRoutes");
 const order=require("./routes/orderRoutes");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use(errorMiddleware);
module.exports=app;