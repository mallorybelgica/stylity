const router = require("express").Router();

router.get("/status", (req, res) => res.send("spaces ok"));

const comment_controller = require("../controllers/commentController");

router.route("/").get(comment_controller.list).post(comment_controller.create);

router
  .route("/:_id")
  .get(comment_controller.get)
  .put(comment_controller.update)
  .delete(comment_controller.delete);

module.exports = router;
