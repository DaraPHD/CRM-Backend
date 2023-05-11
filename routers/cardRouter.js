const Router = require("express")
const router = new Router()
const cardController = require("../controllers/cardController")

router.post("/", cardController.create)
router.get("/:id", cardController.getOne)
router.get("/", cardController.getAll) // all cards
router.get("/:columnId/card", cardController.getCardFromColumn)
router.put("/:id", cardController.updateOne)
router.delete("/:id", cardController.deleteOne)
router.post("/usercard", cardController.createUserCard)

module.exports = router
