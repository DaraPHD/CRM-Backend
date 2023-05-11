const Router = require("express")
const router = new Router()
const labelController = require("../controllers/labelController")

router.post("/", labelController.create)
router.get("/:id", labelController.getOne)
router.get("/", labelController.getAll) //all labels
router.put("/:id", labelController.updateOne)
router.delete("/:id", labelController.deleteOne)
router.delete("/", labelController.deleteCardLabel)
router.post("/cardlabel", labelController.createCardLabel)

module.exports = router
