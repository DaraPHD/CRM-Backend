const Router = require("express");
const router = new Router();
const commentaryController = require("../controllers/commentaryController");

router.post("/", commentaryController.create);
router.get("/:id", commentaryController.getOne);
router.put("/:id", commentaryController.updateOne);
router.delete("/:id", commentaryController.deleteOne);

module.exports = router;
