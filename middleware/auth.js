const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.body.token || req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying token",
    });
  }
};

exports.isSeller = (req, res, next) => {
  try {
    if (req.user.type != "seller") {
      console.log(req.user);
      return res.status(401).json({
        success: false,
        message: "This is a protected route for seller",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "user type is not matching",
    });
  }
};

exports.isBuyer = (req, res, next) => {
  try {
    if (req.user.type != "buyer") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for buyer",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "user type is not matching",
    });
  }
};
