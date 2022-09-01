require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

exports.connect = () => {
  mongoose.connect(MONGO_URI, options).then(() => {
    console.log("mongoDB connected...");
  });
  return mongoose.connection;
};
