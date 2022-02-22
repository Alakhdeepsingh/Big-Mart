const res = require("express/lib/response");
const Product = require("../modals/productModel")
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures=require("../utils/apifeatures");
//create  product -- admin route
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
   
    const products=await Product.create(req.body);
    //product create ki wajah se hii mondoDB compass mai khudh bann raha hai object 
    // console.log(req.body);

    res.status(201).json({
        success:true,
        products,
    });
});



//Get all products
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{
    
    const resultPerPage = 5;
    //ekk page mai kitne product dikane hai 
    const productCount = await Product.countDocuments();

    const apiFeatures= new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    //used for search keyword , query


    const products=await apiFeatures.query;
  
    //Product.find();  is like query that we are sending at query of apifeatures.js
    res.status(200).json({success:true,
        products
    })
});
// json() Function. The res. json() function sends a JSON response. This method sends a response (with the correct content-type) 
//that is the parameter converted to a JSON string using the JSON.05
// The res. json() function converts the parameter you pass to JSON using JSON. stringify() and sets the Content-Type header to
// application/json; charset=utf-8 so HTTP clients know to automatically parse the response.



//get product details

exports.getProductDetails = catchAsyncErrors(async(req, res, next)=>{
    const product=await Product.findById(req.params.id);
if(!product){
    return  next(new ErrorHander("Product not found",404));
}
res.status(200).json({
    success:true,
    product,
    productCount
});
});



// The await expression causes async function execution to pause until a Promise is settled (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. When resumed, the value of the await expression is that of the fulfilled Promise


//update product -- admin 

exports.updateProduct = catchAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);
    // The req. params property is an object containing properties mapped to the named route “parameters”
    if(!product){
        return  next(new ErrorHander("Product not found",404));
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
 // What is req params body?
// req. body is used to access actual form data that you 'posted'. req.params is used for route parameters, in your case id which is passed in the parameters: router.route("/product/:id") 
 //jho update denna hai vo hai req.body       
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success : true,
        product
    });
});
//async mai apna kam karta rahuga lekin meri wajah se koi rukke naa 
//mtb vo rukta nhi hai agar 1st line 10 sec le rahi hai tho vo dusri line mai jakar 
//jho kam karna hogha vo chalu kar degga and agar dusri line walla 5 sec mai print hojata hai tho
//vo phele usse print kar degga

//sync rukha rahega jah takh pheli line print nhi hotti tabh takh yehh dusri line mai jaega nhi
//chahe sync mai 10000 sec lagge yaa jitna bhi time lagge


//delete product
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return  next(new ErrorHander("Product not found",404));
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message: "Product deleted successfully"
    })
});







