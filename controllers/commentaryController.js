const { Commentary } = require("../models/user_models");

class CommentaryController {
    async create(req, res, next) {
        try {
            const {content, candidateId, userId} = req.body
            const commentary = await Commentary.create({
                content,
                candidateId,
                userId
            })
            return res.json(commentary)
        } catch (e) {
            return res.json(e.message)
        }
    }

    async createReply (req, res, next) {
        try {
            const {userId, content, candidateId, commentaryId} = req.body
            const { id } = req.params
            const reply = await Commentary.create({
                candidateId,
                userId,
                id,
                content,
                commentaryId
            })
            return res.json({reply})
        } catch (e) {
           return res.json(e.message) 
        }
    }
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const commentary = await Commentary.findOne({
                where: {id}
            })
            return res.json(commentary)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateOne(req, res, next) {
        try {
            const {id} = req.params
            const {content, candidateId, userId} = req.body
            const commentary = await Commentary.findByPk(id)
            if (commentary){
                commentary.content = content,
                commentary.candidateId = candidateId,
                commentary.userId = userId
                await commentary.save()
                return res.json(commentary)
            } else {
                return res.status(404).send('Commentary not found')
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const {id} = req.params
            const commentary = await Commentary.destroy({where: {id}})
            return res.json({message: `${commentary} deleted`})
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new CommentaryController();
