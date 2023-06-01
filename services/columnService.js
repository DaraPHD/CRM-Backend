const { Column } = require("../models/models")
// const io = require("../index").io

class ColumnService {
    async create(name) {
        try {
            const column = await Column.create({
                name,
                boardId: 1,
            })
            // io.on("Creation", (socket) => {
            //     socket.on("COLUMN:CREATE", (column) => {
            //         console.log(column)
            //     })
            //     socket.emit("COLUMN:CREATED", column)
            // })
            return { column }
        } catch (e) {
            return "Ошибка создания Column"
        }
    }
    async getOne(id) {
        try {
            const column = await Column.findOne({
                where: { id },
            })
            io.emit("COLUMN:CREATED", column)
            return { column }
        } catch (e) {
            return "Ошибка получения экземпляра Column"
        }
    }
    async getAll() {
        try {
            const columns = await Column.findAll()
            return { columns }
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
                return { column }
            }
        } catch (e) {
            return "Ошибка обноаления Column"
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
