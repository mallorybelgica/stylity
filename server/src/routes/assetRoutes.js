const router = require("express").Router();

router.get("/status", (req, res) => res.send("assets ok"));

const asset_controller = require("../controllers/assetController");

router.route("/").post(asset_controller.create);
router.route("/upload_image").put(asset_controller.upload_image);

module.exports = router;
