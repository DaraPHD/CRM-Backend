const userBoardService = require("../services/userBoardService.js");

class UserBoardController {
    async create(req, res, next) {
        try {
            const { userId, boardId } = req.body;
            const participant = await userBoardService.create(userId, boardId);
            return res.json({ participant });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async getAll(req, res, next) {
        try {
            const participant = await userBoardService.getAll();
            return res.json({ participant });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async getUserBoards(req, res, next) {
        try {
            const { userId } = req.params;
            console.log(userId);
            const participant = await userBoardService.getUserBoards(userId);
            return res.json({ participant });
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
