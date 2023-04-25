const Router = require("express")
const router = new Router
const colorController = require("../controllers/colorController")

router.post("/", colorController.create)

module.exports = router