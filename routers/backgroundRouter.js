const Router = require("express");
const backgoroundController = require("../controllers/backgroundController.js");
const router = new Router();

router.post("/", backgoroundController.create);
router.get("/", backgoroundController.getAll);
router.get("/:id", backgoroundController.getOne);
router.put("/:id", backgoroundController.update);
router.delete("/:id", backgoroundController.delete);

module.exports = router;
