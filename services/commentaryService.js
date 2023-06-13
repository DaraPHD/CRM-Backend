const { Commentary, User } = require("../models/models")

class CommentaryService {
    async create(content, cardId, userId) {
        try {
            const commentary = await Commentary.create({
                content,
                cardId,
                userId,
            })
            return commentary
        } catch (e) {
            return "Ошибка создания Commentary"
        }
    }

    async createReply(userId, content, parentId, username, id) {
        try {
            const reply = await Commentary.create({
                userId,
                content,
                parentId,
                username,
                commentaryId: id,
            })
            return reply
        } catch (e) {
            return "Ошибка создания Reply"
        }
    }
    async getOne(id) {
        try {
            const commentary = await Commentary.findOne({
                where: { id },
            })
            return commentary
        } catch (e) {
            return "Ошибка получения экземпляра Commentary"
        }
    }

    async updateOne(content, cardId, userId, id) {
        try {
            const commentary = await Commentary.findByPk(id)
            if (commentary) {
                commentary.content = content
                commentary.cardId = cardId
                commentary.userId = userId
                await commentary.save()
                return commentary
            }
        } catch (e) {
            return "Ошибка обновления Commentary"
        }
    }
    async deleteOne(id) {
        try {
            await Commentary.destroy({ where: { id } })
            return `${id} удален`
        } catch (e) {
            return "Ошикба удаления Commentary"
        }
    }
    async getAllCardCommentary(id) {
        try {
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
            return commentaries
        } catch (e) {
            return "Ошибка получения Commentary"
        }
    }
}

module.exports = new CommentaryService()
