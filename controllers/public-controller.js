const User = require("../models/User");
const Employer = require("../models/Employer");
const Post = require("../models/Post");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//JOB SEEKER USER SIGNS UP
exports.postRegisterUser = async (req, res) => {
  console.log(req.body);
  try {
    //CHECK IF USER ALREADY EXISTS
    const user = await User.findOne({ username: req.body.username });
    console.log(req.body.username);
    if (user)
      res.json({
        msg:
          "A user with this information exists already, please proceed to login",
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

//EMPLOYER SIGNS UP
exports.postRegisterEmployer = async (req, res) => {
  // console.log(req.body);
  try {
    //CHECK IF EMPLOYER ALREADY EXISTS OR IF LOGIN CREDENTIALS IS FOR A JOB SEEKER
    const employer = await Employer.findOne({ username: req.body.username });
    const jobSeeker = await User.findOne({ username: req.body.username });
    // console.log(req.body.username);
    if (employer)
      res.json({
        msg: "Credentials exist, please proceed to login",
      });
    else if (jobSeeker) {
      res.json({
        msg:
          "Invalid credentials for employer login, please proceed to job seeker login page",
      });
    } else {
      console.log("Employer account created");
      const newEmployer = await Employer.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      return res.json({
        msg: "Your account has been created",
        employer: newEmployer,
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
  console.log(req.body);
  try {
    //EXPOSE USER PASSWORD TO COMPARE TO USER PASSWORD IN DB
    //
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    console.log(user);
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
          "fs_job-search" //SECRET_KEY
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

exports.getAllJobPostsByEmployerId = async (req, res) => {
  try {
    const employer = await Employer.findOne({ _id: req.params.id });
    const jobPostsByEmployer = await Post.findOne({
      _id: req.params.id,
    }).populate("employer");
    return res.json({
      msg: `Job listings by ${employer}:
      ${jobPostsByEmployer}`,
    });
  } catch (error) {
    return res.json({ msg: error.Message });
  }
};
//GET A JOB POST BY SEARCHING JOBPOST ID
//WILL NEED BACKREF ON POST MODEL?
exports.getJobPostById = async (req, res) => {
  try {
    const employer = await Employer.findOne({ _id: req.params.id });
    const jobPost = await Post.findOne({ _id: req.params.id }).populate(
      "employer"
    );
    return res.json({ msg: `Found job listing: ${jobPost} by ${employer}` });
  } catch (error) {
    return res.json({ msg: error.Message });
  }
};
