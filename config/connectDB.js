const mongoose = require("mongoose");
async function connectDB() {
  const connection = await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/job_db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  );
  if (connection) console.log("Connected to job-search db");
  else console.log("Unable to connect to db");
}

module.exports = connectDB;
