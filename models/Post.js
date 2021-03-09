const mongoose = require("mongoose");
const jobPostSchema = new mongoose.Schema(
  {
    jobPost: {
      type: String,
      require: ["Please enter job posting", true],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports("Post", jobPostSchema);
