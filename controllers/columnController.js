const { Column } = require("../models/models")

class ColumnController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const column = await Column.create({
                name,
                boardId: 1,
            })
            return res.json(column)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const column = await Column.findOne({
                where: { id },
            })
            return res.json(column)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async getAll(req, res, next) {
        try {
            const columns = await Column.findAll()
            return res.json(columns)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const { name, boardId } = req.body
            const column = await Column.findByPk(id)
            if (column) {
                column.name = name
                column.boardId = boardId
                await column.save()
                return res.json(column)
            } else {
                return res.status(404).send("Column not found")
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const column = await Column.destroy({ where: { id } })
            return res.json({ message: `${id} deleted` })
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new ColumnController()
