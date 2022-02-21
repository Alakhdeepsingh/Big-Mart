const app = require("./app");
//importing app from app.js

const dotenv = require("dotenv");
//using this dotenv the value written in config.env is going to ${process.env.PORT}

const connectDatabase = require("./config/database");

//config
dotenv.config({ path:"backend/config/config.env" });
// DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process. env object

//Connecting to database
connectDatabase();


app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});