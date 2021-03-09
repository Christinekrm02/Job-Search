const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username may not beleft blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    required: [true, "Email may not be left blank"],
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    //select allows value to be included in search queires
    select: false,
    required: [true, "Password required"],
  },
});

//1 HASH PASSWORD USING PRE MIDDLEWARE
//DO NOT USE ARROW FUNCTION BECAUSE WE NEED TO USE THIS KEYWORD
userSchema.pre("save", function (next) {
  const user = this;

  //CHECK IF PASSWORD HAS BEEN MODIFIED/DOES NOT MATCH ORIGINAL
  if (!user.isModified("password")) return next;
  //GENERATE SALT TO HASH PASSWORD
  bcrypt.genSalt(10, function (error, salt) {
    if (error) throw next(error);
    //HASH PASSWORD TOGETHER WITH SALT
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) throw next(error);
      user.password = hash;
      next();
    });
  });
});

//2 COMPARE HASHED PASSWORD TO USER INPUT
userSchema.methods.comparePassword = function (userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
module.exports = mongoose.model("User", userSchema);
