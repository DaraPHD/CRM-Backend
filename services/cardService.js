const { Card, Column, Label, UserCard } = require("../models/models");

class CardService {
    async create(columnId, title) {
        try {
            const card = await Card.create({
                columnId,
                title,
            });
            return card;
        } catch (e) {
            return e;
        }
    }
    async getOne(id) {
        try {
            const card = await Card.findOne({
                where: { id },
                include: [
                    {
                        model: Label,
                        as: "label",
                    },
                ],
            });
            return card;
        } catch (e) {
            return "Ошибка получения  одного экземпляра Card";
        }
    }
    async getAll() {
        try {
            const cards = await Card.findAll();
            return cards;
        } catch (e) {
            return "Ошибка получения Card";
        }
    }

    async updateOne(id, columnId, title) {
        try {
            const card = await Card.findByPk(id);
            if (card) {
                card.columnId = columnId;
                card.title = title;
                await card.save();
                return card;
            }
        } catch (e) {
            return e;
        }
    }
    async deleteOne(id) {
        try {
            await Card.destroy({ where: { id } });
            return `${id} deleted`;
        } catch (e) {
            return "Ошибка удаления";
        }
    }
    async getCardFromColumn(columnId) {
        try {
            const cards = await Card.findAll({
                where: { columnId },
            });
            const column = await Column.findAll({
                where: { id: columnId },
            });
            return { cards, column };
        } catch (e) {
            return "Ошибка получения Card из Column";
        }
    }
    async createUserCard(userId, cardId) {
        try {
            const relation = await UserCard.create({ cardId, userId });
            return relation;
        } catch (e) {
            return "Ошибка создания связи UserCard";
        }
    }
}

module.exports = new CardService();
