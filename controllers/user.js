const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Register
exports.registerUser = async (req, res) => {
  try {
    // Get data
    const { username, password, type } = req.body;

    // check for empty input
    if (!username || !password || !type) {
      return res.json({
        success: false,
        message: "Enter all necessary details",
      });
    }

    // check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already Exist",
      });
    }

    // Secure Password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: fail,
        message: "Error in Hasing Data",
      });
    }

    // Register New User
    const user = await User.create({
      username,
      password: hashedPassword,
      type,
    });

    // success
    return res.status(200).json({
      success: true,
      data: user,
      message: "User registered Successfully",
    });
  } catch (err) {
    // failed
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    //data fetch
    const { username, password } = req.body;

    // check for empty input
    if (!username || !password) {
      return res.json({
        success: false,
        message: "Enter all necessary details",
      });
    }

    // check for registered user
    let user = await User.findOne({ username });

    // if not registerd user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    // Regiseted
    const payload = {
      username: user.username,
      id: user._id,
      type: user.type,
    };

    // verify password and generate a JWT token
    if (await bcrypt.compare(password, user.password)) {
      // password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();

      // insert token in user object
      user.token = token;

      // remove password from user object for AuthN
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Login successfully",
      });
    } else {
      // password donot match
      return res.status(402).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get all User
exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json({
      success: true,
      data: user,
      message: "Data Fetched Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
