const router = require("express").Router();

router.get("/status", (req, res) => res.send("spaces ok"));

const user_controller = require("../controllers/userController");

router.route("/").get(user_controller.list);

router
  .route("/:_id")
  .get(user_controller.get)
  .put(user_controller.update)
  .delete(user_controller.delete);

module.exports = router;
