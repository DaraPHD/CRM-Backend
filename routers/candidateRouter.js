const Router = require("express");
const router = new Router();
const candidateController = require("../controllers/candidateController");

router.post("/", candidateController.create);
router.get("/:id", candidateController.getOne);
router.get("/", candidateController.getAll); // all candidates
router.get("/:columnId/candidates", candidateController.getCandidateFromColumn)
router.put("/:id", candidateController.updateOne);
router.delete("/:id", candidateController.deleteOne);

module.exports = router;
