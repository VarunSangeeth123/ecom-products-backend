const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product Name is required"],
  },
  price: {
    type: Number,
    required: [true, "product price  is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["calvin klein","caressa","liddy","ikea","marcos", "blossom", "macho"],
    },
  },
});
module.exports = mongoose.model("Product", productSchema);
