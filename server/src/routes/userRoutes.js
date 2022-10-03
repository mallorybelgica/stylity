const router = require("express").Router();

router.get("/status", (req, res) => res.send("spaces ok"));

const user_controller = require("../controllers/userController");

router.route("/").get(user_controller.list);
router.route("/search").get(user_controller.search);

router
  .route("/:_id")
  .get(user_controller.get)
  .put(user_controller.update)
  .delete(user_controller.delete);

router.route("/:_id/password").put(user_controller.updatePassword);

module.exports = router;
