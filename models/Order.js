const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orders: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
