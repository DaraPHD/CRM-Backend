const { Color } = require("../models/user_models")

class ColorController {
    async create(req, res, next) {
        try {
            const {color_code} = req.body
            const color = await Color.create({
                color_code
        })
            return res.json(color)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAll(req, res, next) {
        try {
            const colors = await Color.findAll()
            return res.json(colors)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateOne(req, res, next) {
        try {
            const {id} = req.params
            const {color_code} = req.body
            const color = await Color.findByPk(id)
            if (color) {
                color.color_code = color_code,
                await color.save()
                return res.json(color)
            } else {
                return res.status(404).send('Label not found')
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const {id} = req.params
            const color = await Color.destroy({where: {id}})
            return res.json({message: `${color} deleted`})
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new ColorController()