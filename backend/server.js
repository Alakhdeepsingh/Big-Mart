const app = require("./app");
//importing app from app.js

const dotenv = require("dotenv");
//using this dotenv the value written in config.env is going to ${process.env.PORT}
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// uncaught Exception error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down server due to uncaught Exception`);
    process.exit(1); 

});


//config
dotenv.config({ path:"backend/config/config.env" });
// DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process. env object

//Connecting to database
connectDatabase();
cloudinary.config()({
cloud_name: process.env.CLOUDINARY_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});
// uncaught Exception error
// console.log(youtube)

//unhandled promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
});