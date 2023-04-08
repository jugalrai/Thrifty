const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please enter address"],
  },
  photos: {
    type:[String],
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"]
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
