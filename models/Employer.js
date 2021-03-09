const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  employer: {
    type: String,
    unique: true,
    required: [true, "Place of employment may not be left blank"],
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
employerSchema.pre("save", function (next) {
  const employer = this;

  //CHECK IF PASSWORD HAS BEEN MODIFIED/DOES NOT MATCH ORIGINAL
  if (!employer.isModified("password")) return next;
  //GENERATE SALT TO HASH PASSWORD
  bcrypt.genSalt(10, function (error, salt) {
    if (error) throw next(error);
    //HASH PASSWORD TOGETHER WITH SALT
    bcrypt.hash(employer.password, salt, function (error, hash) {
      if (error) throw next(error);
      employer.password = hash;
      next();
    });
  });
});

//2 COMPARE HASHED PASSWORD TO INPUT
employerSchema.methods.comparePassword = function (employerPassword, cb) {
  bcrypt.compare(employerPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
module.exports = mongoose.model("Employer", employerSchema);
