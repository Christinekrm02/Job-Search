const User = require("../models/User");
//const Post = require("..models/Post");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//USER SIGNS UP
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
  } catch (error) {
    console.log(error);
    res.json({
      msg: error.Message,
    });
  }
};

//USER LOGIN
exports.postLoginUser = async (req, res) => {
  try {
    //EXPOSE USER PASSWORD TO COMPARE TO USER PASSWORD IN DB
    //
    const user = await User.findOne({ username: req.body.username }).select(
      "+password"
    );

    if (user) {
      //CHECK IF USER'S ENTERED PASSWORD MATCHES AGAINST PASSWORD STORED IN DB
      const checkPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (checkPasswordMatch) {
        //IF TRUE AUTHENTICATE USER WITH USER ID, EMAIL AND USERNAME
        const token = jwt.sign(
          { id: user._id, email: user.email, username: user.username },
          "fs_job-search"
        );
        return res.json({
          msg: "Login successful",
          token,
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
          },
        });
      } else {
        return res.json({ msg: "Credentials do not match" });
      }
    }
  } catch (error) {
    return res.json({
      msg: "Login attempt unsuccessful",
    });
  }
};
