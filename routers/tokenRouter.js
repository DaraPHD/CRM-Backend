const Router = require("express");
const tokenController = require("../controllers/tokenController");

const router = new Router();

router.delete("/:id", tokenController.deleteOne);

module.exports = router;


