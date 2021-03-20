const User = require("../models/User");
const jwt_decode = require("jwt-decode");

//RETURN MATCHING USER WHEN PASSWORD IS ENTERED
exports.returnUser = async (req, res, next) => {
  try {
    //TAKE HEADER OUT OF JWT
    //HEADER SPECIFIES INFORMATION LIKE ALGO USED TO CREATE  SIGNATURE (THIRD PART OF JWT)
    const token = req.headers.authorization;
    //MATCH USER ID AGAINST ASSIGNED TOKEN TO ENSURE THAT USER IS IN DATABASE
    //DECODE JWT TOKEN USING  jwt_decode
    const user = await User.findOne({ id: jwt_decode(token).id });
    req.user = user._id;

    next();
  } catch (error) {
    return res.json({
      msg: err.Message,
    });
  }
};
