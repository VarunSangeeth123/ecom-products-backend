const Product = require("../Models/product")

const getAllProductsStatic = async (req, res, next) => {
  // throw new Error("testing Async Errors");
  // const search = "ikea"
  const products = await Product.find({
    // name:{$regex:search,$options:"i"}
    // featured:false
    price:{$lt:30}
  })
  .select('name price company')
  // .sort('price')
  res.status(200).json({ products,nbHits:products.length });
};

const getAllProducts = async (req, res) => {
  let output
  const {featured, company, name,sort,select,numericFilters} = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true:false;
  }
  if (company) {
    queryObject.company = {$regex:company,$options:"i"};
  }
  if (name) {
    queryObject.name = {$regex:name,$options:"i"};
  }
  
  
  if(sort){
    const sortedList = sort.split(",").join('');
    output = output.sort(sortedList);
  }
  if(select){
    const selectedFields = select.split(',').join(' ');
    output = output.select(selectedFields)
  }
  if(numericFilters){
    const operatorMap = {
      ">":"$gt",
      ">=":"$gte",
      "=":"$eq",
      "<":"$lt",
      "<=":"$lte",
    }
    const regEx= /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
    
    console.log(filters);
    const options = ['price','rating']
    filters = filters.split(',').forEach((item)=>{
      const [field,operator,value]=item.split('-')

      if(options.includes(field)){
        queryObject[field]={[operator]:Number(value)}
      }
      
      console.log(queryObject);
    })
  }
  // if(limit){
    //   output = output.limit(limit);
    // }
    
    
    output = Product.find(queryObject);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  output = output.skip(skip).limit(limit)

  const products = await output;
  res.status(200).json({ products,nbHits:products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic
}