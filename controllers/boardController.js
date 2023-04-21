const { Board, Column, Candidate } = require("../models/user_models")

class BoardController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const board = await Board.create({
                name,
            })
            return res.json(board)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAll(req, res, next) {
        try {
            const {id} = req.params
            const board = await Board.findOne({
                where: { id},
                include: [
                    {
                        model: Column,
                        as: "column",
                        include: [
                            {
                                model: Candidate,
                                as: "candidate",
                            },
                        ],
                    },
                ],
            });
            return res.json({board})
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new BoardController()