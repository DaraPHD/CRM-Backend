const Router = require("express");
const router = new Router();
const boardController = require('../controllers/boardController')

router.post('/', boardController.create)
router.get('/:id', boardController.getAll)
router.post('/search', boardController.searchCandidate)
router.post('/:columnId/candidates', boardController.updateCandidates)

module.exports = router