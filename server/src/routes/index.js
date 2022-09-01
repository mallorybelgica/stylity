const express = require("express");
const authRoutes = require("./authRoutes");
const canvasRoutes = require("./canvasRoutes");
const commentRoutes = require("./commentRoutes");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", authRoutes);
router.use("/canvases", canvasRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
