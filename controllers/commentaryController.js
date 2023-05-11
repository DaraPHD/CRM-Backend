const { Commentary, User } = require("../models/models")

class CommentaryController {
    async create(req, res, next) {
        try {
            const { content, cardId, userId } = req.body
            const commentary = await Commentary.create({
                content,
                cardId,
                userId,
            })
            return res.json(commentary)
        } catch (e) {
            return res.json(e.message)
        }
    }

    async createReply(req, res, next) {
        try {
            const { userId, content, parent_id, username } = req.body
            const { id } = req.params
            const reply = await Commentary.create({
                userId,
                content,
                commentaryId: id,
                parent_id,
                username,
            })
            return res.json({ reply })
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const commentary = await Commentary.findOne({
                where: { id },
            })
            return res.json(commentary)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const { content, cardId, userId } = req.body
            const commentary = await Commentary.findByPk(id)
            if (commentary) {
                ;(commentary.content = content),
                    (commentary.cardId = cardId),
                    (commentary.userId = userId)
                await commentary.save()
                return res.json(commentary)
            } else {
                return res.status(404).send("Commentary not found")
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const commentary = await Commentary.destroy({ where: { id } })
            return res.json({ message: `${commentary} deleted` })
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAllCardCommentary(req, res, next) {
        try {
            const { id } = req.params
            const commentaries = await Commentary.findAll({
                where: { cardId: id },
                include: [
                    {
                        model: User,
                    },
                    {
                        model: Commentary,
                        as: "replies",
                        include: [
                            {
                                model: User,
                            },
                        ],
                    },
                ],
                order: [["id", "DESC"]],
            })
            return res.json(commentaries)
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new CommentaryController()
