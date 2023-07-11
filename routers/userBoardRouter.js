const Router = require("express");
const userBoardRouter = require("../controllers/userBoardController.js");

const router = new Router();

router.post("/", userBoardRouter.create);
router.get("/", userBoardRouter.getAll);
router.get("/:userId", userBoardRouter.getUserBoards);
router.get("/get/:userId", userBoardRouter.getUser);
router.put("/:userBoardId", userBoardRouter.update);
router.delete("/:id", userBoardRouter.delete);

module.exports = router;
