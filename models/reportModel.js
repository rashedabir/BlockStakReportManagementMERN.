const mongoose = require("mongoose");

// report model
const reportSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
