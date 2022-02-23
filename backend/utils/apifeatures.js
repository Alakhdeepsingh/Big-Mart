//keywords search

class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
//search
search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
              //regex is mongodb operator
            $regex: this.queryStr.keyword,
            $options: "i",
            //case insensitive
          },
        }
      : {};
      console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }
  //filter
  filter() {
    //   creating query copy so that there will be not change in main walli queryStr that is on line 6
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
//this.query means product.find mtb ki jho ki link hai naa /product/ iske badh jho bhi hogha usme se quesryStr hogha
    // console.log(queryStr);
return this;
  }


  //pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //1 isliye likha hai ki agar koi page parr nhi hoo tho current page rahega 1

    const skip = resultPerPage * (currentPage - 1); //50 products , 5 products per page    if we are on first page then resultperpage * (1-1)=0 so we will not skip and when we will be in 2nd page than 2-1=1 so we will skip 1 page

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}


module.exports = ApiFeatures;