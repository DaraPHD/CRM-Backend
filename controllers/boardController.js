const { Board, Column, Card, Label, CardLabel } = require("../models/models")
const { Op } = require("sequelize")

class BoardController {
    async create(req, res, next) {
        try {
            const { name } = req.body
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
            const { id } = req.params
            const board = await Board.findOne({
                where: { id },
                include: [
                    {
                        model: Column,
                        as: "column",
                        include: [
                            {
                                model: Card,
                                as: "card",
                                include: [
                                    {
                                        model: Label,
                                        as: "label",
                                    },
                                ],
                            },
                        ],
                    },
                ],
                order: [
                    ["id", "ASC"],
                    [Column, "id", "ASC"],
                    [Column, Card, "id", "ASC"],
                    [Column, Card, Label, "id", "ASC"],
                ],
            })
            return res.json(board)
        } catch (e) {
            return res.json(e.message)
        }
    }

    async searchCard(req, res, next) {
        try {
            const { fullname } = req.query
            const where = {}
            let boards
            if (fullname) {
                where.fullname = { [Op.iLike]: `%${fullname}%` }
                boards = await Board.findOne({
                    where: { id: 1 },
                    include: [
                        {
                            model: Column,
                            as: "column",
                            include: [
                                {
                                    model: Card,
                                    as: "card",
                                    where,
                                    include: [
                                        {
                                            model: Label,
                                            as: "label",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    order: [
                        ["id", "ASC"],
                        [Column, "id", "ASC"],
                    ],
                })

                return res.json(boards)
            } else {
                boards = await Board.findOne({
                    where: { id: 1 },
                    include: [
                        {
                            model: Column,
                            as: "column",
                            include: [
                                {
                                    model: Card,
                                    as: "card",
                                    include: [
                                        {
                                            model: Label,
                                            as: "label",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    order: [
                        ["id", "ASC"],
                        [Column, "id", "ASC"],
                        [Column, Card, "id", "ASC"],
                        [Column, Card, Label, "id", "ASC"],
                    ],
                })
                return res.json(boards)
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateCards(req, res, next) {
        //     try {
        //         const {columnId} = req.params
        //         const {name, surname, client, is_paid} = req.body
        //     const cards = await Card.update(
        //         {name,
        //         surname,
        //         client,
        //         is_paid,
        //         columnId
        //     },
        //     {where: { columnId },
        // returning: true
        // }
        //     )
        //     return res.json(cards[1])
        //     } catch (e) {
        //     return res.json(e.message)
        //     }
    }
}

module.exports = new BoardController()
