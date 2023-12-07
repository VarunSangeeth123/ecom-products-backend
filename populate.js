require("dotenv").config()
const connectDB = require("./DB/Connect");

const Product = require("./Models/product")
const jsonProducts = require("./products.json")

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log("success");
    }
    catch(err)
    {
        console.log(err);
    }
    
}

start();