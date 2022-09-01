require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Backend Server is working");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
