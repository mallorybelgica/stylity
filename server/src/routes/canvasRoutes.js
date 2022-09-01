const router = require("express").Router();

router.get("/status", (req, res) => res.send("spaces ok"));

const canvas_controller = require("../controllers/canvasController");

router.route("/").get(canvas_controller.list).post(canvas_controller.create);

router
  .route("/:_id")
  .get(canvas_controller.get)
  .put(canvas_controller.update)
  .delete(canvas_controller.delete);

module.exports = router;
