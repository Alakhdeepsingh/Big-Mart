const express = require("express");
// Whenever you import a module like const express = require('express') express is a module with functions or objects or variables assigned to it 
const app = express();



const errorMiddleware=require("./middleware/error");
app.use(express.json());
// express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
//jabh hamm body mai kuch likhe and hamm usse get method ka use karke uss object ko le response mai tho hamme app.use(express.json()) ki jarurat paregi
// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
//routes are importing over here
const product=require("./routes/productRoute");
 const user = require("./routes/userRoutes");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use(errorMiddleware);
module.exports=app;