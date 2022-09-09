require("dotenv").config();
const express = require("express");
const mongoose = require("./config/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 50000,
    extended: true,
  })
);

mongoose.connect();

app.use("/v1", routes);

app.get("/", (req, res) => {
  res.send("Backend Server is working");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
