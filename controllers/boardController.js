const { Board, Column, Candidate } = require("../models/user_models")
const { Op } = require("sequelize")

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
                where: { id },
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
                order: [
                    ["id", "ASC"],
                    [Column, "id", "ASC"],
                    // [Column, Candidate, "id", "ASC"],
                ]
            });
            return res.json({board})
        } catch (e) {
            return res.json(e.message)
        }
    }

    async searchCandidate(req, res, next) {
        try {
            const { name, surname  } = req.params
            const where = {}
            if (name && surname) {
                where.name = { [Op.iLike]: `%${name}%` }
                where.surname = { [Op.iLike]: `%${surname}%` }
            } else if (name) {
                where.name = { [Op.iLike]: `%${name}%` }
            } else if (surname) {
                where.surname = { [Op.iLike]: `%${surname}%` }
            }
            const boards = await Board.findAll({
               include: [
                {
                    model: Column,
                    as: "column",
                    include: [{ model: Candidate, 
                        as: "candidate", 
                        where }]
                }
               ],
               order: [
                ["id", "ASC"],
                [Column, "id", "ASC"],
               ]
            })
           
            return res.json({boards})
        } catch (e) {
            return res.json(e.message)
        }
    }

}

module.exports = new BoardController()