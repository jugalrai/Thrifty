const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: String,
  phone: {
    type: String,
    required: [true, "Please Enter Your Phone Number"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
