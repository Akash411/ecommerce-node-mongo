const Seller = require("../models/Seller");
const Product = require("../models/Product");
const Catalog = require("../models/Catalog");
const Buyer = require("../models/Buyer");
const Order = require("../models/Order");

// Buyer API

// List of Seller
exports.getListOfSeller = async (req, res) => {
  try {
    const sellers = await Seller.find({});
    const sellerDetail = sellers.map(({ name, businessId }) => ({
      name,
      businessId,
    }));
    return res.status(200).json({
      success: true,
      data: sellerDetail,
      message: "Successfully Fetched Data",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Products of Seller by ID
exports.getProductById = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const catalog = await Catalog.findOne({ seller_id });

    const CatalogId = catalog._id;

    if (!CatalogId) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
      });
    }

    const catalogItems = await Product.find({
      _id: { $in: catalog.catalogItem },
    });

    const productDetails = catalogItems.map(({ name, price }) => ({
      name,
      price,
    }));

    return res.status(200).json({
      success: true,
      data: productDetails,
      message: "Data Fetched Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
    });
  }
};

// Ordering products
exports.orderProduct = async (req, res) => {
  try {
    const { id } = req.user;
    const { orders } = req.body;
    const { seller_id } = req.params;
    const isCustomer = await Buyer.findOne({ customerId: id });

    if (!isCustomer) {
      const newCustomer = await Buyer.create({
        username: req.user.username,
        customerId: req.user.id,
      });
    }

    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty product array in the request body.",
      });
    }

    const order = new Order({
      customerId: req.user.id,
      businessId: seller_id,
      orders: orders.map((item) => ({
        name: item.name,
        price: item.price,
      })),
    });

    const savedOrder = await order.save();
    console.log(savedOrder);
    return res.status(200).json({
      success: true,
      data: savedOrder,
      message: "Successfully Order",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
