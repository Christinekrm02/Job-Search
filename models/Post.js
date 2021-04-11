const mongoose = require("mongoose");
const jobPostSchema = new mongoose.Schema(
  {
    jobPost: {
      type: String,
      require: ["Please enter job posting", true],
      trim: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", jobPostSchema);
