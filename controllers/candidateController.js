const { Candidate, Column } = require("../models/user_models");

class CandidateController {
    async create(req, res, next) {
        try {
            const {fullname, client, is_paid, userId, columnId, recruiter_name} = req.body
            const candidate = await Candidate.create({
                    fullname,
                    client,
                    is_paid,
                    userId,
                    columnId,
                    recruiter_name,
            })
            return res.json(candidate)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const candidate = await Candidate.findOne({
                where: {id}
            })
            return res.json(candidate)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAll(req, res, next) {
        try {
            const candidates = await Candidate.findAll()
            return res.json(candidates)
        } catch (e) {
            return res.json(e.message)
        }
    }
    
    async updateOne(req, res, next) {
        try {
            const {id} = req.params
            const {fullname, client, is_paid, userId, columnId, recruiter_name} = req.body
            const candidate = await Candidate.findByPk(id)
            if (candidate) {
                candidate.fullname = fullname,
                candidate.client = client,
                candidate.is_paid = is_paid,
                candidate.userId = userId,
                candidate.columnId = columnId,
                candidate.recruiter_name = recruiter_name
                await candidate.save()
                return res.json(candidate)
            } else {
                return res.status(404).send('User not found')  // change to custom middleware
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const {id} = req.params
            const candidate = await Candidate.destroy({where: {id}})
            return res.json({message: `${candidate} deleted`})
        } catch (e) {
            res.json(e.message)
        }
    }
    async getCandidateFromColumn(req, res, next) {
        try {
            const { columnId } = req.params
            const candidates = await Candidate.findAll({
                where: { columnId } 
            })
            const column = await Column.findAll({
                where: { id: columnId}
            })
            return res.json({candidates, column})
        } catch (e) {
            return res.json(e.message)
        }
    }

}

module.exports = new CandidateController();
