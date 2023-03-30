const Router = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
// router.get("/activate/:link", userController.activate); // email account activate
router.get("/refresh", userController.refresh); //  access token overwritting
router.get("/", authMiddleware, userController.getAll); // all users
router.get("/:id", userController.getOne);
router.delete("/:id", userController.deleteOne);
router.put("/:id", userController.putOne);

module.exports = router;
