class ErrorHander extends Error{
    constructor(message,statusCode){
    super(message);
    this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor);
        // What is error captureStackTrace?
        // Stack trace collection for custom exceptions
        // Error. captureStackTrace(this, MyError); ... Passing in MyError as a second argument means that the constructor call to MyError won't show up in the stack trace.

    }
}
module.exports = ErrorHander

//class mai hamesha first letter capital hotta hai isliye  E capital hai Error mai
//extends ka mtb hai ki node ki class hai error usse hamne inherit karra hai ErrorHander
//super is class constructor of error to who it has been inherited