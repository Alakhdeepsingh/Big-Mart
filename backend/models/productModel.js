const mongoose = require("mongoose");
// A schema is a JSON object that defines the the structure and contents of your data. ...
// Models are responsible for creating and reading documents from the underlying MongoDB database.
// Model is like collection in database
// objects are known as document or schema
//group of document is known as collection

    const productSchema = new mongoose.Schema({
        name:{
            type:String, 
            required:[true,"Please Enter product Name"], 
            // whenever we have to validate the particular field so we used required. required: true means you must fill that field
            trim:true,
            // What is trim true in mongoose schema?
// If you add { type: String, trim: true } to a field in your schema, then trying to save strings like " hello" , or "hello " , or " hello " , would end up being saved as "hello" in Mongo - i.e. white spaces will be removed from both sides of the string.
        },
        description:{
            type:String, 
            required:[true,"Please Enter product Description"], 
        }, 
        price:{
            type:Number, 
            required:[true,"Please Enter product Name"], 
            maxLength: [8, "Price cannot exceed 8 characters"],
        }, 
        ratings:{
            type:Number, 
            default:0,
        }, 
        images:[
            {
                public_id:{
                    type:String, 
                    required:true
                },
                url:{
                    type:String, 
                    required:true,
            }
        }
    ],
    
    category:{
        type:String, 
        required:[true,"Please Enter product Category"],
    },
    Stock:{
        type:Number, 
        required:[true,"Please Enter product Stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numofReviews:[
        {
            name:{
                type:String, 
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            },
        },
    ],
    user:{
        //let say if two people are creating this site then me and my partner should not get confusion of finding us that who has created this site
        type:mongoose.Schema.ObjectId,
        //product ke aage user ki id lagga rahe hai takki hamm dono identify kar sakee apne aap ko
        ref:"User",
        required: true,
    },
      createdAt: {
          //when it is created?
        type: Date,
        default: Date.now,
      },
    });
    module.exports = mongoose.model("Product", productSchema);


















