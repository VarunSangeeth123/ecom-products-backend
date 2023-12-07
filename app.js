const express = require("express");
const connectDB = require("./DB/Connect");
const productRoute = require("./Routes/products");

require("express-async-errors");

const app = express();
require("dotenv").config();
const notFoundMiddleware = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/error-handler");

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Click me</a>');
});
app.use("/api/v1/products", productRoute);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Connected to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
