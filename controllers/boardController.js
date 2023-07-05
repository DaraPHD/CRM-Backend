const boardService = require("../services/boardService");

class BoardController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const board = await boardService.create(name);
            return res.json({ board });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async getBoard(req, res, next) {
        try {
            const { id } = req.params;
            const board = await boardService.getBoard(id);
            return res.json({ board });
        } catch (e) {
            return res.json({ message: "Internal server error" });
        }
    }

    async searchCard(req, res, next) {
        try {
            const { title } = req.query;
            const searchResult = await boardService.searchCard(title);
            return res.json({ searchResult });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async sendInvintation(req, res, next) {
        try {
            const { id, senderUser, receiverUser } = req.body;
            const result = await boardService.sendInvintation(
                id,
                senderUser,
                receiverUser
            );
            return res.json({ result });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const board = await boardService.delete(id);
            return res.json({ board });
        } catch (e) {
            return res.json(e.message);
        }
    }
}
module.exports = new BoardController();
