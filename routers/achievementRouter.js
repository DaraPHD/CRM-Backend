const Router = require("express")
const router = new Router()
const achievmentController = require("../controllers/achievmentController")

router.post("/", achievmentController.create)
router.get("/:id", achievmentController.getOne)
router.get("/", achievmentController.getAll) // all achievement
router.put("/:id", achievmentController.updateOne)
router.delete("/:id", achievmentController.deleteOne)

module.exports = router
