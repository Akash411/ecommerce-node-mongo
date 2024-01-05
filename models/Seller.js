const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    businessId: {
        type: String,
        required: true
    },
    catalog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catalog"
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
