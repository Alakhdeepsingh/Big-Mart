const app = require("./app");

const dotenv= require("dotenv");

//config
dotenv.config({path:"backened/config/config.env"});

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://${process.env.PORT}`)
})