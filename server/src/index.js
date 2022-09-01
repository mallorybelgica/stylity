require("dotenv").config();
const express = require("express");
const mongoose = require("./config/mongoose");
const bodyParser = require("body-parser");

const routes = require("./routes");

const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect();

app.use("/v1", routes);

app.get("/", (req, res) => {
  res.send("Backend Server is working");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
