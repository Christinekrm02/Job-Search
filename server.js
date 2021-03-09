require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
USER = require("./models/User");
const port = 3001;

connectDB();

//HOME
app.get("/", (req, res) => {
  res.send("Homepage");
});
//USER REGISTER
app.post("/register", (req, res) => {
  try {
    //
  } catch (e) {
    res.json({
      msg: "Account with this infomration already exists",
    });
  }
});

app.get("/test", (req, res) => {
  res.send("Hi there!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
