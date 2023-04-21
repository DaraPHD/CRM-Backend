const Router = require("express");
const router = new Router();
const boardController = require('../controllers/boardController')

router.post('/', boardController.create)
router.get('/:id', boardController.getAll)

module.exports = router