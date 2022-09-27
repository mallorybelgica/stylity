const router = require("express").Router();

router.get("/status", (req, res) => res.send("spaces ok"));

const follower_controller = require("../controllers/followerController");

router
  .route("/")
  .get(follower_controller.list)
  .post(follower_controller.create);

router
  .route("/:_id")
  .get(follower_controller.get)
  .put(follower_controller.update)
  .delete(follower_controller.delete);

module.exports = router;
