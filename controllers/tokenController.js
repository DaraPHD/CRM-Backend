const { Token } = require("../models/models")

class TokenController {
    async getAll(req, res, next) {
        try {
            // res.json(["1234", "123123"]);
        } catch (e) {
            next(e)
        }
    }
    async getOne(req, res, next) {
        try {
        } catch (e) {
            next(e)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            await Token.destroy({ where: { id } })
            return res.json({ message: "Deleted" })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TokenController()

// initial commit try
