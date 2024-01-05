const express = require("express");
const router = express.Router();

const Auth = require("../middleware/auth");
const Buyer = require("../controllers/buyer");

// Buyer Routes

// Seller List
router.get("/list-of-sellers", Auth.auth, Auth.isBuyer, Buyer.getListOfSeller);

// Product List
router.get(
  "/seller-catalog/:seller_id",
  Auth.auth,
  Auth.isBuyer,
  Buyer.getProductById
);

// Order Products
router.get(
  "/orderProduct/:seller_id",
  Auth.auth,
  Auth.isBuyer,
  Buyer.orderProduct
);

module.exports = router;
