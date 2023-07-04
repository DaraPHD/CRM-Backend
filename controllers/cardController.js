const cardService = require("../services/cardService");

class CardController {
    async create(req, res, next) {
        try {
            const { columnId, title } = req.body;
            const card = await cardService.create(columnId, title);
            return res.json({ card });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const card = await cardService.getOne(id);
            return res.json({ card });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async getAll(req, res, next) {
        try {
            const cards = await cardService.getAll();
            return res.json({ cards });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { columnId, title } = req.body;
            const card = await cardService.updateOne(id, columnId, title);
            return res.json({ card });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const result = await cardService.deleteOne(id);
            return res.json({ result });
        } catch (e) {
            res.json(e.message);
        }
    }

    async getCardFromColumn(req, res, next) {
        try {
            const { columnId } = req.params;
            const cards = await cardService.getCardFromColumn(columnId);
            const column = await cardService.getCardFromColumn(columnId);
            return res.json({ cards, column });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async archive(req, res, next) {
        try {
            const { id } = req.params;
            const card = await cardService.archive(id);
            return res.json({ card });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async createUserCard(req, res, next) {
        try {
            const { userId, cardId } = req.body;
            const relation = await cardService.createUserCard(userId, cardId);
            return res.json({ relation });
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new CardController();
