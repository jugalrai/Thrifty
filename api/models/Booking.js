const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  price: Number,
  phone: Number
});

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;
