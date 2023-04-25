const Router = require("express")
const router = new Router
const colorController = require("../controllers/colorController")

router.post("/", colorController.create)
router.get('/', colorController.getAll)
router.put('/:id', colorController.updateOne)
router.delete('/:id', colorController.deleteOne)
module.exports = router