const userBoardService = require("../services/userBoardService.js");

class UserBoardController {
    async create(req, res, next) {
        try {
            const { userId, boardId } = req.body;
            const userBoard = await userBoardService.create(userId, boardId);
            return res.json({ userBoard });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async getAll(req, res, next) {
        try {
            const participants = await userBoardService.getAll();
            return res.json({ participants });
        } catch (e) {
            return res.json(e.message);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await userBoardService.deleteOne(id);
            return res.json(`Отношение удалено`);
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new UserBoardController();
