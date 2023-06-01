const commentaryService = require("../services/commentaryService")

class CommentaryController {
    async create(req, res, next) {
        try {
            const { content, cardId, userId } = req.body
            const commentary = await commentaryService.create(
                content,
                cardId,
                userId
            )
            return res.json(commentary)
        } catch (e) {
            return res.json(e.message)
        }
    }

    async createReply(req, res, next) {
        try {
            const { userId, content, parentId, username } = req.body
            const { id } = req.params
            const reply = await commentaryService.createReply(
                userId,
                content,
                parentId,
                username,
                id
            )
            return res.json(reply)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const commentary = await commentaryService.getOne(id)
            return res.json(commentary)
        } catch (e) {
            return res.json(e.message)
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const { content, cardId, userId } = req.body
            const commentary = await commentaryService.updateOne(
                content,
                cardId,
                userId,
                id
            )
            return res.json(commentary)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            await commentaryService.deleteOne(id)
            return res.json(`${id} удален`)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAllCardCommentary(req, res, next) {
        try {
            const { id } = req.params
            const commentaries = await commentaryService.getAllCardCommentary(
                id
            )
            return res.json(commentaries)
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new CommentaryController()
