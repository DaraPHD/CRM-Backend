const Router = require("express");
const router = new Router();
const boardController = require("../controllers/boardController");

router.post("/", boardController.create);

router.get("/:userId/:boardId", boardController.getBoard);
router.get("/:boardId/", boardController.searchCard);
router.post("/sendInvintation", boardController.sendInvintation);
router.delete("/delete/:id", boardController.delete);

module.exports = router;
