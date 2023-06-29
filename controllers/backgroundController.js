const backgroundService = require("../services/backgroundService.js");

class BackgroundController {
    async create(req, res, next) {
        try {
            const { image_code } = req.body;
            const backgoround = await backgroundService.create(image_code);
            return res.json({ backgoround });
        } catch (e) {
            return res.json(e.message);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const backgoround = await backgroundService.getOne(id);
            return res.json({ backgoround });
        } catch (e) {
            return res.json(e.message);
        }
    }
    async getAll(req, res, next) {
        try {
            const backgorounds = await backgroundService.getAll();
            return res.json({ backgorounds });
        } catch (e) {
            return res.json(e.message);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { image_code, userBoardId } = req.body;
            const backgoround = await backgroundService.update(
                id,
                image_code,
                userBoardId
            );
            return res.json({ backgoround });
        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await backgroundService.delete(id);
            return res.json(`background deleted`);
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new BackgroundController();
