const Router = require("express")
const router = new Router()
const boardController = require("../controllers/boardController")

router.post("/", boardController.create)
router.get("/:id", boardController.getBoard)
router.get("/", boardController.searchCard)
router.put("/:columnId/cards", boardController.updateCards)

module.exports = router
