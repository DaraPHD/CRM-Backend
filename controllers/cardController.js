const { Card, Column, Label, UserCard } = require("../models/models")

class CardController {
    async create(req, res, next) {
        try {
            const {
                fullname,
                client,
                is_paid,
                columnId,
                recruiter_name,
                title,
            } = req.body
            const card = await Card.create({
                fullname,
                client,
                is_paid,
                columnId,
                recruiter_name,
                title,
            })
            return res.json(card)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const card = await Card.findOne({
                where: { id },
                include: [
                    {
                        model: Label,
                        as: "label",
                    },
                ],
            })
            return res.json(card)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAll(req, res, next) {
        try {
            const cards = await Card.findAll()
            return res.json(cards)
        } catch (e) {
            return res.json(e.message)
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const {
                fullname,
                client,
                is_paid,
                columnId,
                recruiter_name,
                title,
            } = req.body
            const card = await Card.findByPk(id)
            if (card) {
                ;(card.fullname = fullname),
                    (card.client = client),
                    (card.is_paid = is_paid),
                    (card.columnId = columnId),
                    (card.recruiter_name = recruiter_name),
                    (card.title = title),
                    await card.save()
                return res.json(card)
            } else {
                return res.status(404).send("User not found") // change to custom middleware
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const card = await Card.destroy({ where: { id } })
            return res.json({ message: `${card} deleted` })
        } catch (e) {
            res.json(e.message)
        }
    }
    async getCardFromColumn(req, res, next) {
        try {
            const { columnId } = req.params
            const cards = await Card.findAll({
                where: { columnId },
            })
            const column = await Column.findAll({
                where: { id: columnId },
            })
            return res.json({ cards, column })
        } catch (e) {
            return res.json(e.message)
        }
    }
    async createUserCard(req, res, next) {
        try {
            const { userId, cardId } = req.body
            const relation = await UserCard.create({ cardId, userId })
            return res.json(relation)
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new CardController()
