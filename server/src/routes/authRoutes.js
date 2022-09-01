const router = require("express").Router();
const auth_controller = require("../controllers/authController");

router.get("/status", (req, res) => res.send("OK"));

router.route("/register").post(auth_controller.register);
router.route("/activate").get(auth_controller.activate);
router.route("/login").post(auth_controller.login);

module.exports = router;
