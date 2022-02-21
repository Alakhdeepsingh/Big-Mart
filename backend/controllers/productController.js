exports.getAllProducts = (req,res)=>{
    res.status(200).json({message:"Route is working fine"})
}
// json() Function. The res. json() function sends a JSON response. This method sends a response (with the correct content-type) 
//that is the parameter converted to a JSON string using the JSON.05
// The res. json() function converts the parameter you pass to JSON using JSON. stringify() and sets the Content-Type header to
// application/json; charset=utf-8 so HTTP clients know to automatically parse the response.