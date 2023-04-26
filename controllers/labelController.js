const { Label } = require("../models/user_models")

class LabelController {
    async create(req, res, next) {
        try {
            const { name, color, candidateId } = req.body
            const label = await Label.create({
                name,
                color,
                candidateId,
            })
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
            const { name, color, candidateId } = req.body
            const label = await Label.findByPk(id)
            if (label) {
                ;(label.name = name),
                    (label.color = color),
                    (label.candidateId = candidateId)
                await label.save()
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
            const label = await Label.destroy({ where: { id } })
            return res.json({ message: `${label} deleted` })
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new LabelController()
