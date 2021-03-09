const express = require("express");
const app = express();
const port = 3000;

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
