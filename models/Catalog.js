const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
  catalogName: {
    type: String,
    required: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  catalogItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Catalog", catalogSchema);
