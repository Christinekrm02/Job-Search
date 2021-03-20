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

//EXPRESS MIDDLEWARE ALLOWS YOU TO PROTECT AUTH ROUTES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PUBLIC ROUTES
const publicRoutes = require("./routes/public-routes");
app.use("/user", publicRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
