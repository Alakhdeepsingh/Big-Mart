const res = require("express/lib/response");
const Product = require("../modals/productModel")
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures=require("../utils/apifeatures");
//create  product -- admin route
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
   
    req.body.user=req.user.id

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
    

  //return next(new ErrorHander("This is my temp error",500));
    const resultPerPage = 8;
    //ekk page mai kitne product dikane hai 
    const productsCount = await Product.countDocuments();

    const apiFeatures= new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    
    let products = await apiFeature.query;

    let filteredProductsCount = products.lenght;

    apiFeatures.pagination(resultPerPage);
    //used for search keyword , query


    products=await apiFeature.query;
  
    //Product.find();  is like query that we are sending at query of apifeatures.js
    res.status(200).json({success:true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
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

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Get All Reviews of a product
  exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      }, 
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });





