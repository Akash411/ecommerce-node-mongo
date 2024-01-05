const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    catalogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catalog"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
