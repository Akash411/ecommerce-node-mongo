const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buyer", buyerSchema);
