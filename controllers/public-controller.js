const User = require("../models/User");
exports.postRegisterUser = async (req, res) => {
  console.log(req.body);
  try {
    //CHECK IF USER ALREADY EXISTS
    const user = await User.findOne({ username: req.body.username });
    console.log(req.body.username);
    if (user)
      res.json({
        msg:
          "A user with this infomration exists already, please proceed to login",
      });
    else {
      console.log("User created");
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      return res.json({
        msg: "Your account has been created",
        user: newUser,
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      msg: e.Message,
    });
  }
};
