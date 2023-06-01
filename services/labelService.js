const { Label, CardLabel } = require("../models/models")

class LabelService {
    async create(name, color) {
        try {
            const label = await Label.create({
                name,
                color,
            })
            return label
        } catch (e) {
            return "Ошибка создания Label"
        }
    }
    async createCardLabel(cardId, labelId) {
        try {
            const label = await CardLabel.create({ cardId, labelId })
            return { label }
        } catch (e) {
            return "Ошибка создания связи CardLabel"
        }
    }
    async getOne(id) {
        try {
            const label = await Label.findOne({
                where: { id },
            })
            return { label }
        } catch (e) {
            return "Ошибка получения Label"
        }
    }
    async getAll() {
        try {
            const labels = await Label.findAll()
            return { labels }
        } catch (e) {
            return "Ошибка получения Label"
        }
    }
    async updateOne(name, color, id) {
        try {
            const label = await Label.findByPk(id)
            if (label) {
                label.name = name
                label.color = color
                await label.save()
                return { label }
            } else {
                return { label }
            }
        } catch (e) {
            return "Ошибка обновления Label"
        }
    }
    async deleteOne(id) {
        try {
            await Label.destroy({ where: { id } })
            return `${id} deleted`
        } catch (e) {
            return "Ошибка удаления Label"
        }
    }
    async deleteCardLabel(labelId, cardId) {
        try {
            await CardLabel.destroy({
                where: { labelId, cardId },
            })
            return `${(labelId, cardId)} deleted successfuly`
        } catch (e) {
            return "Ошибка удаления CardLabel"
        }
    }
}

module.exports = new LabelService()
