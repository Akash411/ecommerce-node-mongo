const express = require("express");
const router = express.Router();

const User = require("../controllers/user");

// SignUp / Login
router.post("/auth/register", User.registerUser);
router.post("/auth/login", User.loginUser);

router.get("/getAllUser", User.getAllUser);

module.exports = router;
