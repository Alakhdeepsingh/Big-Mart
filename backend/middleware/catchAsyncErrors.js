module.exports =thefunc=>(req,res,next)=>{
    Promise.resolve(thefunc(req,res,next)).catch(next);
    // The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
};