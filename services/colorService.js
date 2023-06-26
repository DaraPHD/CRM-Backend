const { Color } = require("../models/models")

class ColorService {
    async create(color_code) {
        try {
            const color = await Color.create({
                color_code,
            })
            return color
        } catch (e) {
            return "Ошибка создания Color"
        }
    }
    async getAll() {
        try {
            const colors = await Color.findAll()
            return colors
        } catch (e) {
            return "Ошибка получения Color"
        }
    }
    async updateOne(id, color_code) {
        try {
            const color = await Color.findByPk(id)
            if (color) {
                color.color_code = color_code
                await color.save()
                return color
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
    async deleteOne(id) {
        try {
            await Color.destroy({ where: { id } })
            return `${id} deleted`
        } catch (e) {
            return "Ошибка удаления Color"
        }
    }
}

module.exports = new ColorService()
