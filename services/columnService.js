const { Column } = require("../models/models")

class ColumnService {
    async create(name) {
        try {
            const column = await Column.create({
                name,
                boardId: 1,
            })

            return column
        } catch (e) {
            return e
        }
    }
    async getOne(id) {
        try {
            const column = await Column.findOne({
                where: { id },
            })

            return column
        } catch (e) {
            return "Ошибка получения экземпляра Column"
        }
    }
    async getAll() {
        try {
            const columns = await Column.findAll()
            return columns
        } catch (e) {
            return "Ошибка получения Column"
        }
    }
    async updateOne(id, name, boardId) {
        try {
            const column = await Column.findByPk(id)
            if (column) {
                column.name = name
                column.boardId = boardId
                await column.save()
                return column
            }
        } catch (e) {
            return "Ошибка обновления Column"
        }
    }
    async deleteOne(id) {
        try {
            await Column.destroy({ where: { id } })
            return `${id} deleted`
        } catch (e) {
            return "Ошибка удаления Column"
        }
    }
}

module.exports = new ColumnService()
