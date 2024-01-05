// Creating a server
const express = require("express");
const app = express();

// Dotenv file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// MiddleWare
app.use(express.json());

// Database Connection
const dbConnect = require("./config/database");
dbConnect();

// Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Route import and mount
const User = require("./routes/user");
const Seller = require("./routes/seller");
const Buyer = require("./routes/buyer");

// app.use("/api/product", Product);
app.use("/api/user", User);
app.use("/api/seller", Seller);
app.use("/api/buyer", Buyer);

// Activate Server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});

// Home Route
app.get("/", (req, res) => {
  res.send(`<h1>UnityLab.Ai</h1>`);
});
