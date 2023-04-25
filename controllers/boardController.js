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
            const { fullname } = req.query
            const where = {}
            let boards
            if (fullname) {
                where.fullname = { [Op.iLike]: `%${fullname}%` }
                boards = await Board.findAll({
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
            } else if (!fullname) {
                boards = await Board.findOne({
                    where: { id: 1 },
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
                return res.json({boards})
            } 
            
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateCandidates (req, res, next) {
    //     try {
    //         const {columnId} = req.params
    //         const {name, surname, client, is_paid} = req.body
    //     const candidates = await Candidate.update(
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
    //     return res.json(candidates[1])
    //     } catch (e) {
    //     return res.json(e.message)
    //     }
        
    }

}

module.exports = new BoardController()