const columnService = require("../services/columnService");

class ColumnController {
    async create(req, res, next) {
        try {
            const { name, boardId } = req.body;
            const column = await columnService.create(name, boardId);
            return res.json({ column });
        } catch (e) {
            return res.json(e.message);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const column = await columnService.getOne(id);
            return res.json({ column });
        } catch (e) {
            return res.json(e.message);
        }
    }
    async getAll(req, res, next) {
        try {
            const columns = await columnService.getAll();
            return res.json({ columns });
        } catch (e) {
            return res.json(e.message);
        }
    }
    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { name, boardId } = req.body;
            const column = await columnService.updateOne(id, name, boardId);
            return res.json({ column });
        } catch (e) {
            return res.json(e.message);
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            await columnService.deleteOne(id);
            return res.json(`${id} deleted`);
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new ColumnController();
