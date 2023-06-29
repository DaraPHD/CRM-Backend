const Router = require("express");
const userBoardRouter = require("../controllers/userBoardController.js");

const router = new Router();

router.post("/", userBoardRouter.create);
router.get("/", userBoardRouter.getAll);
router.delete("/:id", userBoardRouter.delete);

module.exports = router;
