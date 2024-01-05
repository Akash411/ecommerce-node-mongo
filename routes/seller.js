const express = require("express");
const router = express.Router();

const Auth = require("../middleware/auth");
const Seller = require("../controllers/seller");

// Routes for seller 

// Business
router.post("/createBusiness", Auth.auth, Auth.isSeller, Seller.createBusiness);
router.get("/getBusiness", Auth.auth, Auth.isSeller, Seller.getBusiness);

// Catalog
router.post("/createCatalog", Auth.auth, Auth.isSeller,Seller.createCatalog);
router.get("/getCatalog", Auth.auth,Auth.isSeller, Seller.getCatalog);

// Product
router.post("/createProduct", Auth.auth, Auth.isSeller, Seller.createProduct);
router.get("/getProducts",  Auth.auth, Auth.isSeller, Seller.getProducts)

// Orders
router.get("/orders", Auth.auth, Auth.isSeller, Seller.orders);

// Routes for Admin
router.get("/getAllBusiness", Auth.auth, Seller.getAllBusiness);
router.get("/getAllCatalog", Auth.auth, Seller.getAllCatalog);
router.get("/getAllProducts", Auth.auth, Seller.getAllProducts);

module.exports = router;
