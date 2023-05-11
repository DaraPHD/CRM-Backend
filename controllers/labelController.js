const { Label, CardLabel } = require("../models/models")

class LabelController {
    async create(req, res, next) {
        try {
            const { name, color } = req.body
            const label = await Label.create({
                name,
                color,
            })
            return res.json(label)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async createCardLabel(req, res, next) {
        try {
            const { cardId, labelId } = req.body
            const label = await CardLabel.create({ cardId, labelId })
            // const labels = await CardLabel.findAll({
            //     order: [["id", "ASC"]],
            // })
            return res.json(label)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const label = await Label.findOne({
                where: { id },
            })
            return res.json(label)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAll(req, res, next) {
        try {
            const labels = await Label.findAll()
            return res.json(labels)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const { name, color } = req.body
            const label = await Label.findByPk(id)
            if (label) {
                ;(label.name = name), (label.color = color), await label.save()
                return res.json(label)
            } else {
                return res.status(404).send("Label not found")
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            await Label.destroy({ where: { id } })
            return res.json(`${id} deleted`)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteCardLabel(req, res, next) {
        try {
            const { labelId, cardId } = req.body
            const label = await CardLabel.destroy({
                where: { labelId, cardId },
            })
            return res.json(`${label} deleted successfuly`)
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new LabelController()
