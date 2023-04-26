const Router = require("express")
const router = new Router()
const columnController = require("../controllers/columnController")

router.post("/", columnController.create)
router.get("/:id", columnController.getOne)
router.get("/", columnController.getAll)
router.put("/:id", columnController.updateOne)
router.delete("/:id", columnController.deleteOne)

module.exports = router
