const { Candidate } = require("../models/user_models");


class CandidateController {
    async create(req, res, next) {
        try {
            const {name, surname, client, is_paid, userId} = req.body
            const candidate = await Candidate.create({
                    name,
                    surname,
                    client,
                    is_paid,
                    userId
            })
            return res.json(candidate)
        } catch (e) {
            res.json(e.message)
        }
    }
    async getOne(req, res, next) {
        try {
        } catch (e) {}
    }
    async getAll(req, res, next) {
        try {
        } catch (e) {}
    }
    async updateOne(req, res, next) {
        try {
            const candidateId = req.params.id
            const {name, surname, client, is_paid, userId} = req.body
            const candidate = await Candidate.findByPk(candidateId)
            if (candidate) {
                candidate.name = name,
                candidate.surname = surname,
                candidate.client = client,
                candidate.is_paid = is_paid,
                candidate.userId = userId
                await candidate.save()
                res.json(candidate)
            } else {
                res.status(404).send('User not found')  // change to custom middleware
            }
        } catch (e) {
            res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
        } catch (e) {}
    }
}

module.exports = new CandidateController();
