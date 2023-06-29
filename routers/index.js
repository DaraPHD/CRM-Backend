const Router = require("express");
const router = new Router();
const achievementRouter = require("./achievementRouter");
const cardRouter = require("./cardRouter");
const columnRouter = require("./columnRouter");
const commentaryRouter = require("./commentaryRouter");
const labelRouter = require("./labelRouter");
const userRouter = require("./userRouter");
const tokenRouter = require("./tokenRouter");
const boardRouter = require("./boardRouter");
const colorRouter = require("./colorRouter");
const userBoardRouter = require("./userBoardRouter");
const backgoroundRouter = require("./backgroundRouter");

router.use("/achievement", achievementRouter);
router.use("/card", cardRouter);
router.use("/column", columnRouter);
router.use("/commentary", commentaryRouter);
router.use("/label", labelRouter);
router.use("/user", userRouter);
router.use("/token", tokenRouter);
router.use("/board", boardRouter);
router.use("/color", colorRouter);
router.use("/participants", userBoardRouter);
router.use("/background", backgoroundRouter);

module.exports = router;
