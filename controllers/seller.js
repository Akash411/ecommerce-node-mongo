const Seller = require("../models/Seller");
const Catalog = require("../models/Catalog");
const Product = require("../models/Product");
const Order = require("../models/Order");

// API for seller

exports.createBusiness = async (req, res) => {
  try {
    const { name, email } = req.body;
    const businessId = req.user.id;
    const username = req.user.username;

    if (!name || !email) {
      return res.status(422).json({
        success: false,
        message: "Input All details",
      });
    }

    const existSeller = await Seller.findOne({ username });
    if (existSeller) {
      return res.status(400).json({
        success: false,
        message: "Only user can create one business",
      });
    }

    const business = new Seller({
      username,
      name,
      email,
      businessId,
    });

    const savedBusiness = await business.save();

    res.status(200).json({
      success: true,
      data: business,
      message: "Business Created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    const { id } = req.user;
    const seller = await Seller.findOne({ businessId: id })
      .populate("catalog")
      .exec();

    return res.status(200).json({
      success: true,
      data: seller,
      message: "Successfully fetched",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.createCatalog = async (req, res) => {
  try {
    const { name } = req.body;
    const businessId = req.user.id;

    const existCatalog = await Catalog.findOne({ businessId });

    if (existCatalog) {
      return res.status(400).json({
        success: false,
        message: "Any Seller can have only one Catalog",
      });
    }
    const catalog = new Catalog({
      catalogName: name,
      businessId,
    });
    console.log(catalog);
    const savedCatalog = await catalog.save();

    const updatedSeller = await Seller.findOneAndUpdate(
      {
        businessId: req.user.id,
      },
      { $push: { catalog: catalog._id } },
      { new: true }
    );

    console.log(updatedSeller);
    return res.status(200).json({
      success: true,
      data: updatedSeller.name,
      message: "Successfully created Catalog",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getCatalog = async (req, res) => {
  try {
    const businessId = req.user.id;
    const catalog = await Catalog.findOne({ businessId })
      .populate("catalogItem")
      .exec();
    return res.status(200).json({
      success: true,
      data: catalog,
      message: "Successfully fetched",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const businessId = req.user.id;

    if (!name || !price) {
      return res.json({
        success: false,
        message: "Enter all necessary details",
      });
    }

    const existProduct = await Product.findOne({ name, price, businessId });

    if (existProduct) {
      return res.json({
        success: false,
        message: "Product Already Exists",
      });
    }

    const catalog = await Catalog.findOne({ businessId: req.user.id });

    if (!catalog) {
      return res.json({
        success: false,
        message: "No catalog Found",
      });
    }

    const product = await Product.create({
      name,
      price,
      businessId: req.user.id,
      catalogId: catalog._id,
    })
    // const product = new Product({
    //   name,
    //   price,
    //   businessId: req.user.id,
    //   catalogId: catalog._id,
    // });

    const updatedCatalog = await Catalog.findOneAndUpdate(
      { businessId: req.user.id },
      { $push: { catalogItem: product._id } },
      { new: true }
    )
      .populate()
      .exec();

    // Save the product
    // await product.save();

    return res.status(200).json({
      success: true,
      data: updatedCatalog,
      message: "Product Added Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const businessId = req.user.id;
    const product = await Product.find({ businessId });
    const products = product.map((item) => [item.name, item.price]);
    console.log(products)

    return res.status(200).json({
      success: true,
      data: products,
      message: "successfully fetch all the datas",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.orders = async (req,res) => {
  try{
    const businessId = req.user.id;
    console.log(businessId);
    const orders = await Order.find({businessId});

    return res.status(200).json({
      success: true,
      data: orders,
      message: "All Orders Fetched"
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message: "Internal Server Error"
    })
  }
}

//  API for Admin

exports.getAllBusiness = async (req, res) => {
  try {
    const seller = await Seller.find({}).populate("catalog").exec();

    return res.status(200).json({
      success: true,
      data: seller,
      message: "Data Fetched Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.find({}).populate("catalogItem").exec();
    return res.status(200).json({
      success: true,
      data: catalog,
      message: "Successfully fetched",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json({
      success: true,
      data: product.name,
      message: "successfully fetch all the datas",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
