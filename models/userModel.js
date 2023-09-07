const mongoose = require("mongoose");

// user model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: false,
    },
    phone: {
      type: String,
      require: false,
    },
    profession: {
      type: String,
      require: false,
    },
    fav_color: {
      type: String,
      require: false,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
