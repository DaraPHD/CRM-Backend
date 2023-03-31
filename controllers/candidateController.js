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
        } catch (e) {}
    }
    async deleteOne(req, res, next) {
        try {
        } catch (e) {}
    }
}

module.exports = new CandidateController();
