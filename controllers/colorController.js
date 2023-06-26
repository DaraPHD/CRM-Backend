const colorService = require("../services/colorService")

class ColorController {
    async create(req, res, next) {
        try {
            const { color_code } = req.body
            const color = await colorService.create(color_code)
            return res.json({ color })
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAll(req, res, next) {
        try {
            const colors = await colorService.getAll()
            return res.json({ colors })
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const { color_code } = req.body
            const color = await colorService.updateOne(id, color_code)
            return res.json({ color })
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            await colorService.deleteOne(id)
            return res.json(`${id} удален`)
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new ColorController()
