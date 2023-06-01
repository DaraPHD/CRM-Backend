const { Label, CardLabel } = require("../models/models")
const labelService = require("../services/labelService")

class LabelController {
    async create(req, res, next) {
        try {
            const { name, color } = req.body
            const label = await labelService.create(name, color)
            return res.json(label)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async createCardLabel(req, res, next) {
        try {
            const { cardId, labelId } = req.body
            const label = await labelService.createCardLabel(cardId, labelId)
            return res.json(label)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const label = await labelService.getOne(id)
            return res.json(label)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAll(req, res, next) {
        try {
            const labels = await labelService.getAll()
            return res.json(labels)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const { name, color } = req.body
            const label = await labelService.updateOne(name, color, id)
            return res.json(label)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            await labelService.deleteOne(id)
            return res.json(`${id} deleted`)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteCardLabel(req, res, next) {
        try {
            const { labelId, cardId } = req.body
            await labelService.deleteCardLabel(labelId, cardId)
            return res.json(`${(labelId, cardId)} deleted successfuly`)
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new LabelController()
