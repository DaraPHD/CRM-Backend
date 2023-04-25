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
}

module.exports = new ColorController()